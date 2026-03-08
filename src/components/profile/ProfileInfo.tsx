import { Card } from "@/components/ui/Card";

export interface ProfileInfoProps {
  name: string;
  email: string;
  role: string;
  extra?: { label: string; value: string }[];
}

export function ProfileInfo({
  name,
  email,
  role,
  extra,
}: Readonly<ProfileInfoProps>) {
  return (
    <Card title="Profile Information" headerTone="inverse">
      <dl className="grid gap-3 font-mono text-body sm:grid-cols-2">
        <div>
          <dt className="text-caption uppercase text-muted">Full Name</dt>
          <dd className="text-foreground">{name}</dd>
        </div>
        <div>
          <dt className="text-caption uppercase text-muted">Email</dt>
          <dd className="text-foreground">{email}</dd>
        </div>
        <div>
          <dt className="text-caption uppercase text-muted">Role</dt>
          <dd className="uppercase text-foreground">{role}</dd>
        </div>
        {extra?.map((item) => (
          <div key={item.label}>
            <dt className="text-caption uppercase text-muted">{item.label}</dt>
            <dd className="text-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
