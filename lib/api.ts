import type { AxiosInstance } from "axios";
import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
if (!token) throw new Error("Missing NEXT_PUBLIC_NOTEHUB_TOKEN");

const api: AxiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: { Authorization: `Bearer ${token}` },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteInput {
  title: string;
  content?: string;
  tag: NoteTag;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search, tag } = params;
  const q: Record<string, unknown> = { page, perPage };
  if (search) q.search = search;
  if (tag) q.tag = tag;

  const res = await api.get<FetchNotesResponse>("/notes", {
    params: q,
  });
  return res.data;
}

export async function createNote(input: CreateNoteInput): Promise<Note> {
  const res = await api.post<{ note: Note }>("/notes", input);
  return res.data.note;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await api.delete<{ note: Note }>(`/notes/${id}`);
  return res.data.note;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`);
  if (!res.data) {
    throw new Error("Note not found");
  }
  return res.data;
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://08-zustand-eight-lovat.vercel.app/";
export const OG_IMAGE =
  "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";
