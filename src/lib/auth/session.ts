import { cookies } from "next/headers";

const SESSION_KEY = "courseflow_session";

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_KEY)?.value ?? null;
}

export async function clearSessionToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);
}
