import BillingHeader from "@/components/billing/BillingHeader";
import BillingHistory from "@/components/billing/BillingHistory";
import BillingStats from "@/components/billing/BillingStats";
import CurrentPlan from "@/components/billing/CurrentPlan";
import PaymentMethod from "@/components/billing/PaymentMethod";
import UsageCard from "@/components/billing/UsageCard";

export default function BillingPage() {
  return (
    <div className="space-y-5">
      <BillingHeader />
      <BillingStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CurrentPlan />
        <PaymentMethod />
      </div>
      <UsageCard />
      <BillingHistory />
    </div>
  );
}
