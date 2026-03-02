export interface FieldErrors {
  [key: string]: string | undefined;
}

export function requireFields(values: Record<string, string>, labels: Record<string, string>): FieldErrors {
  const errors: FieldErrors = {};
  for (const [field, value] of Object.entries(values)) {
    if (!value.trim()) {
      errors[field] = `${labels[field] ?? field} is required.`;
    }
  }
  return errors;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
