import { useUser } from "./context/AuthContext";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
import ProblemsPage from "./pages/ProblemsPage";
import SessionPage from "./pages/SessionPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ProfilePage from "./pages/ProfilePage";
import InterviewDashboardPage from "./pages/InterviewDashboardPage";
import InterviewFormPage from "./pages/InterviewFormPage";
import InterviewSessionPage from "./pages/InterviewSessionPage";
import InterviewSummaryPage from "./pages/InterviewSummaryPage";
import ResumeDashboardPage from "./pages/ResumeDashboardPage";
import ResumeReportPage from "./pages/ResumeReportPage";
function App() {
  const { isSignedIn, isLoaded } = useUser();

  // this will get rid of the flickering effect
  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/login" element={!isSignedIn ? <LoginPage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/signup" element={!isSignedIn ? <SignupPage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/verify-email" element={!isSignedIn ? <VerifyEmailPage /> : <Navigate to={"/dashboard"} />} />

        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
        <Route path="/profile" element={isSignedIn ? <ProfilePage /> : <Navigate to={"/"} />} />

        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path="/problem/:id" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
        <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />

        <Route path="/interviews" element={isSignedIn ? <InterviewDashboardPage /> : <Navigate to={"/"} />} />
        <Route path="/interviews/new" element={isSignedIn ? <InterviewFormPage /> : <Navigate to={"/"} />} />
        <Route path="/interviews/session/:id" element={isSignedIn ? <InterviewSessionPage /> : <Navigate to={"/"} />} />
        <Route path="/interviews/summary/:id" element={isSignedIn ? <InterviewSummaryPage /> : <Navigate to={"/"} />} />
        
        <Route path="/resume" element={isSignedIn ? <ResumeDashboardPage /> : <Navigate to={"/"} />} />
        <Route path="/resume/report/:id" element={isSignedIn ? <ResumeReportPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
