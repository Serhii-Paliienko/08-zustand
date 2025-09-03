import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import { NoteTag } from "@/types/note";

export default async function NotesFilteredPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = 1;
  const perPage = 12;
  const search = "";

  const rawTag = slug?.[0] ?? "All";
  const selectedTag = decodeURIComponent(rawTag) as "All" | NoteTag;

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["notes", { page, perPage, search, tag: selectedTag }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search,
        tag: selectedTag === "All" ? undefined : selectedTag,
      }),
  });

  const state = dehydrate(qc);

  return (
    <HydrationBoundary state={state}>
      <NotesClient
        initialPage={page}
        perPage={perPage}
        initialSearch={search}
        selectedTag={selectedTag}
      />
    </HydrationBoundary>
  );
}
