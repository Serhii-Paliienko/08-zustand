"use client";

import { useEffect, useMemo, useState } from "react";
import css from "./page.module.css";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import { NoteTag } from "@/types/note";

function Loader() {
  return <div>Loading...</div>;
}
function ErrorBox({ error }: { error: unknown }) {
  const msg = error instanceof Error ? error.message : "Unknown error";
  return <div>Error: {msg}</div>;
}

export default function NotesClient({
  initialPage,
  perPage,
  initialSearch,
  selectedTag,
}: {
  initialPage: number;
  perPage: number;
  initialSearch: string;
  selectedTag: "All" | NoteTag;
}) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [debounceSearch] = useDebounce(search, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => setPage(1), [debounceSearch, selectedTag]);

  const queryKey = useMemo(
    () => [
      "notes",
      { page, perPage, search: debounceSearch, tag: selectedTag },
    ],
    [page, perPage, debounceSearch, selectedTag]
  );

  const { data, isPending, error } = useQuery<FetchNotesResponse>({
    queryKey,
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search: debounceSearch,
        tag: selectedTag === "All" ? undefined : selectedTag,
      }),
    placeholderData: keepPreviousData,
    staleTime: 5_000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isPending && <Loader />}
      {error && <ErrorBox error={error} />}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
