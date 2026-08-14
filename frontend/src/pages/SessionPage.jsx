import { useUser } from "../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { problemsApi } from "../api/problems";
import { executeCode } from "../lib/execute";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { socket } from "../lib/socket";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [allProblems, setAllProblems] = useState([]);
  const [fullProblemData, setFullProblemData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    problemsApi.getAllProblems().then((data) => {
      if (isMounted && data) {
        setAllProblems(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = (session?.host?.streamUserId || session?.host?._id) === user?.id;
  const isParticipant = (session?.participant?.streamUserId || session?.participant?._id) === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  const [activeProblemTitle, setActiveProblemTitle] = useState(null);

  useEffect(() => {
    if (session?.problem && !activeProblemTitle) {
      setActiveProblemTitle(session.problem);
    }
  }, [session, activeProblemTitle]);

  // Fetch full problem details (with starterCode, examples, constraints) whenever activeProblemTitle changes
  useEffect(() => {
    if (!activeProblemTitle) return;
    let isMounted = true;

    const summaryItem = allProblems.find(
      (p) => p.title === activeProblemTitle || p.problemId === activeProblemTitle || p._id === activeProblemTitle
    );
    const targetId = summaryItem?.problemId || summaryItem?.id || summaryItem?._id || activeProblemTitle;

    problemsApi.getProblemById(targetId).then((fullProb) => {
      if (isMounted && fullProb) {
        setFullProblemData(fullProb);
      }
    });

    return () => { isMounted = false; };
  }, [activeProblemTitle, allProblems]);

  const problemData = fullProblemData || (activeProblemTitle ? allProblems.find((p) => p.title === activeProblemTitle) : null);

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const hasInitializedCode = useRef(false);

  // auto-join session if user is not already a participant and not the host
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;

    if (session.password) {
      const pwd = window.prompt("This session is password protected. Enter password to join:");
      if (pwd === null) {
        navigate("/dashboard");
        return;
      }
      joinSessionMutation.mutate({ id, password: pwd }, {
        onSuccess: refetch,
        onError: () => {
          alert("Incorrect password!");
          navigate("/dashboard");
        }
      });
    } else {
      joinSessionMutation.mutate({ id }, { onSuccess: refetch });
    }
  }, [session, user, loadingSession, isHost, isParticipant, id, navigate]);

  // redirect the "participant" when session ends
  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  // update code when problem loads for the FIRST time
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage] && !hasInitializedCode.current) {
      setCode(problemData.starterCode[selectedLanguage]);
      hasInitializedCode.current = true;
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    // use problem-specific starter code
    const starterCode = problemData?.starterCode?.[newLang] || "";
    setCode(starterCode);
    setOutput(null);

    socket.emit("language_change", { sessionId: id, language: newLang });
    socket.emit("code_change", { sessionId: id, code: starterCode });
  };

  const handleProblemChange = async (e) => {
    const newProblem = e.target.value;
    setActiveProblemTitle(newProblem);

    // reset solved state and timer
    setIsSolved(false);
    setTimerKey(prev => prev + 1);

    // Reset language to javascript when problem changes
    setSelectedLanguage("javascript");

    const summaryItem = allProblems.find(
      (p) => p.title === newProblem || p.problemId === newProblem || p._id === newProblem
    );
    const targetId = summaryItem?.problemId || summaryItem?.id || summaryItem?._id || newProblem;
    const fullData = await problemsApi.getProblemById(targetId);

    const starterCode = fullData?.starterCode?.["javascript"] || "";
    if (fullData) setFullProblemData(fullData);
    setCode(starterCode);
    hasInitializedCode.current = true;
    setOutput(null);

    socket.emit("problem_change", { sessionId: id, problemTitle: newProblem });
    socket.emit("language_change", { sessionId: id, language: "javascript" });
    socket.emit("code_change", { sessionId: id, code: starterCode });
  };

  const handleSolveProblem = () => {
    setIsSolved(true);
    socket.emit("problem_solved", { sessionId: id, isSolved: true });
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this session? All participants will be notified.")) {
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  useEffect(() => {
    if (!id) return;

    socket.connect();
    socket.emit("join_session", id);

    const onCodeChange = ({ code }) => {
      setCode(code);
      hasInitializedCode.current = true;
    };
    const onLanguageChange = ({ language }) => setSelectedLanguage(language);
    const onProblemChange = ({ problemTitle }) => {
      setActiveProblemTitle(problemTitle);
      setIsSolved(false);
      setTimerKey(prev => prev + 1);
    };
    const onProblemSolved = ({ isSolved }) => {
      setIsSolved(isSolved);
      if (isHost && isSolved) {
        import("react-hot-toast").then((toast) => {
          toast.default.success("Candidate has marked the problem as solved!");
        });
      }
    };

    socket.on("code_change", onCodeChange);
    socket.on("language_change", onLanguageChange);
    socket.on("problem_change", onProblemChange);
    socket.on("problem_solved", onProblemSolved);

    return () => {
      socket.off("code_change", onCodeChange);
      socket.off("language_change", onLanguageChange);
      socket.off("problem_change", onProblemChange);
      socket.off("problem_solved", onProblemSolved);
      socket.disconnect();
    };
  }, [id]);

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* LEFT PANEL - CODE EDITOR & PROBLEM DETAILS */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              {/* PROBLEM DSC PANEL */}
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto bg-base-200">
                  {/* HEADER SECTION */}
                  <div className="p-6 bg-base-100 border-b border-base-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        {isHost ? (
                          <select
                            className="select select-bordered select-sm w-full max-w-xs text-xl font-bold bg-base-100 border-none px-0 focus:outline-none mb-1 text-base-content"
                            value={activeProblemTitle || session?.problem || ""}
                            onChange={handleProblemChange}
                          >
                            {allProblems.map((p) => (
                              <option key={p.problemId || p._id || p.id} value={p.title}>{p.title}</option>
                            ))}
                          </select>
                        ) : (
                          <h1 className="text-3xl font-bold text-base-content">
                            {activeProblemTitle || session?.problem || "Loading..."}
                          </h1>
                        )}
                        {problemData?.category && (
                          <p className="text-base-content/60 mt-1">{problemData.category}</p>
                        )}
                        <div className="text-base-content/60 mt-2 text-sm">
                          <p>Host: {session?.host?.name || "Loading..."}</p>
                          <p>Session ID: <span className="font-mono bg-base-300 px-1 rounded">{id}</span></p>
                          <p>{session?.participant ? 2 : 1}/2 participants</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`badge badge-lg ${getDifficultyBadgeClass(
                            session?.difficulty
                          )}`}
                        >
                          {session?.difficulty
                            ? session.difficulty.slice(0, 1).toUpperCase() + session.difficulty.slice(1)
                            : "Easy"}
                        </span>
                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="btn btn-error btn-sm gap-2"
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="w-4 h-4 animate-spin" />
                            ) : (
                              <LogOutIcon className="w-4 h-4" />
                            )}
                            End Session
                          </button>
                        )}
                        {session?.status === "completed" && (
                          <span className="badge badge-ghost badge-lg">Completed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* problem desc */}
                    {problemData?.description && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4 text-base-content">Description</h2>
                        <div className="space-y-3 text-base leading-relaxed">
                          <p className="text-base-content/90">
                            {typeof problemData.description === "object"
                              ? problemData.description.text
                              : problemData.description}
                          </p>
                          {Array.isArray(problemData.description?.notes) &&
                            problemData.description.notes.map((note, idx) => (
                              <p key={idx} className="text-base-content/90">
                                {note}
                              </p>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* examples section */}
                    {problemData?.examples && problemData.examples.length > 0 && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>

                        <div className="space-y-4">
                          {problemData.examples.map((example, idx) => (
                            <div key={idx}>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="badge badge-sm">{idx + 1}</span>
                                <p className="font-semibold text-base-content">Example {idx + 1}</p>
                              </div>
                              <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                                <div className="flex gap-2">
                                  <span className="text-primary font-bold min-w-[70px]">
                                    Input:
                                  </span>
                                  <span>{example.input}</span>
                                </div>
                                <div className="flex gap-2">
                                  <span className="text-secondary font-bold min-w-[70px]">
                                    Output:
                                  </span>
                                  <span>{example.output}</span>
                                </div>
                                {example.explanation && (
                                  <div className="pt-2 border-t border-base-300 mt-2">
                                    <span className="text-base-content/60 font-sans text-xs">
                                      <span className="font-semibold">Explanation:</span>{" "}
                                      {example.explanation}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Constraints */}
                    {problemData?.constraints && problemData.constraints.length > 0 && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
                        <ul className="space-y-2 text-base-content/90">
                          {problemData.constraints.map((constraint, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-primary">•</span>
                              <code className="text-sm">{constraint}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              <Panel defaultSize={50} minSize={20}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel
                      sessionId={id}
                      socket={socket}
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      isSolved={isSolved}
                      isParticipant={isParticipant}
                      timerKey={timerKey}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={(value) => {
                        setCode(value);
                        socket.emit("code_change", { sessionId: id, code: value });
                      }}
                      onRunCode={handleRunCode}
                      onSolve={handleSolveProblem}
                    />
                  </Panel>

                  <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel output={output} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* RIGHT PANEL - VIDEO CALLS & CHAT */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full bg-base-200 p-4 overflow-auto">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
                    <p className="text-lg">Connecting to video call...</p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body items-center text-center">
                      <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-4">
                        <PhoneOffIcon className="w-12 h-12 text-error" />
                      </div>
                      <h2 className="card-title text-2xl">Connection Failed</h2>
                      <p className="text-base-content/70">Unable to connect to the video call</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;
