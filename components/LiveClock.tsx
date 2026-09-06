"use client";

import { useEffect, useState } from "react";

const FORMAT = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Africa/Casablanca",
});

/** Local time in Rabat, ticking each minute. Renders empty on the server to avoid mismatches. */
export function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(FORMAT.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning aria-label="Local time in Rabat">
      Rabat {time ?? "--:--"}
    </span>
  );
}
