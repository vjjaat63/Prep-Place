import { useState, useEffect } from "react";
import { XIcon, Loader2Icon, PlusIcon, SparklesIcon } from "lucide-react";
import toast from "react-hot-toast";
import { problemsApi } from "../api/problems";

function AdminProblemModal({ isOpen, onClose, problemToEdit, onSuccess }) {
  const isEditing = Boolean(problemToEdit);

  const [formData, setFormData] = useState({
    problemId: "",
    title: "",
    difficulty: "Easy",
    category: "Array • Hash Table",
    descriptionText: "",
    descriptionNotes: "",
    examples: [{ input: "", output: "", explanation: "" }],
    constraints: [""],
    jsCode: "",
    jsOutput: "",
    pythonCode: "",
    pythonOutput: "",
    javaCode: "",
    javaOutput: "",
    cppCode: "",
    cppOutput: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (problemToEdit) {
      setFormData({
        problemId: problemToEdit.problemId || problemToEdit.id || "",
        title: problemToEdit.title || "",
        difficulty: problemToEdit.difficulty || "Easy",
        category: problemToEdit.category || "Array • Hash Table",
        descriptionText:
          typeof problemToEdit.description === "object"
            ? problemToEdit.description?.text || ""
            : problemToEdit.description || "",
        descriptionNotes: Array.isArray(problemToEdit.description?.notes)
          ? problemToEdit.description.notes.join("\n")
          : "",
        examples:
          problemToEdit.examples && problemToEdit.examples.length > 0
            ? problemToEdit.examples
            : [{ input: "", output: "", explanation: "" }],
        constraints:
          problemToEdit.constraints && problemToEdit.constraints.length > 0
            ? problemToEdit.constraints
            : [""],
        jsCode: problemToEdit.starterCode?.javascript || "",
        jsOutput: problemToEdit.expectedOutput?.javascript || "",
        pythonCode: problemToEdit.starterCode?.python || "",
        pythonOutput: problemToEdit.expectedOutput?.python || "",
        javaCode: problemToEdit.starterCode?.java || "",
        javaOutput: problemToEdit.expectedOutput?.java || "",
        cppCode: problemToEdit.starterCode?.cpp || "",
        cppOutput: problemToEdit.expectedOutput?.cpp || "",
      });
    } else {
      setFormData({
        problemId: "",
        title: "",
        difficulty: "Easy",
        category: "Array • Hash Table",
        descriptionText: "",
        descriptionNotes: "",
        examples: [{ input: "", output: "", explanation: "" }],
        constraints: [""],
        jsCode: `function solution() {\n  // Write solution here\n}`,
        jsOutput: "",
        pythonCode: `def solution():\n    pass`,
        pythonOutput: "",
        javaCode: `class Solution {\n    public static void main(String[] args) {}\n}`,
        javaOutput: "",
        cppCode: `#include <iostream>\nusing namespace std;\nint main() { return 0; }`,
        cppOutput: "",
      });
    }
  }, [problemToEdit, isOpen]);

  if (!isOpen) return null;

  const handleTitleChange = (val) => {
    const slug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setFormData((prev) => ({
      ...prev,
      title: val,
      problemId: isEditing ? prev.problemId : slug,
    }));
  };

  const handleExampleChange = (index, field, value) => {
    const updated = [...formData.examples];
    updated[index][field] = value;
    setFormData({ ...formData, examples: updated });
  };

  const addExample = () => {
    setFormData({
      ...formData,
      examples: [...formData.examples, { input: "", output: "", explanation: "" }],
    });
  };

  const removeExample = (index) => {
    setFormData({
      ...formData,
      examples: formData.examples.filter((_, i) => i !== index),
    });
  };

  const handleConstraintChange = (index, value) => {
    const updated = [...formData.constraints];
    updated[index] = value;
    setFormData({ ...formData, constraints: updated });
  };

  const addConstraint = () => {
    setFormData({
      ...formData,
      constraints: [...formData.constraints, ""],
    });
  };

  const removeConstraint = (index) => {
    setFormData({
      ...formData,
      constraints: formData.constraints.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.problemId || !formData.descriptionText) {
      toast.error("Please fill in all required fields (Title, Problem ID, Description).");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        problemId: formData.problemId,
        title: formData.title,
        difficulty: formData.difficulty,
        category: formData.category,
        description: {
          text: formData.descriptionText,
          notes: formData.descriptionNotes
            ? formData.descriptionNotes.split("\n").filter((n) => n.trim().length > 0)
            : [],
        },
        examples: formData.examples.filter((e) => e.input && e.output),
        constraints: formData.constraints.filter((c) => c.trim().length > 0),
        starterCode: {
          javascript: formData.jsCode,
          python: formData.pythonCode,
          java: formData.javaCode,
          cpp: formData.cppCode,
        },
        expectedOutput: {
          javascript: formData.jsOutput,
          python: formData.pythonOutput,
          java: formData.javaOutput,
          cpp: formData.cppOutput,
        },
      };

      if (isEditing) {
        await problemsApi.updateProblem(formData.problemId, payload);
        toast.success(`Problem '${formData.title}' updated successfully!`);
      } else {
        await problemsApi.createProblem(payload);
        toast.success(`Problem '${formData.title}' created successfully!`);
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save problem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box max-w-5xl max-h-[90vh] overflow-y-auto bg-base-100 border border-base-300 shadow-2xl">
        <div className="flex items-center justify-between border-b border-base-200 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <SparklesIcon className="size-6" />
            </div>
            <div>
              <h3 className="font-bold text-2xl">
                {isEditing ? "Edit Coding Problem" : "Add New Coding Problem"}
              </h3>
              <p className="text-xs text-base-content/60">
                {isEditing ? "Update problem statement & test cases" : "Create a new challenge for candidates"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm">
            <XIcon className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-semibold">Title *</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. Two Sum"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Problem ID / Slug *</label>
              <input
                type="text"
                className="input input-bordered w-full font-mono text-sm"
                placeholder="e.g. two-sum"
                value={formData.problemId}
                onChange={(e) => setFormData({ ...formData, problemId: e.target.value })}
                disabled={isEditing}
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Difficulty *</label>
              <select
                className="select select-bordered w-full"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label font-semibold">Category *</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. Array • Hash Table"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-4">
            <div className="form-control">
              <label className="label font-semibold">Description Statement *</label>
              <textarea
                className="textarea textarea-bordered w-full h-24 font-sans"
                placeholder="Write the core problem description here..."
                value={formData.descriptionText}
                onChange={(e) => setFormData({ ...formData, descriptionText: e.target.value })}
                required
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label font-semibold">Notes / Important Hints (One per line)</label>
              <textarea
                className="textarea textarea-bordered w-full h-20 font-sans"
                placeholder="Enter notes (one note per line)..."
                value={formData.descriptionNotes}
                onChange={(e) => setFormData({ ...formData, descriptionNotes: e.target.value })}
              ></textarea>
            </div>
          </div>

          {/* EXAMPLES SECTION */}
          <div className="space-y-3 border-t border-base-200 pt-4">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-lg">Examples</label>
              <button
                type="button"
                onClick={addExample}
                className="btn btn-sm btn-outline btn-primary gap-1"
              >
                <PlusIcon className="size-4" /> Add Example
              </button>
            </div>

            {formData.examples.map((ex, idx) => (
              <div key={idx} className="p-4 bg-base-200/60 rounded-xl space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="badge badge-primary badge-sm">Example {idx + 1}</span>
                  {formData.examples.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExample(idx)}
                      className="text-error text-xs hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    className="input input-sm input-bordered font-mono"
                    placeholder="Input: e.g. nums = [2,7,11,15], target = 9"
                    value={ex.input}
                    onChange={(e) => handleExampleChange(idx, "input", e.target.value)}
                  />
                  <input
                    type="text"
                    className="input input-sm input-bordered font-mono"
                    placeholder="Output: e.g. [0,1]"
                    value={ex.output}
                    onChange={(e) => handleExampleChange(idx, "output", e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  className="input input-sm input-bordered w-full"
                  placeholder="Explanation (optional)"
                  value={ex.explanation}
                  onChange={(e) => handleExampleChange(idx, "explanation", e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* CONSTRAINTS SECTION */}
          <div className="space-y-3 border-t border-base-200 pt-4">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-lg">Constraints</label>
              <button
                type="button"
                onClick={addConstraint}
                className="btn btn-sm btn-outline btn-primary gap-1"
              >
                <PlusIcon className="size-4" /> Add Constraint
              </button>
            </div>

            {formData.constraints.map((c, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  className="input input-sm input-bordered flex-1 font-mono"
                  placeholder="e.g. 2 ≤ nums.length ≤ 10⁴"
                  value={c}
                  onChange={(e) => handleConstraintChange(idx, e.target.value)}
                />
                {formData.constraints.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeConstraint(idx)}
                    className="btn btn-xs btn-ghost text-error"
                  >
                    <XIcon className="size-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* STARTER CODE SECTION */}
          <div className="space-y-4 border-t border-base-200 pt-4">
            <label className="font-semibold text-lg block">Starter Code & Expected Outputs</label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* JAVASCRIPT */}
              <div className="space-y-2 bg-base-200/40 p-4 rounded-xl border border-base-300">
                <span className="text-sm font-bold text-primary block">JavaScript Starter Code & Expected Output</span>
                <textarea
                  className="textarea textarea-bordered w-full h-28 font-mono text-xs"
                  placeholder="JavaScript starter code..."
                  value={formData.jsCode}
                  onChange={(e) => setFormData({ ...formData, jsCode: e.target.value })}
                ></textarea>
                <textarea
                  className="textarea textarea-bordered w-full h-16 font-mono text-xs"
                  placeholder="JavaScript Expected Output (e.g. true\nfalse\ntrue)"
                  value={formData.jsOutput}
                  onChange={(e) => setFormData({ ...formData, jsOutput: e.target.value })}
                ></textarea>
              </div>

              {/* PYTHON */}
              <div className="space-y-2 bg-base-200/40 p-4 rounded-xl border border-base-300">
                <span className="text-sm font-bold text-secondary block">Python Starter Code & Expected Output</span>
                <textarea
                  className="textarea textarea-bordered w-full h-28 font-mono text-xs"
                  placeholder="Python starter code..."
                  value={formData.pythonCode}
                  onChange={(e) => setFormData({ ...formData, pythonCode: e.target.value })}
                ></textarea>
                <textarea
                  className="textarea textarea-bordered w-full h-16 font-mono text-xs"
                  placeholder="Python Expected Output (e.g. True\nFalse\nTrue)"
                  value={formData.pythonOutput}
                  onChange={(e) => setFormData({ ...formData, pythonOutput: e.target.value })}
                ></textarea>
              </div>

              {/* JAVA */}
              <div className="space-y-2 bg-base-200/40 p-4 rounded-xl border border-base-300">
                <span className="text-sm font-bold text-warning block">Java Starter Code & Expected Output</span>
                <textarea
                  className="textarea textarea-bordered w-full h-28 font-mono text-xs"
                  placeholder="Java starter code..."
                  value={formData.javaCode}
                  onChange={(e) => setFormData({ ...formData, javaCode: e.target.value })}
                ></textarea>
                <textarea
                  className="textarea textarea-bordered w-full h-16 font-mono text-xs"
                  placeholder="Java Expected Output (e.g. true\nfalse\ntrue)"
                  value={formData.javaOutput}
                  onChange={(e) => setFormData({ ...formData, javaOutput: e.target.value })}
                ></textarea>
              </div>

              {/* C++ */}
              <div className="space-y-2 bg-base-200/40 p-4 rounded-xl border border-base-300">
                <span className="text-sm font-bold text-accent block">C++ Starter Code & Expected Output</span>
                <textarea
                  className="textarea textarea-bordered w-full h-28 font-mono text-xs"
                  placeholder="C++ starter code..."
                  value={formData.cppCode}
                  onChange={(e) => setFormData({ ...formData, cppCode: e.target.value })}
                ></textarea>
                <textarea
                  className="textarea textarea-bordered w-full h-16 font-mono text-xs"
                  placeholder="C++ Expected Output (e.g. true\nfalse\ntrue)"
                  value={formData.cppOutput}
                  onChange={(e) => setFormData({ ...formData, cppOutput: e.target.value })}
                ></textarea>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="modal-action border-t border-base-200 pt-4">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary min-w-[140px]" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2Icon className="size-5 animate-spin" />
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Create Problem"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}

export default AdminProblemModal;
