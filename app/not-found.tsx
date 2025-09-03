import type { Metadata } from "next";
import css from "./page.module.css";
import { OG_IMAGE, SITE_URL } from "@/lib/api";

export const metadata: Metadata = {
  title: "404 — Page not found | NoteHub",
  description: "Requested page does not exist in NoteHub.",
  openGraph: {
    title: "404 — Page not found | NoteHub",
    description: "Requested page does not exist in NoteHub.",
    url: `${SITE_URL}/not-found`,
    images: [{ url: OG_IMAGE }],
  },
};

const NotFoundPage = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
