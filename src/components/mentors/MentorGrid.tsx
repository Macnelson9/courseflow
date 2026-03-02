import type { Mentor } from "@/lib/types/mentor";
import { MentorCard } from "@/components/mentors/MentorCard";

export interface MentorGridProps {
  mentors: Mentor[];
}

export function MentorGrid({ mentors }: Readonly<MentorGridProps>) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </div>
  );
}
