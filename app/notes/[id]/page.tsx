import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNoteById, OG_IMAGE, SITE_URL } from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import { PageProps } from "@/types/note";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const note = await fetchNoteById(params.id);
    const title = `${note.title} | NoteHub`;
    const description =
      note.content?.slice(0, 140).replace(/\s+/g, " ") || "Note details";
    const url = `${SITE_URL}/notes/${params.id}`;

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
  } catch {
    const title = "Note not found | NoteHub";
    const description = "Requested note cannot be found.";
    const url = `${SITE_URL}/notes/${params.id}`;

    return {
      title,
      description,
      openGraph: { title, description, url, images: [{ url: OG_IMAGE }] },
    };
  }
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
