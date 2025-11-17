import { Home, Users, ListTodo, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { HouseSelector } from "./HouseSelector";
import { MembersList } from "./MembersList";
import { TasksList } from "./TasksList";
import { AddHouseDialog } from "./AddHouseDialog";
import { AddMemberDialog } from "./AddMemberDialog";
import { AddTaskDialog } from "./AddTaskDialog";
import { useState } from "react";
import type { House, Member, Task } from "../App";

interface HouseholdManagerProps {
  houses: House[];
  members: Member[];
  tasks: Task[];
  selectedHouseId: string | null;
  onSelectHouse: (id: string) => void;
  onAddHouse: (name: string) => void;
  onDeleteHouse: (id: string) => void;
  onAddMember: (
    houseId: string,
    name: string,
    role?: string,
  ) => void;
  onDeleteMember: (id: string) => void;
  onAddTask: (
    houseId: string,
    title: string,
    description: string,
    assignedTo: string,
    deadline: Date,
  ) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
}

export function HouseholdManager({
  houses,
  members,
  tasks,
  selectedHouseId,
  onSelectHouse,
  onAddHouse,
  onDeleteHouse,
  onAddMember,
  onDeleteMember,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
}: HouseholdManagerProps) {
  const [showAddHouse, setShowAddHouse] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  const selectedHouse = houses.find(
    (h) => h.id === selectedHouseId,
  );
  const houseMembers = members.filter(
    (m) => m.houseId === selectedHouseId,
  );
  const houseTasks = tasks.filter(
    (t) => t.houseId === selectedHouseId,
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-2 flex items-center gap-3">
          <Home className="w-10 h-10 text-orange-600" />
          Homies: Household Task Organiser
        </h1>
        <p className="text-gray-600">
          Manage your household tasks, members, and stay
          organized
        </p>
      </div>

      {/* House Selector */}
      <div className="mb-6">
        <HouseSelector
          houses={houses}
          selectedHouseId={selectedHouseId}
          onSelectHouse={onSelectHouse}
          onAddHouse={() => setShowAddHouse(true)}
          onDeleteHouse={onDeleteHouse}
        />
      </div>

      {selectedHouse ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Members Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                Members
              </h2>
              <Button
                size="sm"
                onClick={() => setShowAddMember(true)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <MembersList
              members={houseMembers}
              onDeleteMember={onDeleteMember}
            />
          </Card>

          {/* Tasks Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2">
                  <ListTodo className="w-5 h-5 text-orange-600" />
                  Tasks
                </h2>
                <Button
                  size="sm"
                  onClick={() => setShowAddTask(true)}
                  disabled={houseMembers.length === 0}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Task
                </Button>
              </div>
              {houseMembers.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Add members first to create tasks</p>
                </div>
              ) : (
                <TasksList
                  tasks={houseTasks}
                  members={houseMembers}
                  onToggleTask={onToggleTask}
                  onDeleteTask={onDeleteTask}
                  onUpdateTask={onUpdateTask}
                />
              )}
            </Card>
          </div>
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Home className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="mb-2 text-gray-600">
            No household selected
          </h3>
          <p className="text-gray-500 mb-4">
            Create a household to get started
          </p>
          <Button onClick={() => setShowAddHouse(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Household
          </Button>
        </Card>
      )}

      {/* Dialogs */}
      <AddHouseDialog
        open={showAddHouse}
        onOpenChange={setShowAddHouse}
        onAddHouse={onAddHouse}
      />
      {selectedHouseId && (
        <>
          <AddMemberDialog
            open={showAddMember}
            onOpenChange={setShowAddMember}
            onAddMember={(name, role) =>
              onAddMember(selectedHouseId, name, role)
            }
          />
          <AddTaskDialog
            open={showAddTask}
            onOpenChange={setShowAddTask}
            members={houseMembers}
            onAddTask={(
              title,
              description,
              assignedTo,
              deadline,
            ) =>
              onAddTask(
                selectedHouseId,
                title,
                description,
                assignedTo,
                deadline,
              )
            }
          />
        </>
      )}
    </div>
  );
}