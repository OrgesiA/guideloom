"use client";

import useRequireRole from "../../components/useRequireRole";

const feedbackItems = [
  { id: 1, task: "API pagination", mentor: "mentor1", note: "Focus on edge cases and pagination limits." },
  { id: 2, task: "Vector search ranking", mentor: "mentor2", note: "Consider cosine similarity and normalization." },
];

export default function FeedbackPage() {
  useRequireRole(["INTERN"]);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Feedback</h1>
        <p className="text-slate-700">View mentor feedback and AI-suggested improvements.</p>
      </div>
      <div className="space-y-2">
        {feedbackItems.map((item) => (
          <div key={item.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="text-lg font-semibold text-slate-900">{item.task}</div>
            <div className="text-sm text-slate-600">Mentor: {item.mentor}</div>
            <div className="text-sm text-slate-700 mt-2">{item.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
