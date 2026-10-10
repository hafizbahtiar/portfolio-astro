import { lazy, Suspense, useEffect, useState } from "react";

// Lanyard (three.js, ~170KB gz) is decoration for the empty right side of the hero.
// Mounted client:only so three never enters the SSR bundle, and imported only on
// xl screens - phones and tablets never download it.
const Lanyard = lazy(() => import("../react-bits/lanyard"));
const WIDE = "(min-width: 1280px)";

export default function HeroLanyard() {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!wide) return null;
  return (
    <Suspense fallback={null}>
      <Lanyard frontImage="/lanyard/card.svg" strapColor="#0284c7" anchor="center" size={0.55} strapLength={0.45} />
    </Suspense>
  );
}
