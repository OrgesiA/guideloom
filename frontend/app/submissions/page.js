"use client";

import useRequireRole from "../../components/useRequireRole";

const items = [
  { id: 1, intern: "ai_intern1", task: "API pagination", status: "Pending" },
  { id: 2, intern: "ai_intern2", task: "Vector search ranking", status: "Pending" },
];

export default function SubmissionsPage() {
  useRequireRole(["MENTOR"]);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Task Submissions</h1>
        <p className="text-slate-700">Review intern submissions and provide feedback.</p>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-slate-900">{item.task}</div>
                <div className="text-sm text-slate-600">Intern: {item.intern}</div>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
