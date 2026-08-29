import AccountSettings from "@/components/settings/AccountSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PreferencesCard from "@/components/settings/PreferencesCard";
import SecuritySettings from "@/components/settings/SecuritySettings";
import SettingsHeader from "@/components/settings/SettingsHeader";
import SocialIntegrationsCard from "@/components/settings/SocialIntegrationsCard";

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <SettingsHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AccountSettings />
        <PreferencesCard />
      </div>
      <SocialIntegrationsCard />
      <NotificationSettings />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AppearanceSettings />
        <SecuritySettings />
      </div>
    </div>
  );
}
