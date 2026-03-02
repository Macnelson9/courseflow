import { useId } from "react";
import { cn } from "@/lib/utils/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string | undefined;
  containerClassName?: string | undefined;
}

export function Textarea({ label, error, id, className, containerClassName, ...props }: Readonly<TextareaProps>) {
  const generatedId = useId();
  const textAreaId = id ?? generatedId;
  const errorId = `${textAreaId}-error`;

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <label htmlFor={textAreaId} className="block font-mono text-label uppercase text-muted">
        {label}
      </label>
      <textarea
        id={textAreaId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "min-h-28 w-full border bg-surface px-4 py-3 text-body text-foreground transition duration-150 ease-out placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-background disabled:text-muted",
          error ? "border-foreground" : "border-border",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} className="font-mono text-caption text-foreground" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
