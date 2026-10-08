// Source: https://www.great-ui.com/r/text-on-path-scroll.json (Great UI Custom License, see README).
// Ported: path id via useId (several instances can coexist), no custom scroll
// container (window scroll only), gray palette, decorative (aria-hidden), and
// static + short under prefers-reduced-motion (no sticky scroll section).
import React, { useId, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type SpringOptions,
} from "motion/react";
import { cn } from "@/lib/utils";

interface TextOnPathScrollProps {
  /** Text along the path. Long enough to cover the path end to end (repeat it). */
  text: string;
  /** Height of the scroll track, e.g. `h-[250dvh]`. */
  className?: string;
  textProps?: React.SVGProps<SVGTextElement>;
  /** startOffset at scroll start / end, in path units. */
  scrollOffsets?: [number | string, number | string];
  springOptions?: SpringOptions;
}

const PATH_D =
  "M0.257812 54.1707C0.257812 54.1707 332.27 258.365 829.258 194.671C1022.55 169.899 1292.6 78.4697 1536.76 21.6707C1804.19 -40.5439 2206.76 54.1714 2206.76 54.1714";

export default function TextOnPathScroll({
  text,
  className,
  textProps,
  scrollOffsets = [2500, -8000],
  springOptions = { stiffness: 50, damping: 20, restDelta: 0.001 },
}: TextOnPathScrollProps) {
  const pathId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, springOptions);
  const startOffset = useTransform(smoothProgress, [0, 1], scrollOffsets);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("relative w-full", reduced ? "py-16" : className)}
    >
      <div
        className={cn(
          "flex w-full items-center justify-center overflow-hidden",
          !reduced && "sticky top-0 h-screen",
        )}
      >
        <svg viewBox="0 0 2207 208" className="w-full overflow-visible">
          <path id={pathId} d={PATH_D} fill="none" />
          <text
            fill="currentColor"
            fontWeight="900"
            className="tracking-tighter text-gray-950 uppercase dark:text-white"
            fontSize="96"
            {...textProps}
          >
            <motion.textPath
              href={`#${pathId}`}
              startOffset={reduced ? 0 : startOffset}
            >
              {text}
            </motion.textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}

/**
 * Great UI Component - https://great-ui.com - https://github.com/Saurabh-2607/GreatUI
 * Released under the Great UI Custom License Agreement. Author: Saurabh Sharma.
 */
