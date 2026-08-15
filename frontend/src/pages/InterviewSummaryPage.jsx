import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getInterviewById } from "../api/interview";
import { Loader, Trophy, ChevronRight, CheckCircle2, AlertCircle, BookOpen, BrainCircuit } from "lucide-react";
import Navbar from "../components/Navbar";

const InterviewSummaryPage = () => {
  const { id } = useParams();

  const { data: interview, isLoading, isError } = useQuery({
    queryKey: ["interview", id],
    queryFn: () => getInterviewById(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-12 h-12 animate-spin text-primary" />
          <p className="text-lg font-medium text-gray-600 animate-pulse">Generating your AI feedback report...</p>
        </div>
      </div>
    );
  }

  if (isError || !interview) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="alert alert-error">Failed to load interview summary.</div>
        <Link to="/interviews" className="btn btn-primary mt-4">Back to Dashboard</Link>
      </div>
    );
  }

  // If somehow the user navigates here before completing
  if (interview.status !== "Completed" || !interview.score) {
    return (
      <div className="container mx-auto p-4 text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Interview Not Completed</h2>
        <p className="mb-6">This interview is still ongoing or feedback is not ready yet.</p>
        <Link to={`/interviews/session/${id}`} className="btn btn-primary">Return to Session</Link>
      </div>
    );
  }

  const { score, feedback } = interview;

  const ScoreCard = ({ title, value }) => {
    let colorClass = "text-error";
    if (value >= 80) colorClass = "text-success";
    else if (value >= 60) colorClass = "text-warning";

    return (
      <div className="bg-base-200 p-4 rounded-xl flex flex-col items-center justify-center border border-base-300">
        <span className="text-sm font-semibold text-gray-500 mb-1 text-center">{title}</span>
        <span className={`text-3xl font-bold ${colorClass}`}>{value}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
          <Trophy className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Interview Report</h1>
        <p className="text-lg text-gray-500">{interview.category} • {interview.difficulty}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Scores & Feedback */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Score Overview */}
          <section className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BrainCircuit className="text-primary" /> Performance Breakdown
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ScoreCard title="Technical" value={score.technical} />
              <ScoreCard title="Problem Solving" value={score.problemSolving} />
              <ScoreCard title="Communication" value={score.communication} />
              <ScoreCard title="Confidence" value={score.confidence} />
            </div>
            <div className="mt-6 pt-6 border-t border-base-200 text-center">
              <span className="text-gray-500 font-medium">Overall Score</span>
              <div className="text-5xl font-extrabold text-primary mt-2">{score.overall}<span className="text-2xl text-gray-400">/100</span></div>
            </div>
          </section>

          {/* Detailed Feedback */}
          <section className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200">
            <h2 className="text-2xl font-bold mb-6 text-base-content">AI Evaluation</h2>
            <p className="text-base-content/80 mb-8 leading-relaxed text-sm md:text-base">
              {feedback.general}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-success/5 p-4 rounded-xl border border-success/20">
                <h3 className="font-bold text-success flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" /> Key Strengths
                </h3>
                <ul className="space-y-2">
                  {feedback.strengths?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-base-content/80">
                      <span className="text-success mt-1">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-error/5 p-4 rounded-xl border border-error/20">
                <h3 className="font-bold text-error flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 shrink-0" /> Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {feedback.weaknesses?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-base-content/80">
                      <span className="text-error mt-1">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Recommendations & Actions */}
        <div className="flex flex-col gap-6">
          
          {/* Action Plan */}
          <section className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 flex flex-col justify-between">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-base-content border-b border-base-200 pb-3">
              <BookOpen className="text-primary w-5 h-5 shrink-0" /> Action Plan
            </h2>
            
            {/* Topics to Review */}
            <div className="mb-5">
              <h4 className="font-bold text-xs text-base-content/60 uppercase tracking-wider mb-2.5">
                Topics to Review
              </h4>
              <div className="flex flex-wrap gap-2">
                {feedback.topicsToImprove && feedback.topicsToImprove.length > 0 ? (
                  feedback.topicsToImprove.map((topic, i) => (
                    <span 
                      key={i} 
                      className="badge badge-primary badge-outline text-xs py-2 px-3 font-semibold rounded-lg bg-primary/5 border-primary/30 text-primary"
                    >
                      {topic}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-base-content/50 italic">No topics marked for review.</span>
                )}
              </div>
            </div>

            {/* Recommended Resources */}
            <div className="mb-6">
              <h4 className="font-bold text-xs text-base-content/60 uppercase tracking-wider mb-2.5">
                Recommended Resources
              </h4>
              <ul className="space-y-2">
                {feedback.learningResources && feedback.learningResources.length > 0 ? (
                  feedback.learningResources.map((res, i) => (
                    <li 
                      key={i} 
                      className="text-xs md:text-sm font-medium text-base-content flex items-start gap-2 bg-base-200/50 hover:bg-base-200 p-3 rounded-xl border border-base-300/60 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-snug">{res}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-base-content/50 italic">None recommended.</li>
                )}
              </ul>
            </div>

            {/* Next Step */}
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mt-auto">
              <h4 className="font-bold text-xs text-primary uppercase tracking-wider mb-1">
                Suggested Next Step
              </h4>
              <p className="text-sm font-semibold text-base-content leading-relaxed">
                {feedback.suggestedNext || "Continue practicing more interview topics."}
              </p>
            </div>
          </section>

          {/* Quick Actions */}
          <div className="flex flex-col gap-3">
            <Link to="/interviews/new" className="btn btn-primary w-full">Start Another Interview</Link>
            <Link to="/interviews" className="btn btn-outline w-full">Back to Dashboard</Link>
          </div>

        </div>
      </div>

      {/* MCQ Question Review Breakdown */}
      {interview.questionFormat === "MCQ" && Array.isArray(interview.mcqQuestions) && interview.mcqQuestions.length > 0 && (
        <div className="mt-12 bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-primary" /> MCQ Detailed Question Review
          </h2>
          <div className="flex flex-col gap-4">
            {interview.mcqQuestions.filter((q) => q.userAnswer).map((q, index) => {
              const isSkipped = q.userAnswer === "SKIPPED";
              const isCorrect = q.isCorrect;

              let cardBg = isCorrect ? 'bg-success/5 border-success/30' : isSkipped ? 'bg-warning/5 border-warning/30' : 'bg-error/5 border-error/30';
              let badgeStyle = isCorrect ? 'badge-success text-white' : isSkipped ? 'badge-warning text-white' : 'badge-error text-white';
              let badgeLabel = isCorrect ? 'Correct' : isSkipped ? 'Skipped' : 'Incorrect';

              return (
                <div key={index} className={`p-4 rounded-xl border ${cardBg}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm text-base-content whitespace-pre-wrap font-mono">Question {index + 1}: {q.question}</span>
                    <span className={`badge ${badgeStyle} text-xs shrink-0 ml-2 font-semibold`}>
                      {badgeLabel}
                    </span>
                  </div>
                  <div className="text-xs space-y-1 text-base-content/80 mt-2">
                    <p><span className="font-semibold">Your Action:</span> {isSkipped ? "Skipped Question" : `Option ${q.userAnswer}`}</p>
                    {!isCorrect && <p className="text-error font-semibold"><span className="font-semibold">Correct Answer:</span> Option {q.correctOption}</p>}
                    <p className="mt-2 text-xs italic bg-base-200/50 p-2 rounded text-base-content/70 whitespace-pre-wrap">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Transcript Review (For Conversational Mode) */}
      {interview.questionFormat !== "MCQ" && Array.isArray(interview.conversation) && interview.conversation.length > 0 && (
        <div className="mt-12 bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200">
          <h2 className="text-2xl font-bold mb-6">Conversation Transcript</h2>
          <div className="flex flex-col gap-4">
            {interview.conversation.map((msg, index) => (
              <div key={index} className={`p-4 rounded-xl ${msg.role === 'user' ? 'bg-primary/10 border border-primary/20 ml-8' : 'bg-base-200 mr-8'}`}>
                <div className="font-bold text-xs uppercase tracking-wider mb-2 opacity-50">
                  {msg.role === 'user' ? 'You' : 'Interviewer'}
                </div>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default InterviewSummaryPage;
