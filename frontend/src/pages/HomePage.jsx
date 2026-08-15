import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useUser } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import {
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  BotIcon,
  FileTextIcon,
  CodeIcon,
  ShieldCheckIcon,
  MicIcon,
  BrainCircuitIcon,
  PlayIcon,
  TerminalIcon,
  VideoIcon
} from "lucide-react";

function HomePage() {
  const { isSignedIn, user } = useUser();
  const [text, setText] = useState("");
  const fullText = "Tech Interviews";
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
      } else {
        setText(fullText.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, isDeleting ? 100 : 150);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, fullText]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 font-sans selection:bg-primary/30">
      {/* NAVBAR */}
      {isSignedIn ? (
        <Navbar />
      ) : (
        <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
            <Link to={"/"} className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 skew-x-12 -ml-4" />
                <SparklesIcon className="size-6 text-white relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                  Prep Place
                </span>
                <span className="text-xs text-base-content/60 font-medium -mt-1">Code Together</span>
              </div>
            </Link>

            <Link to="/login">
              <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 hover:scale-105 flex items-center gap-2">
                <span>Get Started</span>
                <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </nav>
      )}

      {/* HERO SECTION */}
      <div className="relative overflow-hidden">
        {/* Background glow elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">

            {/* Version Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-100/70 border border-primary/40 backdrop-blur-md shadow-md hover:border-primary transition-all cursor-default group">
              <span className="badge badge-sm bg-gradient-to-r from-primary to-secondary text-white font-mono font-bold border-none">
                v2.4.0 Live
              </span>
              <span className="text-xs md:text-sm font-semibold text-base-content flex items-center gap-1">
                Interactive AI MCQ Quizzes, Multi-Domain Mocks & Role Resume Analyzer
              </span>
              <ZapIcon className="size-4 text-warning animate-pulse ml-1" />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
              Master Your <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block min-w-[320px] text-left">
                {text}
                <span className="animate-pulse border-r-4 border-primary ml-1 h-12 inline-block align-middle">&nbsp;</span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-base-content/75 leading-relaxed max-w-2xl mx-auto">
              Prepare for top product tech companies (FAANG/MAANG) with AI Mock Interviews, instant MCQ quizzes, role-tailored resume ATS analytics, and live peer coding.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              {isSignedIn ? (
                <>
                  <Link to="/dashboard">
                    <button className="btn btn-primary btn-lg shadow-xl shadow-primary/25 hover:scale-105 transition-transform group">
                      Go to Dashboard
                      <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <Link to="/interviews/new">
                    <button className="btn btn-outline btn-secondary btn-lg hover:scale-105 transition-transform gap-2">
                      <BotIcon className="size-5" />
                      Start AI Interview
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <button className="btn btn-primary btn-lg shadow-xl shadow-primary/25 hover:scale-105 transition-transform group">
                      Start Practicing Free
                      <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="btn btn-outline btn-lg hover:scale-105 transition-transform">
                      Sign In
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Live Stats Strip */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="p-3 rounded-2xl bg-base-100/50 border border-base-300 backdrop-blur">
                <div className="text-2xl font-black text-primary">FAANG</div>
                <div className="text-xs text-base-content/60 font-medium">Real-World Questions</div>
              </div>
              <div className="p-3 rounded-2xl bg-base-100/50 border border-base-300 backdrop-blur">
                <div className="text-2xl font-black text-secondary">0ms Latency</div>
                <div className="text-xs text-base-content/60 font-medium">Instant MCQ Stream</div>
              </div>
              <div className="p-3 rounded-2xl bg-base-100/50 border border-base-300 backdrop-blur">
                <div className="text-2xl font-black text-accent">4 Domains</div>
                <div className="text-xs text-base-content/60 font-medium">Multi-Topic Mocks</div>
              </div>
              <div className="p-3 rounded-2xl bg-base-100/50 border border-base-300 backdrop-blur">
                <div className="text-2xl font-black text-success">Role-ATS</div>
                <div className="text-xs text-base-content/60 font-medium">Resume Analyzer</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FEATURE SHOWCASE BENTO GRID */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mb-3">
            Everything You Need to Ace Your Tech Interviews
          </h2>
          <p className="text-base-content/70 max-w-xl mx-auto">
            From realistic AI interview rounds to collaborative pair coding and resume analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">

          {/* 1. AI Mock Interviewer (Conversational & MCQ Quiz) (Spans 2 cols) */}
          <div className="md:col-span-2 row-span-1 rounded-3xl bg-base-100/70 backdrop-blur-xl border border-base-content/10 overflow-hidden group hover:border-primary/50 transition-all shadow-xl p-8 flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/20 rounded-xl text-primary"><BotIcon className="size-6" /></div>
                  <h3 className="text-2xl font-bold">AI Mock Interviewer</h3>
                </div>
                <span className="badge badge-secondary font-mono text-xs">Conversational + MCQs</span>
              </div>
              <p className="text-base-content/70 max-w-lg mb-4 text-sm md:text-base">
                Multi-domain technical interviews (`Core Subjects`, `Languages`, `Applied Tech`, `HR`). Includes continuous instant MCQ quizzes, Skip Question button, and targeted wrong-answer explanation reports.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-outline text-xs">⚡ Auto Progress Saver</span>
                <span className="badge badge-outline text-xs">⚡ Seamless Streaming</span>
                <span className="badge badge-outline text-xs">⚡ FAANG Questions</span>
                <span className="badge badge-outline text-xs">⚡ Voice AI Support</span>
              </div>
            </div>

            <div className="relative z-10 mt-auto bg-base-200/60 p-3 rounded-xl border border-base-300 flex items-center justify-between">
              <span className="text-xs font-semibold text-base-content/80 flex items-center gap-2">
                <SparklesIcon className="size-4 text-primary" /> Multi-Topic Selection: DSA + OS + Python
              </span>
              <Link to={isSignedIn ? "/interviews/new" : "/login"} className="btn btn-xs btn-primary">
                Try Session
              </Link>
            </div>
          </div>

          {/* 2. Role-Tailored Resume ATS Analyzer */}
          <div className="col-span-1 row-span-1 rounded-3xl bg-base-100/70 backdrop-blur-xl border border-success/20 overflow-hidden group hover:border-success/50 transition-all shadow-xl p-8 flex flex-col justify-between relative">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-success/10 rounded-full blur-3xl group-hover:bg-success/20 transition-colors" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-success/20 rounded-xl text-success"><FileTextIcon className="size-6" /></div>
                <h3 className="text-2xl font-bold">Resume ATS Analyzer</h3>
              </div>
              <p className="text-base-content/70 text-sm">
                Upload PDF/DOCX resumes, pick target job roles, and receive weighted ATS scores, missing skills, and analysis history.
              </p>
            </div>

            <div className="relative z-10 mt-auto flex items-center justify-between bg-success/5 p-3 rounded-xl border border-success/20">
              <div>
                <div className="text-xs text-base-content/60">Targeted ATS Score</div>
                <div className="text-xl font-extrabold text-success">92 / 100</div>
              </div>
              <Link to={isSignedIn ? "/resume" : "/login"} className="btn btn-xs btn-success text-white">
                Upload Resume
              </Link>
            </div>
          </div>

          {/* 3. Live 1-on-1 Peer Sessions (Spans 2 cols) */}
          <div className="md:col-span-2 row-span-1 rounded-3xl bg-base-100/70 backdrop-blur-xl border border-info/20 overflow-hidden group hover:border-info/50 transition-all shadow-xl p-8 flex flex-col justify-between relative">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-info/20 rounded-xl text-info"><UsersIcon className="size-6" /></div>
                  <h3 className="text-2xl font-bold">Collaborative Peer Rooms</h3>
                </div>
                <span className="badge badge-info text-white font-mono text-xs">Interactive Pair Coding</span>
              </div>
              <p className="text-base-content/70 max-w-lg mb-4 text-sm md:text-base">
                Code live with peers in a real-time synchronized editor with live cursor tracking and HD video calls.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-outline text-xs">HD Video Calling</span>
                <span className="badge badge-outline text-xs">Live Cursor Sync</span>
                <span className="badge badge-outline text-xs">Monaco Code Editor</span>
              </div>
            </div>

            <div className="relative z-10 mt-auto flex items-center justify-between bg-info/5 p-3 rounded-xl border border-info/20">
              <span className="text-xs font-semibold text-base-content/80 flex items-center gap-2">
                <VideoIcon className="size-4 text-info" /> 1-on-1 Video & Code Synchronization
              </span>
              <Link to={isSignedIn ? "/problems" : "/login"} className="btn btn-xs btn-info text-white">
                Find Peer Room
              </Link>
            </div>
          </div>

          {/* 5. Automated Email Feedback Dispatch (Spans 1 col) */}
          <div className="col-span-1 row-span-1 rounded-3xl bg-base-100/70 backdrop-blur-xl border border-primary/20 overflow-hidden group hover:border-primary/50 transition-all shadow-xl p-8 flex flex-col justify-between relative">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-primary/20 rounded-xl text-primary"><ZapIcon className="size-6" /></div>
                <h3 className="text-2xl font-bold">Automated Email Reports</h3>
              </div>
              <p className="text-base-content/70 text-sm">
                Receive instant performance report cards, score breakdowns, and step-by-step action plans delivered straight to your inbox after every session.
              </p>
            </div>

            <div className="relative z-10 mt-auto flex items-center justify-between bg-primary/5 p-3 rounded-xl border border-primary/20">
              <div>
                <div className="text-xs text-base-content/60">Instant Delivery</div>
                <div className="text-xs font-bold text-primary">Strengths & Action Plans</div>
              </div>
              <span className="badge badge-primary badge-sm">Auto-Sent</span>
            </div>
          </div>

          {/* 6. Admin Dynamic Topic Manager (Spans 1 col) */}
          <div className="col-span-1 row-span-1 rounded-3xl bg-base-100/70 backdrop-blur-xl border border-secondary/20 overflow-hidden group hover:border-secondary/50 transition-all shadow-xl p-8 flex flex-col justify-between relative">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-secondary/20 rounded-xl text-secondary"><ShieldCheckIcon className="size-6" /></div>
                <h3 className="text-2xl font-bold">Custom Topic Manager</h3>
              </div>
              <p className="text-base-content/70 text-sm">
                Administrators can dynamically seed and customize interview topics across Core Subjects, Programming Languages, Applied Tech, and Soft Skills.
              </p>
            </div>

            <div className="relative z-10 mt-auto flex items-center justify-between bg-secondary/5 p-3 rounded-xl border border-secondary/20">
              <div>
                <div className="text-xs text-base-content/60">Dynamic Seeding</div>
                <div className="text-xs font-bold text-secondary">Custom Subject Creation</div>
              </div>
              <span className="badge badge-secondary badge-sm">👑 Admin Controls</span>
            </div>
          </div>

          {/* 7. Passwordless OTP & OAuth Integration (Spans 1 col) */}
          <div className="col-span-1 row-span-1 rounded-3xl bg-base-100/70 backdrop-blur-xl border border-accent/20 overflow-hidden group hover:border-accent/50 transition-all shadow-xl p-8 flex flex-col justify-between relative">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-accent/20 rounded-xl text-accent"><UsersIcon className="size-6" /></div>
                <h3 className="text-2xl font-bold">Secure Authentication</h3>
              </div>
              <p className="text-base-content/70 text-sm">
                1-click Google & GitHub OAuth sign-in, passwordless 6-digit email OTP verifications, and instant avatar generation.
              </p>
            </div>

            <div className="relative z-10 mt-auto flex items-center justify-between bg-accent/5 p-3 rounded-xl border border-accent/20">
              <div>
                <div className="text-xs text-base-content/60">OAuth & OTP</div>
                <div className="text-xs font-bold text-accent">Google, GitHub & Email</div>
              </div>
              <span className="badge badge-accent badge-sm">Encrypted</span>
            </div>
          </div>

        </div>
      </div>

      {/* QUICK FEATURES STRIP */}
      <div className="border-y border-base-content/10 bg-base-100/50 py-8 my-12 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-80 text-sm">
          <div className="flex items-center gap-2"><CodeIcon className="size-5 text-primary" /><span className="font-semibold">FAANG DSA Practice</span></div>
          <div className="flex items-center gap-2"><TerminalIcon className="size-5 text-secondary" /><span className="font-semibold">Cloud Code Execution</span></div>
          <div className="flex items-center gap-2"><ShieldCheckIcon className="size-5 text-success" /><span className="font-semibold">Auto Session Progress Saver</span></div>
          <div className="flex items-center gap-2"><ZapIcon className="size-5 text-warning" /><span className="font-semibold">Targeted Reports</span></div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer footer-center p-10 mt-12 pb-12">
        <aside>
          <div className="flex items-center gap-2 mb-2 justify-center group cursor-pointer">
            <SparklesIcon className="size-5 text-primary group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-lg">Prep Place</span>
            <span className="badge badge-xs bg-primary text-white font-mono">v2.4.0</span>
          </div>
          <p className="text-xs text-base-content/60">
            © {new Date().getFullYear()} Prep Place — Full-Stack Technical Interview Preparation Platform. All rights reserved.
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default HomePage;
