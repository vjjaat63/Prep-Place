import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon, TimerIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  sessionId,
  socket,
  selectedLanguage,
  code,
  isRunning,
  isSuccess,
  isSolved,
  isParticipant,
  timerKey,
  onLanguageChange,
  onCodeChange,
  onRunCode,
  onSolve,
}) {
  const [seconds, setSeconds] = useState(0);
  const editorRef = useRef(null);
  const decorationsRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    editor.onDidChangeCursorPosition((e) => {
      if (socket && sessionId) {
        socket.emit("cursor_change", {
          sessionId,
          cursor: e.position,
        });
      }
    });

    if (socket) {
      socket.on("cursor_change", ({ cursor }) => {
        if (!editorRef.current) return;
        
        const decoration = {
          range: new monaco.Range(cursor.lineNumber, cursor.column, cursor.lineNumber, cursor.column),
          options: {
            className: "remote-cursor",
            isWholeLine: false,
          }
        };

        if (!decorationsRef.current) {
          decorationsRef.current = editor.createDecorationsCollection([decoration]);
        } else {
          decorationsRef.current.set([decoration]);
        }
      });
    }
  };

  useEffect(() => {
    setSeconds(0);
  }, [timerKey]);

  useEffect(() => {
    let timer;
    if (!isSuccess && !isSolved) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSuccess, isSolved]);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60)
      .toString()
      .padStart(2, "0");

    return `${m}:${s}`;
  };

  return (
    <div className="h-full bg-base-300 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-b border-base-300">
        <div className="flex items-center gap-3">
          {LANGUAGE_CONFIG[selectedLanguage].icon && (
            <img
              src={LANGUAGE_CONFIG[selectedLanguage].icon}
              alt={LANGUAGE_CONFIG[selectedLanguage].name}
              className="size-6"
            />
          )}

          <select
            className="select select-sm"
            value={selectedLanguage}
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 font-mono ${isSuccess || isSolved ? 'text-success font-bold' : 'text-base-content/70'}`}>
            <TimerIcon className={`size-4 ${isSuccess || isSolved ? 'animate-bounce' : ''}`} />
            {formatTime(seconds)}
          </div>

          {isParticipant && !isSolved && (
            <button
              className="btn btn-success btn-sm gap-2"
              onClick={onSolve}
            >
              Mark as Solved
            </button>
          )}

          <button
            className="btn btn-primary btn-sm gap-2"
            disabled={isRunning}
            onClick={onRunCode}
          >
            {isRunning ? (
              <>
                <Loader2Icon className="size-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <PlayIcon className="size-4" />
                Run Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: {
              enabled: false,
            },
            tabSize: 2,
            wordWrap: "on",
            renderWhitespace: "selection",
            padding: {
              top: 12,
            },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;