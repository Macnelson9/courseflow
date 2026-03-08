import { PageHeader } from "@/components/layout/PageHeader";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";

export default function MentorProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Manage your mentor account settings and credentials."
      />
      <ProfileInfo
        name="Ada N."
        email="ada@courseflow.dev"
        role="Mentor"
        extra={[
          { label: "Expertise", value: "Systems Programming" },
          { label: "Assigned Course", value: "Intro to Rust" },
        ]}
      />
      <ChangePasswordForm />
    </div>
  );
}
