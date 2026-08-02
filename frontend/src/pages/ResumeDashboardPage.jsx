import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { getResume, uploadResume, deleteResumeAnalysis, downloadResume } from "../api/resume";
import { FileText, UploadCloud, Loader, Trash2, Calendar, ChevronRight, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Navbar from "../components/Navbar";

const ResumeDashboardPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [showJD, setShowJD] = useState(false);

  const { data: resume, isLoading, isError } = useQuery({
    queryKey: ["resume"],
    queryFn: getResume,
    retry: false
  });

  const { mutate: handleUpload, isPending: isUploading } = useMutation({
    mutationFn: uploadResume,
    onSuccess: (data) => {
      toast.success("Resume uploaded and analyzed!");
      setFile(null);
      queryClient.invalidateQueries(["resume"]);
      navigate(`/resume/report/${data._id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to analyze resume.");
    }
  });

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: deleteResumeAnalysis,
    onSuccess: () => {
      toast.success("Resume deleted.");
      queryClient.invalidateQueries(["resume"]);
    },
    onError: (error) => {
      toast.error("Failed to delete resume.");
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
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    if (jobDesc.trim()) {
      formData.append("jobDescription", jobDesc.trim());
    }
    handleUpload(formData);
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
      <div className="text-center mb-10">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
          <FileText className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Resume Analyzer</h1>
        <p className="text-lg text-gray-500">Get instant AI feedback on your resume to boost your ATS score.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200 sticky top-24">
            <h2 className="text-xl font-bold mb-4">{resume ? "Replace Resume" : "Upload Resume"}</h2>
            <form onSubmit={onSubmit}>
              <div className="border-2 border-dashed border-base-300 rounded-xl p-8 text-center hover:border-primary transition-colors relative">
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  onChange={onFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {file ? file.name : "Drag & drop or click"}
                </p>
                <p className="text-xs text-gray-500">PDF or DOCX up to 5MB</p>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full mt-6"
                disabled={!file || isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  resume ? "Replace & Analyze" : "Analyze Resume"
                )}
              </button>

              {/* Optional Job Description */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowJD(v => !v)}
                  className="text-sm text-primary hover:underline flex items-center gap-1 w-full justify-center"
                >
                  {showJD ? "▲ Hide" : "▼ Add"} Job Description <span className="text-gray-400">(optional, improves accuracy)</span>
                </button>
                {showJD && (
                  <textarea
                    className="textarea textarea-bordered w-full mt-3 text-sm h-36 resize-none"
                    placeholder="Paste the job description here to get a more accurate keyword match score..."
                    value={jobDesc}
                    onChange={e => setJobDesc(e.target.value)}
                    disabled={isUploading}
                  />
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Current Resume Section */}
        <div className="lg:col-span-2">
          <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200 h-full">
            <h2 className="text-xl font-bold mb-6">Your Current Resume</h2>
            
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <Loader className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}

            {!isLoading && (isError || !resume) && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No resume uploaded yet.</p>
              </div>
            )}

            {!isLoading && resume && (
              <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors bg-base-50">
                    
                    <div className="flex-1 min-w-0 mb-4 sm:mb-0">
                      <h3 className="font-bold text-gray-800 dark:text-gray-200 truncate pr-4 text-lg">
                        {resume.originalName}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(resume.createdAt), "MMM d, yyyy")}
                        </span>
                        <span className={`font-semibold ${
                          resume.atsScore >= 80 ? "text-success" : 
                          resume.atsScore >= 60 ? "text-warning" : "text-error"
                        }`}>
                          ATS Score: {resume.atsScore}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {resume.resumeUrl && (
                        <button 
                          onClick={handleDownload}
                          className="btn btn-sm btn-ghost" 
                          title="Download Resume"
                        >
                          <Eye className="w-4 h-4" /> Download
                        </button>
                      )}
                      <Link to={`/resume/report/${resume._id}`} className="btn btn-sm btn-outline flex-1 sm:flex-none">
                        View Report <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(resume._id)}
                        disabled={isDeleting}
                        className="btn btn-sm btn-ghost text-error"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
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
