"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ForexPairCardProps {
  pair: string;
  onDirectionChange: (direction: "long" | "short" | null) => void;
}

export const ForexPairCard = ({ pair, onDirectionChange }: ForexPairCardProps) => {
  const [direction, setDirection] = useState<"long" | "short" | null>(null);

  const handleClick = (newDirection: "long" | "short") => {
    const updatedDirection = direction === newDirection ? null : newDirection;
    setDirection(updatedDirection);
    onDirectionChange(updatedDirection);
  };

  return (
    <div className="relative group">
      <div className={cn(
        "h-32 w-48 rounded-lg flex flex-col items-center justify-center transition-all duration-300",
        "bg-transparent border border-transparent",
        "hover:border-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
        direction === "long" && "shadow-[0_0_20px_rgba(0,255,0,0.3)] border-green-500/30",
        direction === "short" && "shadow-[0_0_20px_rgba(255,0,0,0.3)] border-red-500/30"
      )}>
        <span className="text-2xl font-light text-white/90 mb-4">{pair}</span>
        <div className="flex space-x-4">
          <button
            onClick={() => handleClick("long")}
            className={cn(
              "px-4 py-2 rounded-md transition-all",
              "text-white/80 hover:text-white hover:bg-green-500/20",
              direction === "long" ? "bg-green-500/30 text-white shadow-[0_0_10px_rgba(0,255,0,0.5)]" : "bg-transparent"
            )}
          >
            Long
          </button>
          <button
            onClick={() => handleClick("short")}
            className={cn(
              "px-4 py-2 rounded-md transition-all",
              "text-white/80 hover:text-white hover:bg-red-500/20",
              direction === "short" ? "bg-red-500/30 text-white shadow-[0_0_10px_rgba(255,0,0,0.5)]" : "bg-transparent"
            )}
          >
            Short
          </button>
        </div>
      </div>
    </div>
  );
};