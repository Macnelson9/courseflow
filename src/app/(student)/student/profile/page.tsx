import { PageHeader } from "@/components/layout/PageHeader";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";

export default function StudentProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Manage your account settings and credentials."
      />
      <ProfileInfo
        name="Aisha Bello"
        email="aisha@example.com"
        role="Student"
        extra={[
          { label: "Phone", value: "+234-111-000-001" },
          { label: "Course", value: "Intro to Rust" },
          { label: "Cohort", value: "Cohort 3" },
        ]}
      />
      <ChangePasswordForm />
    </div>
  );
}
