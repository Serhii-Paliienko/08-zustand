"use client";

import { useEffect, useState } from "react";

interface Props {
  iso: string;
  dateStyle?: Intl.DateTimeFormatOptions["dateStyle"];
  timeStyle?: Intl.DateTimeFormatOptions["timeStyle"];
}

export default function ClientLocalTime({
  iso,
  dateStyle = "short",
  timeStyle = "medium",
}: Props) {
  const [text, setText] = useState<string>(() => {
    const d = new Date(iso);
    return d.toISOString().replace("T", " ").slice(0, 19) + "Z";
  });

  useEffect(() => {
    const s = new Intl.DateTimeFormat(undefined, {
      dateStyle,
      timeStyle,
    }).format(new Date(iso));
    setText(s);
  }, [iso, dateStyle, timeStyle]);

  return (
    <time dateTime={iso} suppressHydrationWarning>
      {text}
    </time>
  );
}
