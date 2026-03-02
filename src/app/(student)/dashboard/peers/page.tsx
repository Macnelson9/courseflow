import { PageHeader } from "@/components/layout/PageHeader";
import { ClassmateGrid } from "@/components/students/ClassmateGrid";
import { sampleClassmates } from "@/lib/mock-data";

export default function StudentPeersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Peers" subtitle="Classmates in your current cohort." />
      <ClassmateGrid classmates={sampleClassmates} />
    </div>
  );
}
