export type UserRole = "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AdminUser extends User {
  role: "admin";
}

export interface Session {
  token: string;
  user: User;
}
