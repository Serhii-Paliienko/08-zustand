import { TAGS } from "@/types/note";
import css from "./SidebarNotes.module.css";
import Link from "next/link";

const SidebarNotes = () => {
  const otherTags = TAGS.filter((tag) => tag !== "All");

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          prefetch={false}
          href="/notes/filter/All"
          className={css.menuLink}
        >
          All notes
        </Link>
      </li>
      {otherTags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            prefetch={false}
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
