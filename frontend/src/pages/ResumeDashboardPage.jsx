import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { getResume, uploadResume, deleteResumeAnalysis, downloadResume } from "../api/resume";
import { FileText, UploadCloud, Loader, Trash2, Calendar, ChevronRight, Download, Target, Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Navbar from "../components/Navbar";

const POPULAR_ROLES = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Engineer",
  "DevOps Engineer",
  "Data Scientist",
  "Mobile Developer",
  "Cloud Architect",
];

const ResumeDashboardPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("Full Stack Developer");
  const [jobDesc, setJobDesc] = useState("");
  const [showJD, setShowJD] = useState(false);

  const { data: resumes, isLoading, isError } = useQuery({
    queryKey: ["resumes"],
    queryFn: getResume,
    retry: false
  });

  const resumeList = Array.isArray(resumes) ? resumes : (resumes ? [resumes] : []);

  const { mutate: handleUpload, isPending: isUploading } = useMutation({
    mutationFn: uploadResume,
    onSuccess: (data) => {
      toast.success("Resume analyzed for target role!");
      setFile(null);
      queryClient.invalidateQueries(["resumes"]);
      navigate(`/resume/report/${data._id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to analyze resume.");
    }
  });

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: deleteResumeAnalysis,
    onSuccess: () => {
      toast.success("Analysis deleted.");
      queryClient.invalidateQueries(["resumes"]);
    },
    onError: () => {
      toast.error("Failed to delete analysis.");
    }
  });

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error("Please upload a valid PDF or DOCX file.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a resume file.");
      return;
    }
    if (!targetRole.trim()) {
      toast.error("Please specify a target job role.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("targetRole", targetRole.trim());
    if (jobDesc.trim()) {
      formData.append("jobDescription", jobDesc.trim());
    }
    handleUpload(formData);
  };

  const handleDownloadFile = async (id) => {
    try {
      const { url, filename } = await downloadResume(id);
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
      toast.error("Failed to download resume file.");
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <FileText className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Role-Tailored Resume Analyzer</h1>
          <p className="text-lg text-gray-500">Get role-focused ATS scoring, recommended skills, and deep feedback for your target job position.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upload & Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200 sticky top-24">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Analyze Resume
              </h2>
              
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Target Role Input */}
                <div>
                  <label className="label font-semibold text-sm text-gray-700 dark:text-gray-300">
                    Target Job Role <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full text-sm font-medium"
                    placeholder="e.g. Full Stack Developer, Data Scientist"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    required
                    disabled={isUploading}
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {POPULAR_ROLES.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setTargetRole(role)}
                        className={`badge badge-sm cursor-pointer transition-colors ${
                          targetRole.toLowerCase() === role.toLowerCase()
                            ? "badge-primary"
                            : "badge-outline hover:badge-primary/20"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Upload Box */}
                <div>
                  <label className="label font-semibold text-sm text-gray-700 dark:text-gray-300">
                    Upload Resume File <span className="text-error">*</span>
                  </label>
                  <div className="border-2 border-dashed border-base-300 rounded-xl p-6 text-center hover:border-primary transition-colors relative bg-base-50">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={onFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isUploading}
                    />
                    <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-1 truncate px-2">
                      {file ? file.name : "Drag & drop or click to browse"}
                    </p>
                    <p className="text-xs text-gray-500">PDF or DOCX (Max 5MB)</p>
                  </div>
                </div>

                {/* Optional Job Description */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowJD((v) => !v)}
                    className="text-xs text-primary hover:underline flex items-center gap-1 w-full justify-center py-1"
                  >
                    {showJD ? "▲ Hide" : "▼ Optional:"} Job Description Match
                  </button>
                  {showJD && (
                    <textarea
                      className="textarea textarea-bordered w-full text-xs h-28 resize-none mt-2"
                      placeholder="Paste specific job description text here for deep keyword alignment..."
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      disabled={isUploading}
                    />
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-full mt-2"
                  disabled={!file || !targetRole.trim() || isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Analyzing for {targetRole}...
                    </>
                  ) : (
                    `Analyze for ${targetRole || "Role"}`
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Past Analyses & Resumes History Section */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200 h-full">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-base-200">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" /> Past Analyses & Resumes
                </h2>
                {resumeList.length > 0 && (
                  <span className="badge badge-primary badge-outline text-xs font-semibold">
                    {resumeList.length} {resumeList.length === 1 ? "Analysis" : "Analyses"} Saved
                  </span>
                )}
              </div>
              
              {isLoading && (
                <div className="flex justify-center items-center py-16">
                  <Loader className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}

              {!isLoading && (isError || resumeList.length === 0) && (
                <div className="text-center py-16 px-4 border-2 border-dashed border-base-200 rounded-2xl">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">No Past Analyses Yet</h3>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Select your target job role on the left and upload your resume to get role-tailored ATS feedback and skill recommendations.
                  </p>
                </div>
              )}

              {!isLoading && resumeList.length > 0 && (
                <div className="space-y-4">
                  {resumeList.map((item) => (
                    <div 
                      key={item._id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border border-base-200 hover:border-primary/40 transition-all bg-base-50 shadow-xs gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="badge badge-primary text-xs font-bold">
                            🎯 {item.targetRole || item.analysis?.targetRole || "Software Engineer"}
                          </span>
                          <span className={`badge text-xs font-bold ${
                            item.atsScore >= 80 ? "badge-success text-white" : 
                            item.atsScore >= 60 ? "badge-warning text-gray-900" : "badge-error text-white"
                          }`}>
                            ATS Score: {item.atsScore}%
                          </span>
                        </div>

                        <h3 className="font-bold text-gray-800 dark:text-gray-200 truncate text-base">
                          {item.originalName}
                        </h3>

                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {format(new Date(item.createdAt), "MMM d, yyyy • h:mm a")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        {item.resumeUrl && (
                          <button 
                            onClick={() => handleDownloadFile(item._id)}
                            className="btn btn-sm btn-ghost btn-square" 
                            title="Download Original Resume"
                          >
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                        <Link 
                          to={`/resume/report/${item._id}`} 
                          className="btn btn-sm btn-primary btn-outline flex-1 sm:flex-none"
                        >
                          View Report <ChevronRight className="w-4 h-4 ml-0.5" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          disabled={isDeleting}
                          className="btn btn-sm btn-ghost text-error btn-square"
                          title="Delete Analysis"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResumeDashboardPage;
