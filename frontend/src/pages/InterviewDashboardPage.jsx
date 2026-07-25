import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { getInterviewHistory } from "../api/interview";
import { PlusCircle, Brain, Calendar, Clock, Trophy } from "lucide-react";
import { format } from "date-fns";
import Navbar from "../components/Navbar";

const InterviewDashboardPage = () => {
  const { data: interviews, isLoading, isError } = useQuery({
    queryKey: ["interviews"],
    queryFn: getInterviewHistory,
  });

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            Mock Interviews
          </h1>
          <p className="text-gray-500 mt-2">Practice with our AI interviewer to ace your next job interview.</p>
        </div>
        <Link
          to="/interviews/new"
          className="btn btn-primary flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Start New Interview
        </Link>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-48 w-full"></div>
          ))}
        </div>
      )}

      {isError && (
        <div className="alert alert-error">
          <span>Failed to load interview history. Please try again later.</span>
        </div>
      )}

      {!isLoading && !isError && interviews?.length === 0 && (
        <div className="text-center py-16 bg-base-200 rounded-xl border border-base-300">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-semibold mb-2">No Interviews Yet</h2>
          <p className="text-gray-500 mb-6">Start your first mock interview to get AI-powered feedback.</p>
          <Link to="/interviews/new" className="btn btn-primary">
            Start Practicing
          </Link>
        </div>
      )}

      {!isLoading && !isError && interviews?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((interview) => (
            <div key={interview._id} className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all">
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="card-title text-lg font-bold">{interview.category}</h2>
                  <div className={`badge ${
                    interview.difficulty === 'Easy' ? 'badge-success' :
                    interview.difficulty === 'Medium' ? 'badge-warning' : 'badge-error'
                  } badge-outline`}>
                    {interview.difficulty}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(interview.createdAt), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{interview.duration} mins</span>
                  </div>
                  {interview.status === "Completed" && interview.score && (
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Trophy className="w-4 h-4" />
                      <span>Score: {interview.score.overall}/100</span>
                    </div>
                  )}
                </div>

                <div className="card-actions justify-end mt-auto">
                  {interview.status === "Completed" ? (
                    <Link to={`/interviews/summary/${interview._id}`} className="btn btn-sm btn-outline w-full">
                      View Feedback
                    </Link>
                  ) : (
                    <Link to={`/interviews/session/${interview._id}`} className="btn btn-sm btn-primary w-full">
                      {new Date().getTime() > new Date(interview.createdAt).getTime() + interview.duration * 60 * 1000 
                        ? "Finish Processing" 
                        : "Continue Session"}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default InterviewDashboardPage;
