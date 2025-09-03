"use client";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import ClientLocalTime from "@/components/ClientLocalTime/ClientLocalTime";
import Modal from "@/components/Modal/Modal";

const NotePreview = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const noteId = params.id;
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
    refetchOnMount: false,
    staleTime: 5_000,
    refetchOnWindowFocus: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isLoading && <div>Loading...</div>}
      {(error || !note) && !isLoading && <div>Error loading note</div>}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <div>
                <span className={css.tag}>{note.tag}</span>
                <span className={css.date}>
                  <ClientLocalTime iso={note.createdAt} />
                </span>
              </div>
            </div>

            <p className={css.content}>{note.content}</p>
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Close modal"
              className={css.backBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default NotePreview;
