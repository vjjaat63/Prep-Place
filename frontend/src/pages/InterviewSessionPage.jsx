import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInterviewById, continueInterview, endInterview, getMCQState, submitMCQAnswer } from "../api/interview";
import { Send, Loader, StopCircle, User, Bot, Clock, Mic, MicOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const InterviewSessionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mcqIndex, setMcqIndex] = useState(0);
  const [mcqFeedbackMap, setMcqFeedbackMap] = useState({});

  const messagesEndRef = useRef(null);
  const hasAutoEnded = useRef(false);
  const spokenMessagesRef = useRef(new Set());
  const recognitionRef = useRef(null);
  const hasStartedInterview = useRef(false);

  const queryClient = useQueryClient();

  // Fetch initial interview state
  const { data: interview, isLoading: isInterviewLoading, isError, refetch } = useQuery({
    queryKey: ["interview", id],
    queryFn: () => getInterviewById(id),
  });

  // Fetch MCQ session state if format === "MCQ"
  const { data: mcqData, isLoading: isMcqLoading, refetch: refetchMcq } = useQuery({
    queryKey: ["mcqState", id],
    queryFn: () => getMCQState(id),
    enabled: !!interview && interview.questionFormat === "MCQ",
  });

  // Calculate remaining time
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (interview) {
      if (interview.status === "Completed") {
        navigate(`/interviews/summary/${id}`);
        return;
      }

      const startTime = new Date(interview.createdAt).getTime();
      const durationMs = interview.duration * 60 * 1000;
      const endTime = startTime + durationMs;
      
      const updateTimer = () => {
        const now = new Date().getTime();
        const diff = Math.max(0, Math.floor((endTime - now) / 1000));
        setTimeLeft(diff);
      };
      
      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [interview, navigate, id]);

  // Handle ending the interview
  const { mutate: finishInterview, isPending: isEnding } = useMutation({
    mutationFn: () => endInterview(id),
    onSuccess: () => {
      toast.success("Interview completed! Generating feedback...");
      if (window.location.pathname === `/interviews/session/${id}`) {
        navigate(`/interviews/summary/${id}`);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to end interview");
    },
  });

  // Handle auto-ending when time runs out
  useEffect(() => {
    if (timeLeft === 0 && interview && interview.status !== "Completed" && !hasAutoEnded.current) {
      hasAutoEnded.current = true;
      finishInterview();
    }
  }, [timeLeft, interview, finishInterview]);

  const formatTime = (seconds) => {
    if (seconds === null) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // MCQ Answer Mutation
  const { mutate: sendMCQAnswer, isPending: isSubmittingMCQ } = useMutation({
    mutationFn: ({ questionId, selectedOption }) => submitMCQAnswer(id, questionId, selectedOption),
    onSuccess: (data, variables) => {
      setMcqFeedbackMap((prev) => ({
        ...prev,
        [variables.questionId]: {
          selectedOption: variables.selectedOption,
          isCorrect: data.isCorrect,
          correctOption: data.correctOption,
          explanation: data.explanation,
        },
      }));
      refetchMcq();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to submit option");
    },
  });

  // Restore existing answered questions on reload
  useEffect(() => {
    if (mcqData && mcqData.questions) {
      const newMap = {};
      let lastAnsweredIdx = 0;
      mcqData.questions.forEach((q, idx) => {
        if (q.userAnswer) {
          lastAnsweredIdx = Math.max(lastAnsweredIdx, idx);
          newMap[q.id] = {
            selectedOption: q.userAnswer,
            isCorrect: q.isCorrect,
            correctOption: q.correctOption,
            explanation: q.explanation,
          };
        }
      });
      setMcqFeedbackMap(newMap);
    }
  }, [mcqData]);

  // Web Speech API Setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
          let currentTranscript = "";
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setInputMessage(currentTranscript);
        };

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          setIsRecording(false);
          toast.error("Speech recognition failed. Please try again.");
        };

        recognitionRef.current.onend = () => {
           setIsRecording(false);
        };
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  // Handle Text-to-Speech
  useEffect(() => {
    if (!interview || interview.mode !== "Audio") return;
    
    const lastMsg = interview.conversation[interview.conversation.length - 1];
    
    if (lastMsg && lastMsg.role === "model" && !spokenMessagesRef.current.has(lastMsg.content)) {
      spokenMessagesRef.current.add(lastMsg.content);
      
      const utterance = new SpeechSynthesisUtterance(lastMsg.content);
      window.speechSynthesis.speak(utterance);
    }
  }, [interview]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [interview?.conversation]);

  // Handle sending a message in Conversational Mode
  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: (msg) => continueInterview(id, msg),
    onMutate: async (newMsg) => {
      if (!newMsg) return;

      await queryClient.cancelQueries({ queryKey: ["interview", id] });
      const previousInterview = queryClient.getQueryData(["interview", id]);

      if (previousInterview) {
        queryClient.setQueryData(["interview", id], {
          ...previousInterview,
          conversation: [
            ...previousInterview.conversation,
            { role: "user", content: newMsg }
          ]
        });
      }

      setInputMessage("");
      return { previousInterview };
    },
    onError: (error, newMsg, context) => {
      if (context?.previousInterview) {
        queryClient.setQueryData(["interview", id], context.previousInterview);
      }
      toast.error(error.response?.data?.message || "Failed to send message");
    },
    onSettled: () => {
      refetch();
    },
  });

  // Auto-start conversational interview if empty
  useEffect(() => {
    if (interview && interview.questionFormat !== "MCQ" && interview.conversation.length === 0 && !isSending && !hasStartedInterview.current) {
      hasStartedInterview.current = true;
      sendMessage("");
    }
  }, [interview, isSending, sendMessage]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    sendMessage(inputMessage.trim());
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast.error("Your browser does not support Speech Recognition.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setInputMessage("");
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleEndInterview = () => {
    if (window.confirm("Are you sure you want to end the interview session now?")) {
      finishInterview();
    }
  };

  if (isInterviewLoading) {
    return (
      <div className="flex flex-col h-screen bg-base-100">
        <Navbar />
        <div className="flex justify-center items-center flex-1">
          <Loader className="w-12 h-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col h-screen bg-base-100">
        <Navbar />
        <div className="flex justify-center items-center flex-1">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-error">Failed to load session</h2>
            <p className="mt-2 text-gray-500">Please try refreshing the page.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!interview) return null;

  const isMCQMode = interview.questionFormat === "MCQ";
  const mcqQuestions = mcqData?.questions || [];
  const currentMCQ = mcqQuestions[mcqIndex];
  const currentFeedback = currentMCQ ? mcqFeedbackMap[currentMCQ.id] : null;

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <Navbar />
      <div className="flex flex-col flex-1 max-w-4xl w-full mx-auto p-4 overflow-hidden">
        
        {/* Header */}
        <div className="bg-base-200 rounded-t-2xl p-4 flex justify-between items-center border-b border-base-300">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg">{interview.category} Interview</h2>
              <span className={`badge ${isMCQMode ? 'badge-secondary' : 'badge-neutral'} text-xs`}>
                {isMCQMode ? 'MCQ Mode' : 'Conversational'}
              </span>
            </div>
            <span className="text-sm text-gray-500">Difficulty: {interview.difficulty}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 font-mono text-lg ${timeLeft < 300 ? 'text-error font-bold' : 'text-base-content'}`}>
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
            
            <button 
              onClick={handleEndInterview} 
              disabled={isEnding}
              className="btn btn-error btn-sm flex items-center gap-2"
            >
              {isEnding ? <Loader className="w-4 h-4 animate-spin" /> : <StopCircle className="w-4 h-4" />}
              End Interview
            </button>
          </div>
        </div>

        {/* MCQ INTERVIEW VIEW */}
        {isMCQMode ? (
          <div className="flex-1 bg-base-100 border-x border-b border-base-300 rounded-b-2xl p-6 overflow-y-auto flex flex-col justify-between">
            {isMcqLoading && !currentMCQ ? (
              <div className="flex flex-col justify-center items-center py-20 gap-3">
                <Loader className="w-10 h-10 animate-spin text-primary" />
                <p className="text-sm text-gray-500 font-medium">Preparing your AI MCQ questions...</p>
              </div>
            ) : currentMCQ ? (
              <div className="flex flex-col h-full max-w-2xl mx-auto w-full justify-between">
                
                <div>
                  {/* Top indicator */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                      Question {mcqIndex + 1}
                    </span>
                    <span className="text-xs text-gray-500">
                      Questions stream continuously until time ends
                    </span>
                  </div>

                  {/* Question Card */}
                  <div className="bg-base-200/70 p-6 rounded-2xl border border-base-300 mb-6 overflow-x-auto">
                    <h3 className="font-bold text-lg md:text-xl text-base-content leading-relaxed whitespace-pre-wrap font-mono">
                      {currentMCQ.question}
                    </h3>
                  </div>

                  {/* Options List */}
                  <div className="space-y-3 mb-6">
                    {currentMCQ.options.map((optionStr) => {
                      const optionLetter = optionStr.trim().charAt(0).toUpperCase();
                      const currentSelected = mcqFeedbackMap[currentMCQ.id]?.selectedOption;
                      const isChosen = currentSelected === optionLetter;

                      return (
                        <button
                          key={optionStr}
                          type="button"
                          disabled={isSubmittingMCQ}
                          onClick={() => {
                            setMcqFeedbackMap((prev) => ({
                              ...prev,
                              [currentMCQ.id]: { selectedOption: optionLetter },
                            }));
                            sendMCQAnswer({ questionId: currentMCQ.id, selectedOption: optionLetter });
                          }}
                          className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all text-base ${
                            isChosen
                              ? "btn-primary font-semibold shadow-md"
                              : "bg-base-100 hover:bg-base-200 border-base-300 text-base-content"
                          }`}
                        >
                          <span className="flex items-start gap-3 w-full overflow-x-auto">
                            <span className="font-bold w-6 text-center shrink-0 mt-0.5">{optionLetter}.</span>
                            <span className="whitespace-pre-wrap font-mono text-sm">{optionStr.replace(/^[A-D]\)\s*/, "")}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="flex justify-between items-center border-t border-base-200 pt-4 mt-auto">
                  <button
                    type="button"
                    disabled={mcqIndex === 0}
                    onClick={() => setMcqIndex((prev) => prev - 1)}
                    className="btn btn-ghost btn-sm"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isSubmittingMCQ}
                      onClick={() => {
                        setMcqFeedbackMap((prev) => ({
                          ...prev,
                          [currentMCQ.id]: { selectedOption: "SKIPPED" },
                        }));
                        sendMCQAnswer({ questionId: currentMCQ.id, selectedOption: "SKIPPED" });
                        setMcqIndex((prev) => prev + 1);
                      }}
                      className="btn btn-outline btn-warning btn-sm"
                    >
                      Skip Question
                    </button>

                    <button
                      type="button"
                      disabled={!mcqFeedbackMap[currentMCQ.id]?.selectedOption}
                      onClick={() => setMcqIndex((prev) => prev + 1)}
                      className="btn btn-primary gap-2"
                    >
                      Next Question
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 mb-4">No MCQ questions available.</p>
                <button onClick={() => refetchMcq()} className="btn btn-outline btn-sm">Reload Questions</button>
              </div>
            )}
          </div>
        ) : (

          /* CONVERSATIONAL MODE VIEW */
          <>
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-base-100 border-x border-base-300 relative">
              <div className="flex flex-col gap-6">
                {interview.conversation.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      
                      {/* Avatar */}
                      <div className="mt-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-primary text-primary-content" : "bg-neutral text-neutral-content"}`}>
                          {msg.role === "user" ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                        </div>
                      </div>

                      {/* Bubble */}
                      <div className={`p-4 rounded-2xl ${msg.role === "user" ? "bg-primary text-primary-content rounded-tr-none" : "bg-base-200 text-base-content rounded-tl-none"}`}>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>

                    </div>
                  </div>
                ))}
                
                {isSending && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] flex gap-3">
                      <div className="mt-1">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral text-neutral-content">
                          <Bot className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-base-200 text-base-content rounded-tl-none flex items-center gap-2">
                        <span className="loading loading-dots loading-sm"></span>
                        <span className="text-sm opacity-70">Interviewer is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-base-200 rounded-b-2xl p-4 border-t border-base-300">
              <form onSubmit={handleSend} className="flex gap-2">
                {interview.mode === "Audio" && (
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`btn ${isRecording ? "btn-error animate-pulse" : "btn-secondary"} h-14 w-14 p-0 shrink-0`}
                    title={isRecording ? "Stop Recording" : "Start Recording"}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                )}
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your response..."
                  className="textarea textarea-bordered flex-1 resize-none h-14"
                  disabled={isSending || isEnding}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                />
                <button 
                  type="submit" 
                  disabled={!inputMessage.trim() || isSending || isEnding}
                  className="btn btn-primary h-14 px-8"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default InterviewSessionPage;
