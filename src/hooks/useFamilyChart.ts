import { useEffect, useRef } from "react";
import type { Chart, Data } from "family-chart";
import "family-chart/styles/family-chart.css";
import { cardText } from "../lib/chart-data";

export interface FamilyChartApi {
  zoomIn: () => void;
  zoomOut: () => void;
  fit: () => void;
  resetView: () => void;
  centerMain: () => void;
  setOrientation: (vertical: boolean) => void;
}

interface Options {
  data: Data;
  mainId: string | null;
  ancestryDepth?: number;
  progenyDepth?: number;
  /** "fit" (default) shows the whole tree; "center" opens on the main person at 1:1. */
  initialView?: "fit" | "center";
  onSelect?: (id: string) => void;
  onApiReady?: (api: FamilyChartApi | null) => void;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useFamilyChart({
  data,
  mainId,
  ancestryDepth,
  progenyDepth,
  initialView = "fit",
  onSelect,
  onApiReady,
}: Options) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const mainIdRef = useRef(mainId);
  const onSelectRef = useRef(onSelect);
  const onApiReadyRef = useRef(onApiReady);

  useEffect(() => {
    mainIdRef.current = mainId;
  }, [mainId]);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    onApiReadyRef.current = onApiReady;
  }, [onApiReady]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || data.length === 0 || chartRef.current) return;

    let destroyed = false;
    const transitionTime = prefersReducedMotion() ? 0 : 300;

    (async () => {
      const f3 = await import("family-chart");
      if (destroyed || !containerRef.current) return;

      container.innerHTML = "";
      const chart = f3
        .createChart(container, data)
        .setTransitionTime(transitionTime)
        .setCardXSpacing(250)
        .setCardYSpacing(150)
        .setShowSiblingsOfMain(true)
        .setDuplicateBranchToggle(true)
        .setSingleParentEmptyCard(false);

      if (typeof ancestryDepth === "number") {
        chart.setAncestryDepth(ancestryDepth);
      }
      if (typeof progenyDepth === "number") {
        chart.setProgenyDepth(progenyDepth);
      }

      const card = chart.setCardHtml();
      card.setStyle("imageCircleRect");
      card.setCardImageField("avatar");
      card.setCardDisplay([cardText("label"), cardText("birthday")]);
      card.setCardDim({ h: 80, w: 220 });
      card.setOnHoverPathToMain();
      card.setOnCardClick((_event: MouseEvent, datum: any) => {
        const id = String(datum?.id ?? datum?.data?.id ?? "");
        if (!id) return;
        onSelectRef.current?.(id);
      });

      chartRef.current = chart;
      const api: FamilyChartApi = {
        zoomIn: () =>
          f3.handlers.manualZoom({
            amount: 1.25,
            svg: chart.svg,
            transition_time: transitionTime,
          }),
        zoomOut: () =>
          f3.handlers.manualZoom({
            amount: 0.8,
            svg: chart.svg,
            transition_time: transitionTime,
          }),
        fit: () =>
          chart.updateTree({
            tree_position: "fit",
            transition_time: transitionTime,
          }),
        resetView: () => {
          f3.handlers.zoomTo(chart.svg, 1);
          chart.updateTree({
            tree_position: "fit",
            transition_time: transitionTime,
          });
        },
        centerMain: () =>
          chart.updateTree({
            tree_position: "main_to_middle",
            transition_time: transitionTime,
          }),
        setOrientation: (vertical) => {
          if (vertical) chart.setOrientationVertical();
          else chart.setOrientationHorizontal();
          chart.updateTree({
            tree_position: "fit",
            transition_time: transitionTime,
          });
        },
      };
      onApiReadyRef.current?.(api);

      chart.setOrientationVertical();
      if (mainIdRef.current) chart.updateMainId(mainIdRef.current);
      chart.updateTree(
        initialView === "center"
          ? {
            initial: false,
            tree_position: "main_to_middle",
            scale: 1,
            transition_time: transitionTime,
          }
          : {
            initial: true,
            tree_position: "fit",
            transition_time: transitionTime,
          },
      );
    })().catch((error) => {
      console.error("Failed to initialize family chart:", error);
    });

    return () => {
      destroyed = true;
      chartRef.current = null;
      onApiReadyRef.current?.(null);
      if (container) container.innerHTML = "";
    };
  }, [ancestryDepth, data, initialView, progenyDepth]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !mainId) return;
    const transitionTime = prefersReducedMotion() ? 0 : 300;
    chart.updateMainId(mainId);
    chart.updateTree({
      tree_position: "main_to_middle",
      transition_time: transitionTime,
    });
  }, [mainId]);

  return { containerRef };
}
