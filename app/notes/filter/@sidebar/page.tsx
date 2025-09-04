import { TAGS } from "@/types/note";
import css from "./SidebarNotes.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarNotes = () => {
  const pathName = usePathname();
  if (pathName === "/notes/filter/All") return null;
  const otherTags = TAGS.filter((tag) => tag !== "All");
  const isActive = (href: string) => pathName === href;

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          prefetch={false}
          href="/notes/filter/All"
          className={css.menuLink}
          aria-current={isActive("/notes/filter/All") ? "page" : undefined}
        >
          All notes
        </Link>
      </li>
      {otherTags.map((tag) => {
        const href = `/notes/filter/${encodeURIComponent(tag)}`;
        return (
          <li key={tag} className={css.menuItem}>
            <Link
              prefetch={false}
              href={href}
              className={css.menuLink}
              aria-current={isActive(href) ? "page" : undefined}
            >
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNotes;
