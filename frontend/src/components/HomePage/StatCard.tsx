import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className=" bg-black p-6 rounded-lg shadow-lg flex items-center border gap-4">
      {icon}

      <h4 className="text-lg font-semibold text-gray-300">{title}</h4>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
