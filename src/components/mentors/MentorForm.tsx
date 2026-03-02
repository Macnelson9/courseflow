import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export function MentorForm() {
  return (
    <Card title="Mentor Profile">
      <form className="space-y-3">
        <Input label="Name" name="name" />
        <Input label="Expertise" name="expertise" />
        <Input label="Contact" name="contact" />
        <Button type="submit">Save Mentor</Button>
      </form>
    </Card>
  );
}
