import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AddHouseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddHouse: (name: string) => void;
}

export function AddHouseDialog({
  open,
  onOpenChange,
  onAddHouse,
}: AddHouseDialogProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddHouse(name.trim());
      setName("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Household</DialogTitle>
          <DialogDescription>
            Create a new household to organize tasks and members
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="house-name">Household Name</Label>
              <Input
                id="house-name"
                placeholder="e.g., Main House, Beach House"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim()}
            >
              Add Household
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}