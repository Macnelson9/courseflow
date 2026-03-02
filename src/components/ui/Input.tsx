"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string | undefined;
  containerClassName?: string | undefined;
}

export function Input({ label, error, id, className, containerClassName, type = "text", ...props }: Readonly<InputProps>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const finalType = isPassword && showPassword ? "text" : type;

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <label htmlFor={inputId} className="block font-mono text-label uppercase text-muted">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={finalType}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-12 w-full border bg-surface px-4 text-body text-foreground transition duration-150 ease-out placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-background disabled:text-muted",
            error ? "border-foreground" : "border-border",
            isPassword ? "pr-12" : "",
            className,
          )}
          {...props}
        />
        {isPassword ? (
          <button
            type="button"
            className="absolute right-1 top-1 inline-flex h-10 min-h-10 min-w-10 items-center justify-center text-muted transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} className="font-mono text-caption text-foreground" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
