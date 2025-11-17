import { Home, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { House } from "../App";

interface HouseSelectorProps {
  houses: House[];
  selectedHouseId: string | null;
  onSelectHouse: (id: string) => void;
  onAddHouse: () => void;
  onDeleteHouse: (id: string) => void;
}

export function HouseSelector({
  houses,
  selectedHouseId,
  onSelectHouse,
  onAddHouse,
  onDeleteHouse,
}: HouseSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-700">Your Households</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddHouse}
          className="border-orange-300 text-orange-600 hover:bg-orange-50"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Household
        </Button>
      </div>
      <div className="flex gap-3 flex-wrap">
        {houses.map((house) => (
          <Card
            key={house.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md group ${
              selectedHouseId === house.id
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-white hover:bg-orange-50"
            }`}
            onClick={() => onSelectHouse(house.id)}
          >
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5" />
              <span>{house.name}</span>
              <Button
                variant="ghost"
                size="sm"
                className={`ml-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                  selectedHouseId === house.id
                    ? "text-white hover:bg-orange-700"
                    : "text-red-600 hover:bg-red-50"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteHouse(house.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}