interface StatCardProps {
  title: string;
  value: string;
  change: string;
}
export default function StatCard({title,value,change,}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
      <p className="text-green-600 text-sm mt-3">{change}</p>
    </div>
  );
}