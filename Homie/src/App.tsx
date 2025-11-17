import { useState } from "react";
import { HouseholdManager } from "./components/HouseholdManager";

export interface House {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Member {
  id: string;
  houseId: string;
  name: string;
  role?: string;
}

export interface Task {
  id: string;
  houseId: string;
  title: string;
  description?: string;
  assignedTo: string; // member id
  deadline: Date;
  completed: boolean;
  createdAt: Date;
}

export default function App() {
  const [houses, setHouses] = useState<House[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(null);

  const addHouse = (name: string) => {
    const newHouse: House = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date(),
    };
    setHouses([...houses, newHouse]);
    if (!selectedHouseId) {
      setSelectedHouseId(newHouse.id);
    }
  };

  const deleteHouse = (id: string) => {
    setHouses(houses.filter((h) => h.id !== id));
    setMembers(members.filter((m) => m.houseId !== id));
    setTasks(tasks.filter((t) => t.houseId !== id));
    if (selectedHouseId === id) {
      setSelectedHouseId(houses[0]?.id || null);
    }
  };

  const addMember = (houseId: string, name: string, role?: string) => {
    const newMember: Member = {
      id: crypto.randomUUID(),
      houseId,
      name,
      role,
    };
    setMembers([...members, newMember]);
  };

  const deleteMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
    // Optionally unassign tasks from this member
    setTasks(
      tasks.map((t) =>
        t.assignedTo === id ? { ...t, assignedTo: "" } : t
      )
    );
  };

  const addTask = (
    houseId: string,
    title: string,
    description: string,
    assignedTo: string,
    deadline: Date
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      houseId,
      title,
      description,
      assignedTo,
      deadline,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const updateTask = (
    id: string,
    updates: Partial<Task>
  ) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <HouseholdManager
        houses={houses}
        members={members}
        tasks={tasks}
        selectedHouseId={selectedHouseId}
        onSelectHouse={setSelectedHouseId}
        onAddHouse={addHouse}
        onDeleteHouse={deleteHouse}
        onAddMember={addMember}
        onDeleteMember={deleteMember}
        onAddTask={addTask}
        onToggleTask={toggleTaskCompletion}
        onDeleteTask={deleteTask}
        onUpdateTask={updateTask}
      />
    </div>
  );
}