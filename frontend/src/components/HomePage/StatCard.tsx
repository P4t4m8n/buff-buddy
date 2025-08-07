import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold text-gray-300">{title}</h4>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
