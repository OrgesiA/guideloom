"use client";

import useRequireRole from "../../components/useRequireRole";

export default function QuestionsPage() {
  const role = useRequireRole(["MENTOR", "INTERN"]);
  const viewRole = role || "INTERN";
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{viewRole === "MENTOR" ? "Intern Questions" : "Questions"}</h1>
        <p className="text-slate-700">
          {viewRole === "MENTOR"
            ? "Review AI draft answers, approve/edit, and escalate unresolved questions."
            : "Ask the AI tutor; escalates to mentor if confidence is low."}
        </p>
      </div>
      {viewRole === "INTERN" && (
        <form className="space-y-3 rounded-lg border bg-white p-4 shadow-sm">
          <label className="block text-sm font-medium text-slate-700">Question</label>
          <textarea className="w-full rounded-md border px-3 py-2 text-sm" rows="4" placeholder="Explain pgvector cosine distance vs inner product..." />
          <button type="button" className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white">Submit</button>
        </form>
      )}

      {viewRole === "MENTOR" && (
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Pending approvals</h2>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            <li className="border-b pb-2">AI draft: "How do we approve knowledge entries?"</li>
            <li className="border-b pb-2">AI draft: "When to escalate code review?"</li>
          </ul>
        </div>
      )}
    </div>
  );
}
