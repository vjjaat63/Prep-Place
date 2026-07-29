import { useState, useEffect } from "react";
import { Link } from "react-router";
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

      {/* HERO SECTION */}
      <div className="relative overflow-hidden">
        {/* Background glow elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-100/50 border border-primary/30 backdrop-blur-sm shadow-sm hover:border-primary/60 transition-colors cursor-default">
              <ZapIcon className="size-4 text-warning animate-bounce" />
              <span className="text-sm font-medium">The Ultimate Preparation Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
              Master Your <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block min-w-[300px] text-left">
                {text}
                <span className="animate-pulse border-r-4 border-primary ml-1 h-12 inline-block align-middle">&nbsp;</span>
              </span>
            </h1>

            <p className="text-xl text-base-content/70 leading-relaxed max-w-2xl mx-auto">
              Elevate your career with AI-powered mock interviews, real-time collaborative peer sessions, and intelligent resume analysis.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/signup">
                <button className="btn btn-primary btn-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform group">
                  Start Practicing Free
                  <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE BENTO GRID SHOWCASE */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* 1. Code Summary & AI Review (Spans 2 cols) */}
          <div className="md:col-span-2 row-span-1 rounded-3xl bg-base-100/60 backdrop-blur-xl border border-base-content/10 overflow-hidden group hover:border-primary/50 transition-colors shadow-lg relative flex flex-col cursor-crosshair">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
            <div className="p-8 pb-0 flex-1 relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/20 rounded-xl text-primary"><BrainCircuitIcon className="size-6" /></div>
                <h3 className="text-2xl font-bold">AI Code Review</h3>
              </div>
              <p className="text-base-content/70 mb-6 max-w-md">Get instant code summaries, time complexity analysis, and optimization suggestions while you type.</p>
              
              {/* Interactive Mockup */}
              <div className="mt-auto bg-[#1e1e2e] rounded-t-xl border-x border-t border-base-content/10 p-4 font-mono text-sm shadow-2xl relative overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex gap-2 mb-3">
                  <div className="size-3 rounded-full bg-error/80" />
                  <div className="size-3 rounded-full bg-warning/80" />
                  <div className="size-3 rounded-full bg-success/80" />
                </div>
                <div className="text-accent">function <span className="text-blue-400">twoSum</span>(nums, target) {'{'}</div>
                <div className="pl-4 text-base-content/50">{'// Typing...'}</div>
                <div className="text-accent">{'}'}</div>
                
                {/* AI Overlay Mock */}
                <div className="absolute right-4 bottom-4 bg-base-100/90 backdrop-blur border border-primary/30 p-3 rounded-lg shadow-xl translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex items-start gap-3">
                  <SparklesIcon className="size-5 text-primary animate-pulse mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-base-content">AI Insight</div>
                    <div className="text-xs text-base-content/70">O(n) time complexity achieved using a Hash Map!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Audio AI Mock Interview */}
          <div className="col-span-1 row-span-1 rounded-3xl bg-gradient-to-br from-secondary/10 to-accent/5 backdrop-blur-xl border border-secondary/20 overflow-hidden group hover:border-secondary/50 transition-colors shadow-lg p-8 flex flex-col justify-between cursor-pointer">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-secondary/20 rounded-xl text-secondary"><MicIcon className="size-6" /></div>
                <h3 className="text-2xl font-bold">Voice AI Mocks</h3>
              </div>
              <p className="text-base-content/70">Practice speaking with our conversational AI interviewer.</p>
            </div>
            
            {/* Audio Wave Mockup */}
            <div className="flex justify-center items-center h-24 gap-1.5 mt-auto bg-base-200/50 rounded-2xl group-hover:bg-base-200 transition-colors">
              {[4, 8, 3, 10, 5, 12, 6, 8, 4].map((h, i) => (
                <div 
                  key={i} 
                  className="w-2 bg-secondary rounded-full group-hover:animate-pulse"
                  style={{ height: `${h * 10}%`, animationDelay: `${i * 150}ms`, animationDuration: '1s' }}
                />
              ))}
            </div>
          </div>

          {/* 3. Resume ATS Analyzer */}
          <div className="col-span-1 row-span-1 rounded-3xl bg-base-100/60 backdrop-blur-xl border border-base-content/10 overflow-hidden group hover:border-success/50 transition-colors shadow-lg p-8 flex flex-col relative cursor-pointer">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-success/10 rounded-full blur-3xl group-hover:bg-success/20 transition-colors" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="p-3 bg-success/20 rounded-xl text-success"><FileTextIcon className="size-6" /></div>
              <h3 className="text-2xl font-bold">ATS Resume</h3>
            </div>
            <p className="text-base-content/70 relative z-10">Upload your PDF and beat the ATS with actionable feedback.</p>
            
            {/* Score Radial Mockup */}
            <div className="mt-auto flex justify-center relative z-10 group-hover:scale-110 transition-transform duration-500">
              <div className="size-24 rounded-full border-4 border-base-content/10 border-t-success border-r-success flex items-center justify-center rotate-45 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <div className="-rotate-45 text-2xl font-black text-success">92%</div>
              </div>
            </div>
          </div>

          {/* 4. Real-time Peer Sessions (Spans 2 cols) */}
          <div className="md:col-span-2 row-span-1 rounded-3xl bg-base-100/60 backdrop-blur-xl border border-base-content/10 overflow-hidden group hover:border-info/50 transition-colors shadow-lg relative flex flex-col sm:flex-row cursor-pointer">
            <div className="p-8 flex-1 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-info/20 rounded-xl text-info"><UsersIcon className="size-6" /></div>
                <h3 className="text-2xl font-bold">Peer Sessions</h3>
              </div>
              <p className="text-base-content/70 max-w-sm mb-6">Collaborate in real-time with HD video and a synchronized code editor. Solve problems together.</p>
              <div className="flex gap-2">
                <div className="badge badge-outline bg-base-100"><TerminalIcon className="size-3 mr-1"/> Code Sync</div>
                <div className="badge badge-outline bg-base-100"><VideoIcon className="size-3 mr-1"/> HD Video</div>
              </div>
            </div>
            
            {/* Video + Code Split Mockup */}
            <div className="flex-1 bg-base-200/50 p-4 sm:p-8 flex items-center justify-center relative overflow-hidden group-hover:bg-base-200/80 transition-colors">
              <div className="w-full max-w-[280px] aspect-video bg-base-300 rounded-xl shadow-2xl relative overflow-hidden border border-base-content/10 group-hover:rotate-2 group-hover:scale-105 transition-all duration-500 z-10 flex">
                <div className="flex-1 bg-[#1e1e2e] p-2 border-r border-base-content/10 relative">
                  <div className="h-1 w-8 bg-blue-500/50 rounded mb-1"/>
                  <div className="h-1 w-12 bg-accent/50 rounded mb-1"/>
                  <div className="absolute w-0.5 h-3 bg-white top-2 left-10 animate-ping"/>
                </div>
                <div className="w-1/3 bg-base-100 flex flex-col p-1 gap-1">
                  <div className="flex-1 bg-base-300 rounded overflow-hidden relative"><div className="absolute inset-0 flex items-center justify-center"><UsersIcon className="size-3 text-base-content/30"/></div></div>
                  <div className="flex-1 bg-base-300 rounded overflow-hidden relative"><div className="absolute inset-0 flex items-center justify-center"><UsersIcon className="size-3 text-base-content/30"/></div></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* QUICK FEATURES STRIP */}
      <div className="border-y border-base-content/10 bg-base-100/50 py-8 my-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
          <div className="flex items-center gap-2"><CodeIcon className="size-5 text-primary"/><span className="font-medium">DSA Practice</span></div>
          <div className="flex items-center gap-2"><TerminalIcon className="size-5 text-secondary"/><span className="font-medium">In-browser Execution</span></div>
          <div className="flex items-center gap-2"><ShieldCheckIcon className="size-5 text-success"/><span className="font-medium">Privacy First (No Data)</span></div>
          <div className="flex items-center gap-2"><ZapIcon className="size-5 text-warning"/><span className="font-medium">Instant Feedback</span></div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer footer-center p-10 mt-12 pb-12">
        <aside>
          <div className="flex items-center gap-2 mb-2 justify-center group cursor-pointer">
            <SparklesIcon className="size-5 text-primary group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-lg">Prep Place</span>
          </div>
          <p className="opacity-60">Copyright © {new Date().getFullYear()} - Master the technical interview.</p>
        </aside>
      </footer>
    </div>
  );
}

export default HomePage;
