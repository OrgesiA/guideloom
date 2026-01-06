"use client";

import useRequireRole from "../../components/useRequireRole";

const stats = [
  { title: "Tasks completed", value: "4" },
  { title: "Tasks open", value: "2" },
  { title: "Weak concepts", value: "Array bounds, sorting stability" },
];

export default function ProgressPage() {
  useRequireRole(["INTERN"]);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Progress</h1>
        <p className="text-slate-700">Personal completion stats and weak concepts.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.title} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-600">{s.title}</div>
            <div className="text-xl font-semibold text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
