import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getResumeById, downloadResume } from "../api/resume";
import { Loader, ChevronLeft, CheckCircle2, AlertCircle, TrendingUp, Briefcase, GraduationCap, FileCode, Download, Settings, Eye } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const ResumeReportPage = () => {
  const { id } = useParams();

  const { data: report, isLoading, isError } = useQuery({
    queryKey: ["resumeAnalysis", id],
    queryFn: () => getResumeById(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="alert alert-error">Failed to load resume analysis.</div>
        <Link to="/resume" className="btn btn-primary mt-4">Back to Dashboard</Link>
      </div>
    );
  }

  const { atsScore, analysis } = report;

  const scoreColor = atsScore >= 80 ? "text-success" : atsScore >= 60 ? "text-warning" : "text-error";
  
  // Custom circular progress using DaisyUI radial-progress
  const radialStyle = {
    "--value": atsScore, 
    "--size": "8rem", 
    "--thickness": "0.75rem"
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const { url, filename } = await downloadResume();
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
      toast.error("Failed to securely download resume.");
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 print:hidden">
        <Link to="/resume" className="btn btn-ghost flex items-center gap-2">
          <ChevronLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        <div className="flex gap-2">
          {report.resumeUrl && (
            <button 
              onClick={handleDownload}
              className="btn btn-primary flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Original
            </button>
          )}
          <button onClick={handlePrint} className="btn btn-primary btn-outline flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </div>
      </div>

      <div className="bg-base-100 rounded-3xl shadow-xl border border-base-200 overflow-hidden mb-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-base-200 to-base-300 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          
          <div className="flex flex-col items-center">
            <div 
              className={`radial-progress font-bold text-3xl ${scoreColor} bg-base-100 shadow-inner`} 
              style={radialStyle}
            >
              {atsScore}%
            </div>
            <span className="mt-4 font-bold text-gray-700 tracking-wider">ATS MATCH</span>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-3">{report.filename}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 italic mb-4">"{analysis.overallVerdict}"</p>
            <div className="p-4 bg-base-100 rounded-xl shadow-sm text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {analysis.summary}
            </div>
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="p-8 md:p-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Strengths */}
            <div className="bg-success/5 border border-success/20 rounded-2xl p-6">
              <h3 className="font-bold text-success flex items-center gap-2 mb-4 text-xl">
                <CheckCircle2 className="w-6 h-6" /> Key Strengths
              </h3>
              <ul className="space-y-3">
                {analysis.strengths?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-success mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses & Missing Skills */}
            <div className="flex flex-col gap-8">
              <div className="bg-error/5 border border-error/20 rounded-2xl p-6">
                <h3 className="font-bold text-error flex items-center gap-2 mb-4 text-xl">
                  <AlertCircle className="w-6 h-6" /> Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {analysis.weaknesses?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-error mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {analysis.missingSkills?.length > 0 && (
                <div className="bg-warning/10 border border-warning/20 rounded-2xl p-6">
                  <h3 className="font-bold text-warning-content flex items-center gap-2 mb-3 text-lg">
                    <TrendingUp className="w-5 h-5 text-warning" /> Recommended Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingSkills.map((skill, i) => (
                      <span key={i} className="badge badge-warning badge-outline">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="divider mb-8">Detailed Section Analysis</div>

          {/* Detailed Accordions */}
          <div className="join join-vertical w-full shadow-sm">
            
            <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
              <input type="radio" name="my-accordion-4" defaultChecked /> 
              <div className="collapse-title text-xl font-medium flex items-center gap-3">
                <FileCode className="text-primary w-6 h-6" /> Project Feedback
              </div>
              <div className="collapse-content"> 
                <p className="text-gray-600 dark:text-gray-400 p-2 whitespace-pre-wrap">{analysis.projectFeedback}</p>
              </div>
            </div>
            
            <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
              <input type="radio" name="my-accordion-4" /> 
              <div className="collapse-title text-xl font-medium flex items-center gap-3">
                <Briefcase className="text-primary w-6 h-6" /> Experience Feedback
              </div>
              <div className="collapse-content"> 
                <p className="text-gray-600 dark:text-gray-400 p-2 whitespace-pre-wrap">{analysis.experienceFeedback}</p>
              </div>
            </div>
            
            <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
              <input type="radio" name="my-accordion-4" /> 
              <div className="collapse-title text-xl font-medium flex items-center gap-3">
                <GraduationCap className="text-primary w-6 h-6" /> Education Feedback
              </div>
              <div className="collapse-content"> 
                <p className="text-gray-600 dark:text-gray-400 p-2 whitespace-pre-wrap">{analysis.educationFeedback}</p>
              </div>
            </div>

          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Settings className="text-primary" /> Actionable Formatting Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.formattingSuggestions?.map((suggestion, i) => (
                <div key={i} className="p-4 bg-base-200 rounded-xl border border-base-300 text-sm">
                  {suggestion}
                </div>
              ))}
              {analysis.grammar?.map((g, i) => (
                <div key={`g-${i}`} className="p-4 bg-base-200 rounded-xl border border-base-300 text-sm">
                  <span className="font-bold text-error mr-2">Grammar:</span>{g}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
};

export default ResumeReportPage;
