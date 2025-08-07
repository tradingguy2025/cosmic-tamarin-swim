"use client";

import { useState } from "react";
import { ForexPairCard } from "@/components/ForexPairCard";
import { MadeWithDyad } from "@/components/made-with-dyad";

const forexPairs = [
  "EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", 
  "USD/CAD", "EUR/GBP", "USD/CHF", "NZD/USD",
  "EUR/JPY", "GBP/JPY", "AUD/JPY", "EUR/AUD"
];

export default function Index() {
  const [selectedPairs, setSelectedPairs] = useState<Record<string, "long" | "short" | null>>({});

  const handleDirectionChange = (pair: string, direction: "long" | "short" | null) => {
    setSelectedPairs(prev => ({
      ...prev,
      [pair]: direction
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light mb-8 text-center text-white/90">
          Forex Daily Pair Checklist
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {forexPairs.map(pair => (
            <ForexPairCard
              key={pair}
              pair={pair}
              onDirectionChange={(direction) => handleDirectionChange(pair, direction)}
            />
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
          <h2 className="text-xl font-light mb-4 text-white/90">Today's Selections</h2>
          {Object.entries(selectedPairs).filter(([_, direction]) => direction).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(selectedPairs)
                .filter(([_, direction]) => direction)
                .map(([pair, direction]) => (
                  <div 
                    key={pair} 
                    className={cn(
                      "p-3 rounded-md flex justify-between items-center",
                      direction === "long" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                    )}
                  >
                    <span>{pair}</span>
                    <span className="font-medium">{direction}</span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-white/50">No pairs selected yet</p>
          )}
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
}