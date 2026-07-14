"use client";

import Sidebar from "@/components/dashboard/Sidebar";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-[1400px] mx-auto flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
