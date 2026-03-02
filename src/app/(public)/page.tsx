import Link from "next/link";
import { CourseCard } from "@/components/course/CourseCard";
import { availableCourses, sampleCourse } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-4 border border-border bg-primary p-8 text-inverse-fg">
        <p className="font-mono text-caption uppercase tracking-[0.1em] text-muted-2">CourseFlow Platform</p>
        <h1 className="break-words text-[clamp(30px,8vw,64px)] leading-[0.95]">From Application to Attendance</h1>
        <p className="max-w-3xl font-data text-body text-muted-2">
          Student enrollment, admin acceptance, and QR-powered attendance in one workflow.
        </p>
        <div className="flex flex-wrap gap-6">
          <Link href="/apply">
            <Button variant="secondary" className="home-btn-accent mb-3 mr-3" data-no-gsap="true">Apply Now</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" className="home-btn-accent mb-3 mr-3" data-no-gsap="true">Login</Button>
          </Link>
        </div>
      </section>

      <section id="welcome-section" className="space-y-8 border border-border bg-surface p-8">
        <section className="space-y-3 border border-border bg-primary p-8 text-inverse-fg">
          <p className="font-mono text-caption uppercase tracking-[0.1em] text-muted-2">First-time welcome</p>
          <h2 className="break-words text-[clamp(30px,8vw,64px)] leading-[0.95]">Welcome to CourseFlow</h2>
          <p className="max-w-3xl font-data text-body text-muted-2">
            CourseFlow helps you discover a course, submit your application, and track attendance through QR-based check-ins once accepted.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="border border-border bg-surface p-5">
            <p className="font-mono text-caption uppercase text-muted">01 • Apply</p>
            <h3 className="mt-2 text-h3 text-foreground">Submit your profile</h3>
            <p className="mt-2 font-mono text-caption text-muted">
              Fill in motivation and prior experience. You&apos;ll get an email confirmation.
            </p>
          </article>

          <article className="border border-border bg-surface p-5">
            <p className="font-mono text-caption uppercase text-muted">02 • Get Reviewed</p>
            <h3 className="mt-2 text-h3 text-foreground">Admin decision</h3>
            <p className="mt-2 font-mono text-caption text-muted">
              Admins review and mark your application accepted or rejected.
            </p>
          </article>

          <article className="border border-border bg-surface p-5">
            <p className="font-mono text-caption uppercase text-muted">03 • Join Classes</p>
            <h3 className="mt-2 text-h3 text-foreground">Track attendance</h3>
            <p className="mt-2 font-mono text-caption text-muted">
              Accepted students get dashboard access, assignments, and QR attendance sign-in.
            </p>
          </article>
        </section>
      </section>

      <section className="space-y-4 border border-border bg-surface p-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-mono text-label uppercase tracking-[0.1em] text-foreground">All Courses</h2>
          <p className="font-mono text-caption text-muted">{availableCourses.length} available</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {availableCourses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="stack-card block p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <p className="text-body font-bold uppercase tracking-[0.08em] text-foreground">Course</p>
              <h3 className="mt-2 text-h3 text-foreground">{course.name}</h3>
              <p className="mt-2 font-mono text-caption text-muted">{course.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-mono text-label uppercase tracking-[0.1em] text-foreground">Active Courses</h2>
          <p className="font-mono text-caption text-muted">Currently running</p>
        </div>
        <CourseCard course={sampleCourse} />
      </section>
    </div>
  );
}
