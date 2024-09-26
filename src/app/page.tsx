"use client";

import Dashboard from "@/components/dashboard";
import ModeToggle from "@/components/ui/modeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute top-3 right-3">
        <ModeToggle />
      </div>
      <Dashboard />
    </main>
  );
}
