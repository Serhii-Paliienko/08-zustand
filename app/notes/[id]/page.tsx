import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNoteById, OG_IMAGE } from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const note = await fetchNoteById(params.id);
  const title = `${note.title} — Note details`;
  const description =
    (note.content || "").replace(/\s+/g, " ").slice(0, 160) ||
    `Read the note “${note.title}” on NoteHub.`;
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url: `/notes/${params.id}`,
      images: [{ url: OG_IMAGE }],
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
