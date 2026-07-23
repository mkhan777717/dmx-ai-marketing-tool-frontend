"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", impressions: 1200 },
  { month: "Feb", impressions: 1800 },
  { month: "Mar", impressions: 2400 },
  { month: "Apr", impressions: 2000 },
  { month: "May", impressions: 2800 },
  { month: "Jun", impressions: 3500 },
];

export default function PerformanceChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Campaign Performance</h3>
        <p className="text-xs text-slate-400 mt-0.5">Monthly impressions over the last 6 months</p>
      </div>

      <div className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
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
                cursor={{ stroke: "#E2E8F0" }}
              />
              <Line
                type="monotone"
                dataKey="impressions"
                stroke="#2563EB"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#2563EB", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#2563EB", strokeWidth: 2, stroke: "#BFDBFE" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
