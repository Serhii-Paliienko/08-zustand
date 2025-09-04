import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes, OG_IMAGE } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const rawTag = slug?.[0] ?? "All";
  const selectedTag = decodeURIComponent(rawTag);
  const title = selectedTag === "All" ? "All notes" : `Notes — ${selectedTag}`;
  const description =
    selectedTag === "All"
      ? "Browse all notes on NoteHub with fast search and filters."
      : `Browse "${selectedTag}" notes on NoteHub with fast search and filters.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/notes/filter/${encodeURIComponent(selectedTag)}`,
      images: [{ url: OG_IMAGE }],
    },
  };
}

export default async function NotesFilteredPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = 1;
  const perPage = 12;
  const search = "";

  const rawTag = (slug?.[0] ?? "All") as string;
  const selectedTag = decodeURIComponent(rawTag) as "All" | NoteTag;
  const q = { page, perPage, search, tag: selectedTag };

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["notes", q],
    queryFn: () =>
      fetchNotes({
        ...q,
        tag: selectedTag === "All" ? undefined : selectedTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient
        initialPage={page}
        perPage={perPage}
        initialSearch={search}
        selectedTag={selectedTag}
      />
    </HydrationBoundary>
  );
}
