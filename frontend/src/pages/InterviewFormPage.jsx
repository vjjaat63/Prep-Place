import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createInterview, getInterviewTopics, addInterviewTopic, deleteInterviewTopic } from "../api/interview";
import { useUser } from "../context/AuthContext";
import { Brain, ArrowRight, Loader, Plus, Trash2, ShieldCheck, X } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const DURATIONS = [10, 15, 30, 45]; // in minutes

const DOMAINS = ["Core Subjects", "Programming Languages", "Applied Tech", "HR & Soft Skills", "All Topics"];

const DEFAULT_CATEGORIES = [
  // Core Subjects
  { name: "Data Structures & Algorithms", domain: "Core Subjects" },
  { name: "Object Oriented Programming", domain: "Core Subjects" },
  { name: "Database Management Systems", domain: "Core Subjects" },
  { name: "Operating Systems", domain: "Core Subjects" },
  { name: "Computer Networks", domain: "Core Subjects" },
  { name: "System Design", domain: "Core Subjects" },
  { name: "Software Engineering & Agile", domain: "Core Subjects" },
  { name: "Cyber Security Fundamentals", domain: "Core Subjects" },
  { name: "Theory of Computation & Compilers", domain: "Core Subjects" },
  { name: "Distributed Systems", domain: "Core Subjects" },

  // Programming Languages
  { name: "Java & JVM", domain: "Programming Languages" },
  { name: "Python", domain: "Programming Languages" },
  { name: "C++ & Modern Features", domain: "Programming Languages" },
  { name: "JavaScript & TypeScript", domain: "Programming Languages" },
  { name: "C# & .NET", domain: "Programming Languages" },
  { name: "Go (Golang)", domain: "Programming Languages" },
  { name: "Rust", domain: "Programming Languages" },

  // Applied Tech
  { name: "Machine Learning & AI", domain: "Applied Tech" },
  { name: "Generative AI & LLMs", domain: "Applied Tech" },
  { name: "Cloud Computing & DevOps", domain: "Applied Tech" },
  { name: "Full-Stack Web Development", domain: "Applied Tech" },

  // HR & Soft Skills
  { name: "HR Interview", domain: "HR & Soft Skills" },
  { name: "Behavioral & Leadership", domain: "HR & Soft Skills" },
];

const InterviewFormPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const isAdmin = user?.role === "admin";

  const [selectedDomains, setSelectedDomains] = useState(["Core Subjects"]);
  const [selectedCategories, setSelectedCategories] = useState(["Data Structures & Algorithms"]);
  const [formData, setFormData] = useState({
    difficulty: "Medium",
    duration: 30,
    mode: "Text",
    questionFormat: "Conversational",
  });

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicDesc, setNewTopicDesc] = useState("");
  const [newTopicDomain, setNewTopicDomain] = useState("Core Subjects");

  // Fetch topics dynamically from database
  const { data: topicsData, isLoading: isLoadingTopics } = useQuery({
    queryKey: ["interviewTopics"],
    queryFn: getInterviewTopics,
  });

  const allTopicsList = Array.isArray(topicsData) && topicsData.length > 0
    ? topicsData
    : DEFAULT_CATEGORIES;

  // Filter topics based on selected Domains
  const filteredTopics = allTopicsList.filter((t) => {
    if (selectedDomains.includes("All Topics")) return true;
    return selectedDomains.includes(t.domain || "Core Subjects");
  });

  const categories = filteredTopics.map((t) => typeof t === "string" ? t : t.name);

  // Toggle domain in selectedDomains array
  const handleToggleDomain = (domain) => {
    if (domain === "All Topics") {
      setSelectedDomains(["All Topics"]);
      return;
    }

    setSelectedDomains((prev) => {
      let next = prev.filter((d) => d !== "All Topics");
      if (next.includes(domain)) {
        next = next.filter((d) => d !== domain);
      } else {
        next = [...next, domain];
      }
      return next.length === 0 ? ["Core Subjects"] : next;
    });
  };

  // Toggle category in selectedCategories array
  const handleToggleCategory = (categoryName) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        const next = prev.filter((c) => c !== categoryName);
        return next.length === 0 ? [categoryName] : next;
      } else {
        return [...prev, categoryName];
      }
    });
  };

  const handleSelectAllFiltered = () => {
    setSelectedCategories(categories);
  };

  const handleClearSelected = () => {
    if (categories.length > 0) {
      setSelectedCategories([categories[0]]);
    }
  };

  // Start interview mutation
  const { mutate: startInterview, isPending } = useMutation({
    mutationFn: createInterview,
    onSuccess: (data) => {
      toast.success("Interview session created!");
      navigate(`/interviews/session/${data._id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to start interview");
    },
  });

  // Admin add topic mutation
  const { mutate: createTopic, isPending: isCreatingTopic } = useMutation({
    mutationFn: addInterviewTopic,
    onSuccess: (newTopic) => {
      toast.success(`Topic "${newTopic.name}" added successfully!`);
      setNewTopicName("");
      setNewTopicDesc("");
      setShowAdminModal(false);
      setSelectedCategories((prev) => [...prev, newTopic.name]);
      queryClient.invalidateQueries(["interviewTopics"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add topic");
    },
  });

  // Admin delete topic mutation
  const { mutate: removeTopic } = useMutation({
    mutationFn: deleteInterviewTopic,
    onSuccess: () => {
      toast.success("Topic deleted successfully!");
      queryClient.invalidateQueries(["interviewTopics"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete topic");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      return toast.error("Please select at least one interview topic.");
    }
    startInterview({
      ...formData,
      categories: selectedCategories,
      category: selectedCategories.join(", "),
    });
  };

  const handleAddTopicSubmit = (e) => {
    e.preventDefault();
    if (!newTopicName.trim()) {
      return toast.error("Please enter a topic name.");
    }
    createTopic({ name: newTopicName, description: newTopicDesc, domain: newTopicDomain });
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <Brain className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Set Up Your Mock Interview</h1>
          <p className="text-gray-500">Select multiple domains, mix & match topics, choose your interview format and settings.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-base-100 p-8 rounded-2xl shadow-xl border border-base-200">

          {/* 1. MULTI-DOMAIN SELECTION */}
          <div className="form-control w-full mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="label-text font-semibold text-lg">Select Domains (Multi-Select)</label>
              <span className="text-xs text-gray-400">Click to toggle domains</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {DOMAINS.map((domain) => {
                const isActive = selectedDomains.includes(domain);
                return (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => handleToggleDomain(domain)}
                    className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {isActive ? `✓ ${domain}` : domain}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. MULTI-TOPIC SELECTION */}
          <div className="form-control w-full mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <label className="label-text font-semibold text-lg">Interview Topics</label>
                <span className="badge badge-primary badge-sm font-semibold">
                  {selectedCategories.length} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAllFiltered}
                  className="btn btn-xs btn-ghost text-primary"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={handleClearSelected}
                  className="btn btn-xs btn-ghost text-gray-400"
                >
                  Reset
                </button>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => setShowAdminModal(true)}
                    className="btn btn-xs btn-outline btn-primary gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Topic
                  </button>
                )}
              </div>
            </div>

            {isLoadingTopics ? (
              <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg text-sm">
                <Loader className="w-4 h-4 animate-spin text-primary" /> Loading interview topics...
              </div>
            ) : (
              <div className="bg-base-200/50 p-4 rounded-xl border border-base-300 max-h-56 overflow-y-auto flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleToggleCategory(cat)}
                      className={`btn btn-sm text-xs h-auto py-2 px-3 text-left justify-start ${
                        isSelected
                          ? "btn-primary font-bold shadow-sm"
                          : "btn-ghost bg-base-100 hover:bg-base-200 border-base-300 text-base-content"
                      }`}
                    >
                      <span>{isSelected ? "✓ " : "+ "}{cat}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. QUESTION FORMAT: Conversational vs MCQs */}
          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text font-semibold text-lg">Interview Question Format</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, questionFormat: "Conversational" })}
                className={`btn flex flex-col items-center justify-center py-6 h-auto ${formData.questionFormat === "Conversational" ? 'btn-primary' : 'btn-outline'}`}
              >
                <span className="font-bold text-base">Conversational (Q&A)</span>
                <span className="text-xs opacity-80 mt-1">Interactive dialogue with AI</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, questionFormat: "MCQ" })}
                className={`btn flex flex-col items-center justify-center py-6 h-auto ${formData.questionFormat === "MCQ" ? 'btn-primary' : 'btn-outline'}`}
              >
                <span className="font-bold text-base flex items-center gap-1.5">
                  MCQs (Multiple Choice)
                  <span className="badge badge-xs badge-secondary">New</span>
                </span>
                <span className="text-xs opacity-80 mt-1">4-option structured quiz</span>
              </button>
            </div>
          </div>

          {/* Difficulty */}
          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text font-semibold text-lg">Difficulty Level</span>
            </label>
            <div className="flex gap-4">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setFormData({ ...formData, difficulty: diff })}
                  className={`flex-1 btn ${formData.difficulty === diff ? 'btn-primary' : 'btn-outline'}`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text font-semibold text-lg">Duration</span>
            </label>
            <div className="flex gap-4">
              {DURATIONS.map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setFormData({ ...formData, duration: dur })}
                  className={`flex-1 btn ${formData.duration === dur ? 'btn-primary' : 'btn-outline'}`}
                >
                  {dur} min
                </button>
              ))}
            </div>
          </div>

          {/* Mode */}
          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text font-semibold text-lg">Input Mode</span>
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, mode: "Text" })}
                className={`flex-1 btn ${formData.mode === "Text" ? 'btn-primary' : 'btn-outline'}`}
              >
                Text
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, mode: "Audio" })}
                className={`flex-1 btn ${formData.mode === "Audio" ? 'btn-primary' : 'btn-outline'} gap-2`}
              >
                Audio
                <span className="badge badge-sm badge-secondary">Beta</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-lg h-14"
            disabled={isPending}
          >
            {isPending ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Start Interview
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>

        </form>

        {/* Admin Manage Topics Modal */}
        {showAdminModal && (
          <div className="modal modal-open">
            <div className="modal-box max-w-lg">
              <div className="flex justify-between items-center border-b border-base-200 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-lg">Admin: Add Mock Interview Topic</h3>
                </div>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Add Topic Form */}
              <form onSubmit={handleAddTopicSubmit} className="space-y-4 mb-6">
                <div>
                  <label className="label font-medium text-sm">Topic Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Next.js & Server Components"
                    className="input input-bordered w-full"
                    value={newTopicName}
                    onChange={(e) => setNewTopicName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label font-medium text-sm">Topic Domain *</label>
                  <select
                    className="select select-bordered w-full"
                    value={newTopicDomain}
                    onChange={(e) => setNewTopicDomain(e.target.value)}
                  >
                    <option value="Core Subjects">Core Subjects</option>
                    <option value="Programming Languages">Programming Languages</option>
                    <option value="Applied Tech">Applied Tech</option>
                    <option value="HR & Soft Skills">HR & Soft Skills</option>
                  </select>
                </div>
                <div>
                  <label className="label font-medium text-sm">Description (Optional)</label>
                  <input
                    type="text"
                    placeholder="Brief summary of what this topic covers"
                    className="input input-bordered w-full"
                    value={newTopicDesc}
                    onChange={(e) => setNewTopicDesc(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isCreatingTopic}
                  className="btn btn-primary w-full gap-2"
                >
                  {isCreatingTopic ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Add Topic
                </button>
              </form>

              {/* List existing custom topics for deletion */}
              {Array.isArray(topicsData) && topicsData.some((t) => !t.isDefault) && (
                <div>
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-base-content/60 mb-2">Custom Added Topics</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {topicsData.filter((t) => !t.isDefault).map((topic) => (
                      <div key={topic._id} className="flex justify-between items-center p-2 bg-base-200 rounded-lg text-sm">
                        <span>{topic.name}</span>
                        <button
                          type="button"
                          onClick={() => removeTopic(topic._id)}
                          className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewFormPage;
