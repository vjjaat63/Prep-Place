import { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

import { problemsApi } from "../api/problems";
import { useUser } from "../context/AuthContext";
import { ChevronRightIcon, Code2Icon, Loader2Icon, PlusIcon, Edit3Icon, Trash2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import AdminProblemModal from "../components/AdminProblemModal";
import toast from "react-hot-toast";

function ProblemsPage() {
  const { user } = useUser();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admin Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [problemToEdit, setProblemToEdit] = useState(null);

  const fetchProblems = async (forceRefresh = false) => {
    setLoading(true);
    const data = await problemsApi.getAllProblems(forceRefresh);
    if (data && Array.isArray(data)) {
      const normalized = data.map((p) => ({ ...p, id: p.problemId || p.id || p._id }));
      setProblems(normalized);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleOpenAddModal = () => {
    setProblemToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = async (e, problem) => {
    e.preventDefault();
    e.stopPropagation();
    toast.loading("Loading problem details...", { id: "edit-load" });

    // Fetch full problem details (including test cases, starter code, description notes)
    const fullProblem = await problemsApi.getProblemById(problem.id || problem.problemId);
    toast.dismiss("edit-load");

    setProblemToEdit(fullProblem || problem);
    setIsModalOpen(true);
  };

  const handleDeleteProblem = async (e, problem) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm(`Are you sure you want to delete problem '${problem.title}'? This action cannot be undone.`)) {
      return;
    }

    try {
      await problemsApi.deleteProblem(problem.id || problem.problemId);
      toast.success(`Problem '${problem.title}' deleted successfully.`);
      fetchProblems(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete problem.");
    }
  };

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
            <p className="text-base-content/70">
              Sharpen your coding skills with these curated problems
            </p>
          </div>

          {user?.role === "admin" && (
            <button
              onClick={handleOpenAddModal}
              className="btn btn-primary gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              <PlusIcon className="size-5" />
              <span>Add Problem</span>
            </button>
          )}
        </div>

        {/* LOADING SPINNER */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2Icon className="size-10 animate-spin text-primary" />
          </div>
        )}

        {/* PROBLEMS LIST */}
        {!loading && (
          <div className="space-y-4">
            {problems.length === 0 ? (
              <div className="card bg-base-100 p-8 text-center">
                <p className="text-base-content/60">No coding problems available yet.</p>
              </div>
            ) : (
              problems.map((problem) => (
                <Link
                  key={problem.id}
                  to={`/problem/${problem.id}`}
                  className="card bg-base-100 hover:scale-[1.01] transition-transform shadow-sm hover:shadow-md"
                >
                  <div className="card-body">
                    <div className="flex items-center justify-between gap-4">
                      {/* LEFT SIDE */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Code2Icon className="size-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-xl font-bold">{problem.title}</h2>
                              <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                                {problem.difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-base-content/60"> {problem.category}</p>
                          </div>
                        </div>
                        <p className="text-base-content/80 mb-3 line-clamp-2">
                          {typeof problem.description === "object"
                            ? problem.description?.text
                            : problem.description}
                        </p>
                      </div>

                      {/* RIGHT SIDE & ADMIN ACTIONS */}
                      <div className="flex items-center gap-3">
                        {user?.role === "admin" && (
                          <div className="flex items-center gap-1 mr-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={(e) => handleOpenEditModal(e, problem)}
                              className="btn btn-ghost btn-sm text-primary gap-1"
                              title="Edit Problem"
                            >
                              <Edit3Icon className="size-4" />
                              <span className="hidden md:inline">Edit</span>
                            </button>
                            <button
                              onClick={(e) => handleDeleteProblem(e, problem)}
                              className="btn btn-ghost btn-sm text-error gap-1"
                              title="Delete Problem"
                            >
                              <Trash2Icon className="size-4" />
                              <span className="hidden md:inline">Delete</span>
                            </button>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-primary font-medium">
                          <span>Solve</span>
                          <ChevronRightIcon className="size-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {/* STATS FOOTER */}
        <div className="mt-12 card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value text-primary">{problems.length}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Easy</div>
                <div className="stat-value text-success">{easyProblemsCount}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Medium</div>
                <div className="stat-value text-warning">{mediumProblemsCount}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Hard</div>
                <div className="stat-value text-error">{hardProblemsCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ADMIN ADD/EDIT PROBLEM MODAL */}
      {isModalOpen && (
        <AdminProblemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          problemToEdit={problemToEdit}
          onSuccess={() => fetchProblems(true)}
        />
      )}
    </div>
  );
}

export default ProblemsPage;
