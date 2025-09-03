import type { Metadata } from "next";
import css from "./Home.module.css";
import { OG_IMAGE, SITE_URL } from "@/lib/api";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description:
    "The page you’re looking for does not exist. Explore NoteHub to find notes by tags or keywords.",
  openGraph: {
    title: "404 — Page not found",
    description:
      "This page does not exist. Return to NoteHub to browse your notes.",
    url: `${SITE_URL}/not-found`,
    images: [{ url: OG_IMAGE }],
  },
  alternates: { canonical: `${SITE_URL}/not-found` },
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
