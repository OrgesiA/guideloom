"use client";

import useRequireRole from "../../components/useRequireRole";

const metrics = [
  { title: "Completion", value: "78%", hint: "Tasks completed" },
  { title: "Weak Concepts", value: "2", hint: "Need reinforcement" },
  { title: "Mentor Load", value: "Low", hint: "Reviews under control" },
];

export default function AnalyticsPage() {
  useRequireRole(["MENTOR"]);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Analytics & Reports</h1>
        <p className="text-slate-700">Intern progress, task completion, weak concepts, mentor workload.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.title} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-600">{m.title}</div>
            <div className="text-2xl font-semibold text-slate-900">{m.value}</div>
            <div className="text-xs text-slate-500">{m.hint}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
