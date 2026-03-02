import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { MentorGrid } from "@/components/mentors/MentorGrid";
import { MentorForm } from "@/components/mentors/MentorForm";
import { sampleMentors } from "@/lib/mock-data";

export default function AdminMentorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Mentors" subtitle="Manage mentor profiles and contact details." action={<Button>Add Mentor</Button>} />
      <MentorGrid mentors={sampleMentors} />
      <MentorForm />
    </div>
  );
}
