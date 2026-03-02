import type { Classmate } from "@/lib/types/student";
import { ClassmateCard } from "@/components/students/ClassmateCard";

export interface ClassmateGridProps {
  classmates: Classmate[];
}

export function ClassmateGrid({ classmates }: Readonly<ClassmateGridProps>) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {classmates.map((classmate) => (
        <ClassmateCard key={classmate.id} classmate={classmate} />
      ))}
    </div>
  );
}
