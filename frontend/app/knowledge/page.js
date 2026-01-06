"use client";

import useRequireRole from "../../components/useRequireRole";

const entries = [
  { id: 1, scope: "COMPANY", title: "Shadow tutor rules", snippet: "Prioritize company knowledge..." },
  { id: 2, scope: "GENERAL", title: "Big O refresher", snippet: "Use O(n log n) sort..." },
];

export default function KnowledgePage() {
  useRequireRole(["MENTOR"]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Knowledge</h1>
          <p className="text-slate-700">Browse and approve knowledge entries. Company scope first, general for theory.</p>
        </div>
        <button className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white">New Entry</button>
      </div>
      <div className="space-y-2">
        {entries.map((entry) => (
          <div key={entry.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-slate-900">{entry.title}</div>
                <div className="text-sm text-slate-600">{entry.snippet}</div>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{entry.scope}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
