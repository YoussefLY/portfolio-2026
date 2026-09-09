import type { ReactNode } from "react";

type Props = {
  /** Set when the surrounding section points at this heading with aria-labelledby. */
  id?: string;
  title: string;
  /** Right-hand micro-label: a date, a count, a link. */
  aside?: ReactNode;
  /** Use "span" where the block is decorative and already sits under a heading. */
  as?: "h2" | "h3" | "span";
  className?: string;
};

/** The ruled kicker row that opens every block on the site. */
export function SectionHeading({ id, title, aside, as: Tag = "h2", className }: Props) {
  return (
    <div className={className ? `section-head ${className}` : "section-head"}>
      <Tag id={id} className="kicker">
        {title}
      </Tag>
      {aside && <span className="kicker">{aside}</span>}
    </div>
  );
}
