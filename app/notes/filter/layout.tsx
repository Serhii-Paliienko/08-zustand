import type { ReactNode } from "react";
import css from "./LayoutNotes.module.css";
interface FilterLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

const FilterLayout = ({ children, sidebar }: FilterLayoutProps) => {
  return (
    <div className={css.container}>
      {sidebar ? <aside className={css.sidebar}>{sidebar}</aside> : null}
      <section className={css.notesWrapper}>{children}</section>
    </div>
  );
};

export default FilterLayout;
