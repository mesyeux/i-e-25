import { UserCircle, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import type { Member } from "../App";

interface MembersListProps {
  members: Member[];
  onDeleteMember: (id: string) => void;
}

export function MembersList({ members, onDeleteMember }: MembersListProps) {
  if (members.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <UserCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
        <p>No members yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-orange-600" />
            <div>
              <div>{member.name}</div>
              {member.role && (
                <div className="text-sm text-gray-500">{member.role}</div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:bg-red-50"
            onClick={() => onDeleteMember(member.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}