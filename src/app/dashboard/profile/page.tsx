import ActivityCard from "@/components/profile/ActivityCard";
import PersonalInformation from "@/components/profile/PersonalInformation";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import SecuritySettings from "@/components/profile/SecuritySettings";

export default function ProfilePage() {
  return (
    <div className="space-y-5">
      <ProfileHeader />
      <ProfileStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column */}
        <div className="space-y-4">
          <ProfileCard />
          <SecuritySettings />
        </div>
        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          <PersonalInformation />
          <ActivityCard />
        </div>
      </div>
    </div>
  );
}
