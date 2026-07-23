"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Google", value: 40 },
  { name: "Facebook", value: 25 },
  { name: "Instagram", value: 20 },
  { name: "LinkedIn", value: 15 },
];

const COLORS = ["#2563EB", "#06B6D4", "#F59E0B", "#8B5CF6"];

export default function TrafficSourceChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Traffic Sources</h3>
        <p className="text-xs text-slate-400 mt-0.5">Channel breakdown by percentage share</p>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F8FAFC",
                  fontSize: "12px",
                  padding: "8px 12px",
                }}
                itemStyle={{ color: "#93C5FD" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs font-medium text-slate-600">{entry.name}</span>
              <span className="ml-auto text-xs font-bold text-slate-800">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
