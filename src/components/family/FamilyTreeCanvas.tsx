import React, { useCallback } from "react";
import type { Data } from "family-chart";
import {
  useFamilyChart,
  type FamilyChartApi,
} from "../../hooks/useFamilyChart";

interface Props {
  data: Data;
  mainId: string | null;
  ancestryDepth?: number;
  progenyDepth?: number;
  onSelect: (id: string) => void;
  apiRefOut: React.MutableRefObject<FamilyChartApi | null>;
}

export const FamilyTreeCanvas = ({
  data,
  mainId,
  ancestryDepth,
  progenyDepth,
  onSelect,
  apiRefOut,
}: Props) => {
  const handleApiReady = useCallback(
    (api: FamilyChartApi | null) => {
      apiRefOut.current = api;
    },
    [apiRefOut],
  );

  const { containerRef } = useFamilyChart({
    data,
    mainId,
    ancestryDepth,
    progenyDepth,
    onSelect,
    onApiReady: handleApiReady,
  });

  return (
    <div
      role="application"
      aria-label="Interactive family tree. Drag to pan, scroll or pinch to zoom. Use the List view for keyboard access."
      className="h-full w-full overflow-hidden rounded-xl border border-slate-200 bg-family-canvas dark:border-slate-700"
    >
      <div ref={containerRef} className="f3 h-full w-full" />
    </div>
  );
};
