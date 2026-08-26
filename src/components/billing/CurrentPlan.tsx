"use client";

import { useEffect, useState } from "react";
import { PlanService } from "@/services/plan.service";
import type { PlanResponse } from "@/types/plan";

export default function CurrentPlan() {
  const [plans, setPlans] = useState<PlanResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    PlanService.getAll()
      .then((res) => {
        if (isMounted) {
          setPlans(res.data?.data || []);
        }
      })
      .catch(() => {
        if (isMounted) setPlans([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const activePlan = plans.find((p) => p.is_active) || plans[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Current Plan</h3>
        <p className="text-xs text-slate-400 mt-0.5">Your active subscription details</p>
      </div>
      <div className="p-6 space-y-4">
        {loading ? (
          <p className="text-xs text-slate-400">Loading plan information...</p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {activePlan?.name || "Professional Plan"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {activePlan?.description || "Unlimited campaigns, analytics, reports and AI tools."}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Active
              </span>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-400 mb-3">
                {activePlan?.price_monthly
                  ? `₹${activePlan.price_monthly}/month · Renews on 01 Sep 2026`
                  : "Renews on 01 Sep 2026"}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center h-9 px-4 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  Change Plan
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
