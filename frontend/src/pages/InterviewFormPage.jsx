import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createInterview } from "../api/interview";
import { Brain, ArrowRight, Loader } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const CATEGORIES = [
  "Data Structures & Algorithms",
  "Object Oriented Programming",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "System Design",
  "HR Interview",
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const DURATIONS = [10, 15, 30, 45]; // in minutes

const InterviewFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: CATEGORIES[0],
    difficulty: "Medium",
    duration: 30,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    startInterview(formData);
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

          {/* Category */}
          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text font-semibold text-lg">Interview Topic</span>
            </label>
            <select
              className="select select-bordered w-full text-base"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
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
      </div>
    </div>
  );
};

export default InterviewFormPage;
