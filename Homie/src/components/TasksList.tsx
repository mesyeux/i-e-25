import { CheckCircle2, Circle, Clock, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import type { Task, Member } from "../App";

interface TasksListProps {
  tasks: Task[];
  members: Member[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
}

export function TasksList({
  tasks,
  members,
  onToggleTask,
  onDeleteTask,
}: TasksListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <Circle className="w-12 h-12 mx-auto mb-2 opacity-30" />
        <p>No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  const getMemberName = (memberId: string) => {
    return members.find((m) => m.id === memberId)?.name || "Unassigned";
  };

  const getDeadlineStatus = (deadline: Date) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffDays = Math.ceil(
      (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return { status: "overdue", color: "bg-red-100 text-red-700" };
    if (diffDays === 0) return { status: "today", color: "bg-orange-100 text-orange-700" };
    if (diffDays <= 3) return { status: "soon", color: "bg-yellow-100 text-yellow-700" };
    return { status: "upcoming", color: "bg-green-100 text-green-700" };
  };

  const formatDeadline = (deadline: Date) => {
    return new Date(deadline).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Sort tasks: incomplete first, then by deadline
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => {
        const deadlineInfo = getDeadlineStatus(task.deadline);
        return (
          <div
            key={task.id}
            className={`p-4 rounded-lg border-2 transition-all group ${
              task.completed
                ? "bg-gray-50 border-gray-200 opacity-60"
                : "bg-white border-gray-200 hover:border-orange-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleTask(task.id)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4
                      className={`mb-1 ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-sm text-gray-600 mb-2">
                        {task.description}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:bg-red-50"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    {getMemberName(task.assignedTo)}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${deadlineInfo.color} border-0`}
                  >
                    <CalendarIcon className="w-3 h-3 mr-1" />
                    {formatDeadline(task.deadline)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}