import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import AnalyticsStats from "@/components/analytics/AnalyticsStats";
import PerformanceChart from "@/components/analytics/PerformanceChart";
import TrafficSourceChart from "@/components/analytics/TrafficSourceChart";
import CampaignPerformanceTable from "@/components/analytics/CampaignPerformanceTable";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsHeader />

      <AnalyticsStats />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <PerformanceChart />
        <TrafficSourceChart />
      </div>

      <CampaignPerformanceTable />
    </div>
  );
}