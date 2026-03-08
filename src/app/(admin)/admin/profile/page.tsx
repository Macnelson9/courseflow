import { PageHeader } from "@/components/layout/PageHeader";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";

export default function AdminProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Manage your admin account settings and credentials."
      />
      <ProfileInfo
        name="Admin User"
        email="admin@courseflow.dev"
        role="Admin"
        extra={[{ label: "Access Level", value: "Full Access" }]}
      />
      <ChangePasswordForm />
    </div>
  );
}
