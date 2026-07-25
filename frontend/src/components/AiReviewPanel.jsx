import {
  SparklesIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2Icon,
  CheckCircle2Icon,
  AlertTriangleIcon,
  ZapIcon,
  DatabaseIcon,
  ListTodoIcon,
  InfoIcon,
  TrophyIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

function AiReviewPanel({ review, isLoading }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate the score when it changes
  useEffect(() => {
    if (review && review.score !== undefined) {
      const target = review.score;
      let current = 0;
      const interval = setInterval(() => {
        current += 0.5;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setAnimatedScore(current);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [review]);

  if (!review && !isLoading) return null;

  // Fallback for raw text / markdown
  if (review && review.rawText) {
    return (
      <div className="bg-base-200 border-t border-base-300 h-full flex flex-col">
        <div
          className="flex items-center justify-between p-3 bg-base-300 border-b border-base-200 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2 font-medium text-secondary">
            <SparklesIcon className="size-4" />
            AI Code Review
          </div>
          {isExpanded ? <ChevronDownIcon className="size-4" /> : <ChevronUpIcon className="size-4" />}
        </div>
        {isExpanded && (
          <div className="p-4 overflow-y-auto flex-1 text-sm bg-base-100">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>{review.rawText}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Get color based on rating
  const getRatingColor = (rating) => {
    if (rating === "Excellent") return "text-success border-success bg-success/10";
    if (rating === "Good") return "text-warning border-warning bg-warning/10";
    return "text-error border-error bg-error/10";
  };

  return (
    <div className="bg-base-100 border-t border-base-300 h-full flex flex-col">
      <div
        className="flex items-center justify-between p-3 bg-base-200 border-b border-base-300 cursor-pointer transition-colors hover:bg-base-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 font-medium text-primary">
          <SparklesIcon className="size-5" />
          AI Review Dashboard
        </div>
        {isExpanded ? <ChevronDownIcon className="size-5" /> : <ChevronUpIcon className="size-5" />}
      </div>

      {isExpanded && (
        <div className="p-6 overflow-y-auto flex-1 bg-base-100 animate-in fade-in duration-300">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-base-content/50">
              <Loader2Icon className="size-10 animate-spin mb-4 text-primary" />
              <p className="text-lg animate-pulse">Gemini is analyzing your code...</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Score Header */}
              <div className="flex flex-col items-center justify-center p-6 bg-base-200 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <TrophyIcon className="size-8 text-primary" />
                  <span className="text-5xl font-extrabold tracking-tight">
                    {animatedScore.toFixed(1)} <span className="text-2xl text-base-content/50">/ 10</span>
                  </span>
                </div>
                <div className={`px-4 py-1.5 rounded-full border text-sm font-semibold tracking-wide ${getRatingColor(review.rating)}`}>
                  {review.rating}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Overall Feedback */}
                <div className="col-span-1 md:col-span-2 bg-success/10 border border-success/20 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-success font-semibold mb-3">
                    <CheckCircle2Icon className="size-5" />
                    Overall Feedback
                  </div>
                  <p className="text-base-content leading-relaxed">{review.overallFeedback}</p>
                </div>

                {/* Complexity */}
                <div className="bg-base-200 border border-base-300 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="text-base-content/70 font-semibold mb-4">Complexity Analysis</div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-300">
                      <div className="flex items-center gap-2 text-warning">
                        <ZapIcon className="size-4" />
                        <span className="font-medium text-base-content">Time</span>
                      </div>
                      <span className="font-mono text-sm px-2 py-1 bg-warning/20 text-warning rounded-md font-semibold">
                        {review.timeComplexity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-300">
                      <div className="flex items-center gap-2 text-info">
                        <DatabaseIcon className="size-4" />
                        <span className="font-medium text-base-content">Space</span>
                      </div>
                      <span className="font-mono text-sm px-2 py-1 bg-info/20 text-info rounded-md font-semibold">
                        {review.spaceComplexity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edge Cases */}
                <div className="bg-base-200 border border-base-300 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-base-content/70 font-semibold mb-4">
                    <ListTodoIcon className="size-5" />
                    Edge Cases
                  </div>
                  <ul className="space-y-3">
                    {review.edgeCases?.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-base-100 rounded-lg border border-base-300 text-sm">
                        <div className="mt-0.5 size-4 rounded border-2 border-base-content/30 flex-shrink-0" />
                        <span className="text-base-content/90 leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strengths */}
                <div className="bg-base-200 border border-base-300 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="text-base-content/70 font-semibold mb-4">Strengths</div>
                  <ul className="space-y-3">
                    {review.strengths?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2Icon className="size-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-base-content/90 leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions */}
                <div className="bg-warning/5 border border-warning/20 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="text-warning font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangleIcon className="size-5" />
                    Suggestions
                  </div>
                  <ul className="space-y-3">
                    {review.suggestions?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-warning text-lg leading-none">💡</span>
                        <span className="text-base-content/90 leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optimization */}
                <div className="col-span-1 md:col-span-2 bg-info/5 border border-info/20 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-info font-semibold mb-3">
                    <InfoIcon className="size-5" />
                    Optimization
                  </div>
                  <p className="text-base-content leading-relaxed text-sm">
                    {review.optimization === "optimal" || review.optimization?.toLowerCase().includes("already optimal") ? (
                      <span className="flex items-center gap-2"><span className="text-lg">🚀</span> Your solution is already optimal.</span>
                    ) : (
                      review.optimization
                    )}
                  </p>
                </div>

              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AiReviewPanel;
