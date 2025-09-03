import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes, OG_IMAGE, SITE_URL } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import { NoteTag, TAGS } from "@/types/note";
import { Metadata } from "next";

type PageProps = {
  params: { slug?: string[] };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const rawTag = params.slug?.[0] ?? "All";
  const selectedTag = decodeURIComponent(rawTag) as "All" | NoteTag;
  const valid = (TAGS as readonly string[]).includes(selectedTag);

  const title = valid
    ? `Notes – ${selectedTag} | NoteHub`
    : "Notes – All | NoteHub";
  const description = valid
    ? `Filtered notes by tag: ${selectedTag}.`
    : "All notes in NoteHub.";

  const url = `${SITE_URL}/notes/filter/${encodeURIComponent(
    valid ? selectedTag : "All"
  )}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
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
