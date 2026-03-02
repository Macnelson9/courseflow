"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { Course } from "@/lib/types/course";

export interface CourseFormProps {
  initialCourse?: Course;
}

interface EditableRow {
  id: string;
  label: string;
  url: string;
}

interface EditableAssignment {
  id: string;
  title: string;
  brief: string;
  dueDate: string;
  prInstructions: string;
}

export function CourseForm({ initialCourse }: Readonly<CourseFormProps>) {
  const [materials, setMaterials] = useState<EditableRow[]>(
    initialCourse?.materials ?? [{ id: crypto.randomUUID(), label: "", url: "" }],
  );
  const [assignments, setAssignments] = useState<EditableAssignment[]>(
    initialCourse?.assignments ?? [{ id: crypto.randomUUID(), title: "", brief: "", dueDate: "", prInstructions: "" }],
  );

  return (
    <Card title="Course Setup" description="Create or update your course details">
      <form className="space-y-4">
        <Input label="Course Name" name="name" defaultValue={initialCourse?.name} />
        <Textarea label="Description" name="description" defaultValue={initialCourse?.description} />
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Start Date" name="startDate" type="date" defaultValue={initialCourse?.startDate} />
          <Input label="End Date" name="endDate" type="date" defaultValue={initialCourse?.endDate} />
        </div>
        <Input label="Schedule" name="schedule" defaultValue={initialCourse?.schedule} />
        <Input label="Venue" name="venue" defaultValue={initialCourse?.venue} />
        <Input label="Max Capacity" name="maxCapacity" type="number" defaultValue={String(initialCourse?.maxCapacity ?? "")} />
        <Input label="GitHub Repo URL" name="githubRepoUrl" defaultValue={initialCourse?.githubRepoUrl} />

        <div className="space-y-3">
          <h3 className="text-h3">Course Materials</h3>
          {materials.map((material, index) => (
            <div key={material.id} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
              <Input label="Label" name={`materialLabel-${index}`} defaultValue={material.label} />
              <Input label="URL" name={`materialUrl-${index}`} defaultValue={material.url} />
              <Button type="button" variant="ghost" disabled={materials.length === 1} onClick={() => setMaterials((rows) => rows.filter((row) => row.id !== material.id))}>×</Button>
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={() => setMaterials((rows) => [...rows, { id: crypto.randomUUID(), label: "", url: "" }])}>Add Link</Button>
        </div>

        <div className="space-y-3">
          <h3 className="text-h3">Assignments</h3>
          {assignments.map((assignment, index) => (
            <div key={assignment.id} className="space-y-2 border border-border p-3">
              <Input label="Title" name={`assignmentTitle-${index}`} defaultValue={assignment.title} />
              <Textarea label="Brief" name={`assignmentBrief-${index}`} defaultValue={assignment.brief} />
              <Input label="Due Date" name={`assignmentDue-${index}`} type="date" defaultValue={assignment.dueDate} />
              <Textarea label="GitHub PR Instructions" name={`assignmentPr-${index}`} defaultValue={assignment.prInstructions} />
              <Button type="button" variant="ghost" disabled={assignments.length === 1} onClick={() => setAssignments((rows) => rows.filter((row) => row.id !== assignment.id))}>Remove Assignment</Button>
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={() => setAssignments((rows) => [...rows, { id: crypto.randomUUID(), title: "", brief: "", dueDate: "", prInstructions: "" }])}>Add Assignment</Button>
        </div>

        <Button type="submit">Save Course</Button>
      </form>
    </Card>
  );
}
