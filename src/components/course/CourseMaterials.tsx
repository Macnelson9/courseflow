import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Material } from "@/lib/types/course";

export interface CourseMaterialsProps {
  materials: Material[];
}

export function CourseMaterials({ materials }: Readonly<CourseMaterialsProps>) {
  return (
    <Card title="Course Materials" headerTone="inverse">
      <ul className="space-y-2">
        {materials.map((material) => (
          <li key={material.id} className="font-mono text-body text-muted">
            <Link href={material.url} className="underline-offset-2 hover:underline">{material.label}</Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
