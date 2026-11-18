import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  detail?: React.ReactNode;
}

export default function StatCard({ title, value, icon, detail }: StatCardProps) {
  return (
    <div className=" bg-black p-4 sm:p-6 rounded-lg shadow-lg flex items-center border gap-4">
      {icon}
      <div className="grid gap-1">
        <h4 className="text-lg font-semibold text-gray-300">{title}</h4>
        <p className="text-2xl font-bold text-white">{value}</p>
        {detail && <div className="text-sm text-gray-400">{detail}</div>}
      </div>
    </div>
  );
}
