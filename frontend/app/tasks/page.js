"use client";

import useRequireRole from "../../components/useRequireRole";

const mentorTasks = [
  { id: 1, title: "Week 1: API pagination", difficulty: "MEDIUM", status: "ACTIVE" },
  { id: 2, title: "Week 2: Vector search ranking", difficulty: "HARD", status: "ACTIVE" },
];

const internTasks = [
  { id: 1, title: "API pagination", difficulty: "MEDIUM", status: "ASSIGNED" },
  { id: 2, title: "Vector search ranking", difficulty: "HARD", status: "ASSIGNED" },
];

export default function TasksPage() {
  const role = useRequireRole(["MENTOR", "INTERN"]);
  const viewRole = role || "INTERN";
  const list = viewRole === "MENTOR" ? mentorTasks : internTasks;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{viewRole === "MENTOR" ? "Programs & Tasks" : "Tasks"}</h1>
          <p className="text-slate-700">
            {viewRole === "MENTOR"
              ? "Create/edit weekly tasks and set difficulty."
              : "View your assigned tasks and submit solutions."}
          </p>
        </div>
        {viewRole === "MENTOR" && (
          <button className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white">New Task</button>
        )}
      </div>
      <div className="space-y-2">
        {list.map((task) => (
          <div key={task.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-slate-900">{task.title}</div>
                <div className="text-sm text-slate-600">Difficulty: {task.difficulty}</div>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">{task.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
