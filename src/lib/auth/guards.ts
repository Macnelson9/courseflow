import { redirect } from "next/navigation";
import { getSessionToken } from "@/lib/auth/session";

export async function requireSession(redirectTo = "/login"): Promise<string> {
  const token = await getSessionToken();
  if (!token) {
    redirect(redirectTo);
  }
  return token;
}
