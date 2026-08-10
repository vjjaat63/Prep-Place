import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createInterview, getInterviewTopics, addInterviewTopic, deleteInterviewTopic } from "../api/interview";
import { useUser } from "../context/AuthContext";
import { Brain, ArrowRight, Loader, Plus, Trash2, ShieldCheck, X } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const DURATIONS = [10, 15, 30, 45]; // in minutes

const DEFAULT_CATEGORIES = [
  "Data Structures & Algorithms",
  "Object Oriented Programming",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "System Design",
  "Machine Learning",
  "HR Interview",
];

const InterviewFormPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const isAdmin = user?.role === "admin";

  const [formData, setFormData] = useState({
    category: DEFAULT_CATEGORIES[0],
    difficulty: "Medium",
    duration: 30,
    mode: "Text",
  });

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicDesc, setNewTopicDesc] = useState("");

  // Fetch topics dynamically from database
  const { data: topicsData, isLoading: isLoadingTopics } = useQuery({
    queryKey: ["interviewTopics"],
    queryFn: getInterviewTopics,
  });

  const categories = Array.isArray(topicsData) && topicsData.length > 0
    ? topicsData.map((t) => t.name)
    : DEFAULT_CATEGORIES;

  // Set initial category once topics are loaded
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(formData.category)) {
      setFormData((prev) => ({ ...prev, category: categories[0] }));
    }
  }, [topicsData]);

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
      setFormData((prev) => ({ ...prev, category: newTopic.name }));
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
    if (!formData.category) {
      return toast.error("Please select an interview topic.");
    }
    startInterview(formData);
  };

  const handleAddTopicSubmit = (e) => {
    e.preventDefault();
    if (!newTopicName.trim()) {
      return toast.error("Please enter a topic name.");
    }
    createTopic({ name: newTopicName, description: newTopicDesc });
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
          <p className="text-gray-500">Customize your session parameters before we begin.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-base-100 p-8 rounded-2xl shadow-xl border border-base-200">

          {/* Category Selection + Admin Add Option */}
          <div className="form-control w-full mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="label-text font-semibold text-lg">Interview Topic</label>
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

            {isLoadingTopics ? (
              <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg text-sm">
                <Loader className="w-4 h-4 animate-spin text-primary" /> Loading interview topics...
              </div>
            ) : (
              <select
                className="select select-bordered w-full text-base"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
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
              <span className="label-text font-semibold text-lg">Interview Mode</span>
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
