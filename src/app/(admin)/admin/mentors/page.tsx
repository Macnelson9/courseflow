"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";
import { useToast } from "@/lib/hooks/useToast";
import { sampleMentors } from "@/lib/mock-data";
import type { Mentor } from "@/lib/types/mentor";

const courseOptions = [
  "Intro to Rust",
  "Intro to Blockchain using Solidity",
  "Design Basics",
  "Intro to Starknet using Cairo",
  "Video Editing Basics",
  "Rust for Bitcoin",
  "Product Management",
];

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>(sampleMentors);
  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Mentor | null>(null);
  const { toasts, push, remove } = useToast();

  async function handleAdd(formData: FormData) {
    const course = String(formData.get("assignedCourse") ?? "").trim();
    const newMentor: Mentor = {
      id: `mn-${Date.now()}`,
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      expertise: String(formData.get("expertise") ?? "").trim(),
      contact: String(formData.get("contact") ?? "").trim(),
      ...(course ? { assignedCourse: course } : {}),
    };
    setMentors((prev) => [...prev, newMentor]);
    setShowAddForm(false);
    push("Mentor added successfully", "success");
  }

  async function handleUpdate(formData: FormData) {
    if (!editingMentor) return;
    const updatedCourse = String(formData.get("assignedCourse") ?? "").trim();
    const updated: Mentor = {
      ...editingMentor,
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      expertise: String(formData.get("expertise") ?? "").trim(),
      contact: String(formData.get("contact") ?? "").trim(),
      ...(updatedCourse ? { assignedCourse: updatedCourse } : {}),
    };
    setMentors((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    setEditingMentor(null);
    push("Mentor updated successfully", "success");
  }

  function handleDelete() {
    if (!deleteModal) return;
    setMentors((prev) => prev.filter((m) => m.id !== deleteModal.id));
    setDeleteModal(null);
    push("Mentor removed from system", "info");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mentors"
        subtitle={`${mentors.length} mentors · Manage profiles, assigned courses, and contact details.`}
        action={
          <Button
            onClick={() => {
              setShowAddForm(true);
              setEditingMentor(null);
            }}
          >
            Add Mentor
          </Button>
        }
      />

      {/* Mentor List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor) => (
          <Card
            key={mentor.id}
            title={mentor.name}
            description={mentor.expertise}
          >
            <div className="space-y-2 font-mono text-caption text-muted">
              <p>Email: {mentor.email}</p>
              <p>Contact: {mentor.contact}</p>
              {mentor.assignedCourse ? (
                <p>
                  Course:{" "}
                  <span className="text-foreground">
                    {mentor.assignedCourse}
                  </span>
                </p>
              ) : (
                <p className="italic">No course assigned</p>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setEditingMentor(mentor);
                  setShowAddForm(false);
                }}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setDeleteModal(mentor)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {mentors.length === 0 ? (
        <div className="border border-border bg-surface p-8 text-center">
          <p className="font-mono text-body text-muted">
            No mentors in the system yet.
          </p>
        </div>
      ) : null}

      {/* Add Mentor Form */}
      <Modal
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        title="Add New Mentor"
        footer={null}
      >
        <form action={handleAdd} className="space-y-4">
          <Input
            name="name"
            label="Full Name"
            placeholder="e.g. Ada N."
            required
          />
          <Input
            name="email"
            type="email"
            label="Email Address"
            placeholder="e.g. ada@courseflow.dev"
            required
          />
          <Input
            name="expertise"
            label="Expertise"
            placeholder="e.g. Systems Programming"
            required
          />
          <Input
            name="contact"
            label="Contact"
            placeholder="e.g. ada@courseflow.dev"
            required
          />
          <div className="space-y-2">
            <label
              htmlFor="add-assignedCourse"
              className="block font-mono text-label uppercase text-muted"
            >
              Assigned Course
            </label>
            <select
              id="add-assignedCourse"
              name="assignedCourse"
              className="h-12 w-full border border-border bg-surface px-4 font-mono text-body text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              defaultValue=""
            >
              <option value="">None</option>
              {courseOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Mentor</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Mentor Form */}
      <Modal
        isOpen={Boolean(editingMentor)}
        onClose={() => setEditingMentor(null)}
        title={`Edit Mentor: ${editingMentor?.name ?? ""}`}
        footer={null}
      >
        {editingMentor ? (
          <form action={handleUpdate} className="space-y-4">
            <Input
              name="name"
              label="Full Name"
              defaultValue={editingMentor.name}
              required
            />
            <Input
              name="email"
              type="email"
              label="Email Address"
              defaultValue={editingMentor.email}
              required
            />
            <Input
              name="expertise"
              label="Expertise"
              defaultValue={editingMentor.expertise}
              required
            />
            <Input
              name="contact"
              label="Contact"
              defaultValue={editingMentor.contact}
              required
            />
            <div className="space-y-2">
              <label
                htmlFor="edit-assignedCourse"
                className="block font-mono text-label uppercase text-muted"
              >
                Assigned Course
              </label>
              <select
                id="edit-assignedCourse"
                name="assignedCourse"
                className="h-12 w-full border border-border bg-surface px-4 font-mono text-body text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                defaultValue={editingMentor.assignedCourse ?? ""}
              >
                <option value="">None</option>
                {courseOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setEditingMentor(null)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        ) : null}
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={Boolean(deleteModal)}
        onClose={() => setDeleteModal(null)}
        title={`Delete ${deleteModal?.name ?? "Mentor"}?`}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setDeleteModal(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Mentor
            </Button>
          </div>
        }
      >
        <p className="font-mono text-body text-muted">
          This will permanently remove <strong>{deleteModal?.name}</strong> from
          the system.
          {deleteModal?.assignedCourse
            ? ` They are currently assigned to ${deleteModal.assignedCourse}.`
            : ""}
        </p>
      </Modal>

      <Toast toasts={toasts} onClose={remove} />
    </div>
  );
}
