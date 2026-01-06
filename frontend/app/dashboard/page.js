"use client";

import useRequireRole from "../../components/useRequireRole";

const cards = [
  { title: "Pending Reviews", value: "3", hint: "Mentor reviews awaiting" },
  { title: "Open Tasks", value: "6", hint: "Assigned this week" },
  { title: "Escalations", value: "1", hint: "AI flagged low confidence" },
];

export default function DashboardPage() {
  const role = useRequireRole(["MENTOR", "INTERN"]);
  const viewRole = role || "INTERN";
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-slate-700">
          {viewRole === "MENTOR"
            ? "Overview of interns, programs, progress, and question trends."
            : "Your assigned tasks, progress, and weak areas."}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-600">{card.title}</div>
            <div className="text-2xl font-semibold text-slate-900">{card.value}</div>
            <div className="text-xs text-slate-500">{card.hint}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Weak Concepts</h2>
        <p className="text-sm text-slate-600">Coming soon: heatmap powered by embeddings and scores.</p>
      </div>
    </div>
  );
}
