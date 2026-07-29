import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
  BotIcon,
  FileTextIcon,
  CodeIcon,
  ShieldCheckIcon,
} from "lucide-react";


function HomePage() {
  return (
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* NAVBAR */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <SparklesIcon className="size-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                Prep Place
              </span>
              <span className="text-xs text-base-content/60 font-medium -mt-1">Code Together</span>
            </div>
          </Link>

          {/* AUTH BTN */}
          <Link to="/login">
            <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
              <span>Get Started</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div className="badge badge-primary badge-lg">
              <ZapIcon className="size-4" />
              Real-time Collaboration
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Master Your
              </span>
              <br />
              <span className="text-base-content">Tech Interviews</span>
            </h1>

            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              The ultimate all-in-one platform to prepare for technical interviews. Practice coding problems, conduct collaborative peer interviews, take AI mock interviews, and analyze your resume.
            </p>

            {/* FEATURE PILLS */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success mr-2" />
                Coding Problems
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success mr-2" />
                AI Mock Interviews
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success mr-2" />
                Peer Sessions
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success mr-2" />
                Resume Analysis
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success mr-2" />
                Privacy First
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <button className="btn btn-primary btn-lg">
                  Start Coding Now
                  <ArrowRightIcon className="size-5" />
                </button>
              </Link>
            </div>

            {/* STATS */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg">
              <div className="stat">
                <div className="stat-value text-primary">10K+</div>
                <div className="stat-title">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-value text-secondary">50K+</div>
                <div className="stat-title">Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-value text-accent">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <img
            src="/hero.png"
            alt="CodeCollab Platform"
            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to <span className="text-primary font-mono">Succeed</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless and productive
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1: Problems */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <CodeIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Coding Problems</h3>
              <p className="text-base-content/70">
                Practice with a curated list of DSA problems. Write code, run tests, and track your progress.
              </p>
            </div>
          </div>

          {/* Feature 2: Collaborative */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-secondary" />
              </div>
              <h3 className="card-title">Peer Interviews</h3>
              <p className="text-base-content/70">
                Collaborate in real-time with HD video, shared code editor, and synced execution.
              </p>
            </div>
          </div>

          {/* Feature 3: AI Mock */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                <BotIcon className="size-8 text-accent" />
              </div>
              <h3 className="card-title">AI Mock Interviews</h3>
              <p className="text-base-content/70">
                Simulate real interviews with an AI interviewer. Get instant feedback on your code and communication.
              </p>
            </div>
          </div>

          {/* Feature 4: Resume */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-success/10 rounded-2xl flex items-center justify-center mb-4">
                <FileTextIcon className="size-8 text-success" />
              </div>
              <h3 className="card-title">Resume Analysis</h3>
              <p className="text-base-content/70">
                Upload your resume for AI-powered ATS scoring, detailed feedback, and tailored suggestions.
              </p>
            </div>
          </div>

          {/* Feature 5: Privacy */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-info/10 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheckIcon className="size-8 text-info" />
              </div>
              <h3 className="card-title">Privacy First</h3>
              <p className="text-base-content/70">
                Your data is yours. All video and chat data is permanently deleted the moment your session ends.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <footer className="footer footer-center p-10 bg-base-200/50 text-base-content mt-20 border-t border-primary/10">
        <aside>
          <div className="flex items-center gap-2 mb-2 justify-center">
            <SparklesIcon className="size-5 text-primary" />
            <span className="font-bold text-lg">Prep Place</span>
          </div>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by Prep Place</p>
        </aside>
      </footer>
    </div>
  );
}
export default HomePage;
