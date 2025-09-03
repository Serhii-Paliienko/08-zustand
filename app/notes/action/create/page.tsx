import type { Metadata } from "next";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { OG_IMAGE } from "@/lib/api";

export const metadata: Metadata = {
  title: "Create note",
  description: "Create a new note in NoteHub. Fast, simple, and searchable.",
  openGraph: {
    title: "Create note",
    description: "Add a new note to NoteHub with tags and instant search.",
    url: "/notes/action/create",
    images: [{ url: OG_IMAGE }],
  },
  alternates: { canonical: "/notes/action/create" },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onCancel={() => {}} />
      </div>
    </main>
  );
}
