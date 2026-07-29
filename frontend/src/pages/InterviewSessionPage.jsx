import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInterviewById, continueInterview, endInterview } from "../api/interview";
import { Send, Loader, StopCircle, User, Bot, Clock, Mic, MicOff } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const InterviewSessionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
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
      // Only force-redirect if the user is still on THIS interview's session page.
      // If they navigated away to start another interview, don't yank them back.
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

  // Handle sending a message
  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: (msg) => continueInterview(id, msg),
    onMutate: async (newMsg) => {
      if (!newMsg) return; // Ignore initial empty message for optimistic update

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

  // Auto-start if empty
  useEffect(() => {
    if (interview && interview.conversation.length === 0 && !isSending && !hasStartedInterview.current) {
      hasStartedInterview.current = true;
      sendMessage(""); // Send an empty message to trigger the AI's first greeting
    }
  }, [interview, isSending, sendMessage]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    // Stop recording if active when sending
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
      setInputMessage(""); // Clear previous input
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleEndInterview = () => {
    if (window.confirm("Are you sure you want to end the interview now?")) {
      finishInterview();
    }
  };

  if (isInterviewLoading) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex justify-center items-center flex-1">
          <Loader className="w-12 h-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col h-screen">
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

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col flex-1 max-w-4xl w-full mx-auto p-4 overflow-hidden">
        
        {/* Header */}
        <div className="bg-base-200 rounded-t-2xl p-4 flex justify-between items-center border-b border-base-300">
        <div>
          <h2 className="font-bold text-lg">{interview.category} Interview</h2>
          <span className="text-sm text-gray-500">Difficulty: {interview.difficulty}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 font-mono text-lg ${timeLeft < 300 ? 'text-error font-bold' : 'text-base-content'}`}>
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
          
          <button 
            onClick={handleEndInterview} 
            disabled={isEnding || isSending}
            className="btn btn-error btn-sm flex items-center gap-2"
          >
            {isEnding ? <Loader className="w-4 h-4 animate-spin" /> : <StopCircle className="w-4 h-4" />}
            End Interview
          </button>
        </div>
      </div>

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

      </div>
    </div>
  );
};

export default InterviewSessionPage;
