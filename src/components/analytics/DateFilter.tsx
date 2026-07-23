const ranges = ["7D", "30D", "90D", "1Y"];

export default function DateFilter() {
  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
      {ranges.map((range, i) => (
        <button
          key={range}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            i === 1
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
