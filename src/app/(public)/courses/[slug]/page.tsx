import Link from "next/link";
import { notFound } from "next/navigation";
import { availableCourses } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return availableCourses.map((course) => ({ slug: course.slug }));
}

export default async function CourseCurriculumPage({ params }: Readonly<CoursePageProps>) {
  const { slug } = await params;
  const course = availableCourses.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="space-y-3 border border-border bg-primary p-8 text-inverse-fg">
        <p className="font-mono text-caption uppercase tracking-[0.1em] text-muted-2">Course Curriculum</p>
        <h1 className="break-words text-[clamp(30px,8vw,64px)] leading-[0.95]">{course.name}</h1>
        <p className="font-data text-body text-muted-2">{course.description}</p>
      </section>

      <section className="border border-border bg-surface p-6">
        <h2 className="font-mono text-label uppercase tracking-[0.1em] text-foreground">What to Expect</h2>
        <ol className="mt-4 space-y-3">
          {course.curriculum.map((item, index) => (
            <li key={item} className="border border-border bg-background p-3 font-mono text-body text-foreground">
              {String(index + 1).padStart(2, "0")} · {item}
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-wrap gap-4">
        <Link href="/apply">
          <Button>Apply to This Course</Button>
        </Link>
        <Link href="/">
          <Button variant="secondary">Back to All Courses</Button>
        </Link>
      </div>
    </div>
  );
}
