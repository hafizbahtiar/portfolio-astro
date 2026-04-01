import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Chart, Data } from "family-chart";
import "family-chart/styles/family-chart.css";
import type { FamilyTreeDetail } from "../../types/family";
import { getPublicFamilyTreeBySlug, getPublicFamilyTrees, getPublicFamilyTreesByGlobalKey } from "../../lib/family";

interface FamilyTreeChartProps {
  detail: FamilyTreeDetail;
  currentSlug: string;
  useLabelOnly?: boolean;
  ancestryDepth?: number;
  progenyDepth?: number;
  showSiblings?: boolean;
  sortChildrenBy?: "label" | "metadata.birth_order";
  sortAscending?: boolean;
}

const mapGender = (gender: string): "M" | "F" => {
  if (gender === "female") return "F";
  return "M";
};

const splitDisplayName = (displayName: string) => {
  const parts = displayName.trim().split(/\s+/);
  if (parts.length <= 1) {
    return { firstName: displayName.trim(), lastName: "" };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
};

const buildChartData = (detail: FamilyTreeDetail): Data => {
  const personMap = new Map(
    detail.people.map((person) => [
      String(person.id),
      {
        id: String(person.id),
        data: {
          label: person.displayName,
          global_key: person.globalKey || undefined,
          metadata: person.metadata || null,
          "first name": (
            person.firstName ||
            splitDisplayName(person.displayName).firstName ||
            person.displayName
          ).trim(),
          "last name": (
            person.lastName ||
            splitDisplayName(person.displayName).lastName ||
            ""
          ).trim(),
          name: person.displayName,
          birthday: person.birthDate
            ? new Date(person.birthDate).getFullYear().toString()
            : undefined,
          death: person.deathDate
            ? new Date(person.deathDate).getFullYear().toString()
            : undefined,
          status: person.isLiving ? "Living" : "Deceased",
          living: person.isLiving,
          avatar: person.photoUrl || undefined,
          gender: mapGender(person.gender),
        },
        rels: {
          parents: [] as string[],
          spouses: [] as string[],
          children: [] as string[],
        },
      },
    ]),
  );

  for (const rel of detail.relationships) {
    const from = personMap.get(String(rel.personId));
    const to = personMap.get(String(rel.relatedPersonId));
    if (!from || !to) continue;

    if (rel.relationshipType === "spouse") {
      from.rels.spouses.push(to.id);
      to.rels.spouses.push(from.id);
      continue;
    }

    if (rel.relationshipType === "parent" || rel.relationshipType === "adoptive_parent") {
      from.rels.children.push(to.id);
      to.rels.parents.push(from.id);
      continue;
    }

    if (rel.relationshipType === "child" || rel.relationshipType === "adopted_child") {
      from.rels.parents.push(to.id);
      to.rels.children.push(from.id);
    }
  }

  for (const person of personMap.values()) {
    person.rels.parents = [...new Set(person.rels.parents)];
    person.rels.spouses = [...new Set(person.rels.spouses)];
    person.rels.children = [...new Set(person.rels.children)];
  }

  return Array.from(personMap.values());
};

export const FamilyTreeChart = ({ detail, currentSlug, useLabelOnly, ancestryDepth, progenyDepth, showSiblings, sortChildrenBy, sortAscending = true }: FamilyTreeChartProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const [selectedMainId, setSelectedMainId] = useState<string>("");
  const [selectedFamilySlug, setSelectedFamilySlug] = useState(currentSlug);
  const spacingRef = useRef<{ x: number; y: number }>({ x: 250, y: 150 });
  const dataRef = useRef<Data>([]);
  const baselineRef = useRef<Data>([]);
  const showSpousesRef = useRef<boolean>(true);
  const applySpouseFilter = (base: Data) => {
    if (showSpousesRef.current) return base;
    return base.map((node) => ({
      ...node,
      rels: {
        ...node.rels,
        spouses: [],
      },
    }));
  };
  const getSpouseOptions = (mainId: string) => {
    const byId = new Map<string, any>();
    for (const x of dataRef.current) byId.set(x.id, x);
    const me = byId.get(mainId);
    if (!me) return [];
    const ids: string[] = Array.isArray(me.rels?.spouses) ? me.rels.spouses : [];
    const opts = ids
      .map((sid) => byId.get(sid))
      .filter(Boolean)
      .map((node) => {
        const dd = node.data?.data ?? node.data ?? {};
        const lbl = dd.label || `${(dd["first name"] || "").trim()} ${(dd["last name"] || "").trim()}`.trim() || dd.name || "";
        return { id: node.id, label: String(lbl) };
      });
    return opts;
  };

  useEffect(() => {
    setSelectedFamilySlug(currentSlug);
  }, [currentSlug]);


  const chartData = useMemo(() => buildChartData(detail), [detail]);

  const applyZoom = (chart: Chart, level: number, treePosition: "fit" | "inherit" = "inherit") => {
    chart.updateTree({
      tree_position: treePosition,
      transition_time: 250,
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || chartData.length === 0) return;

    let destroyed = false;

    const render = async () => {
      const { createChart } = await import("family-chart");
      if (destroyed) return;

      container.innerHTML = "";

      const chart = createChart(container, chartData)
        .setTransitionTime(1000)
        .setCardXSpacing(250)
        .setCardYSpacing(150);
      spacingRef.current = { x: 250, y: 150 };

      chartRef.current = chart;
      baselineRef.current = chartData;
      dataRef.current = applySpouseFilter(chartData);
      (window as any).familyChartApi = {
        zoomIn: () => {
          const nx = Math.min(spacingRef.current.x + 20, 360);
          const ny = Math.min(spacingRef.current.y + 15, 240);
          spacingRef.current = { x: nx, y: ny };
          chart.setCardXSpacing(nx);
          chart.setCardYSpacing(ny);
          chart.updateTree({ tree_position: "inherit", transition_time: 250 });
        },
        zoomOut: () => {
          const nx = Math.max(spacingRef.current.x - 20, 140);
          const ny = Math.max(spacingRef.current.y - 15, 90);
          spacingRef.current = { x: nx, y: ny };
          chart.setCardXSpacing(nx);
          chart.setCardYSpacing(ny);
          chart.updateTree({ tree_position: "inherit", transition_time: 250 });
        },
        fit: () => {
          chart.updateTree({ tree_position: "fit", transition_time: 300 });
        },
        centerMain: () => {
          chart.updateTree({ tree_position: "main_to_middle", transition_time: 300 });
        },
        setOrientation: (vertical: boolean) => {
          if (vertical) chart.setOrientationVertical();
          else chart.setOrientationHorizontal();
          chart.updateTree({ tree_position: "fit", transition_time: 300 });
        },
        getSpousesOfMain: () => {
          return getSpouseOptions(selectedMainId);
        },
        setShowSpouses: (show: boolean) => {
          showSpousesRef.current = !!show;
          const out = applySpouseFilter(baselineRef.current);
          dataRef.current = out;
          chart.updateData(out);
          chart.updateTree({ tree_position: "inherit", transition_time: 250 });
          const spouseOptions = getSpouseOptions(selectedMainId);
          window.dispatchEvent(new CustomEvent("family:on-spouses", { detail: { options: spouseOptions } }));
        },
      };

      const card = chart.setCardHtml();
      if (useLabelOnly) {
        card.setCardDisplay([["label"]]);
        card.setCardDim({ h: 70 });
      } else {
        card.setCardDisplay([["first name", "last name"], ["birthday"]]);
      }
      chart.setDuplicateBranchToggle(true);
      if (typeof ancestryDepth === "number") {
        chart.setAncestryDepth(ancestryDepth);
      }
      if (typeof progenyDepth === "number") {
        chart.setProgenyDepth(progenyDepth);
      }
      if (typeof showSiblings === "boolean") {
        chart.setShowSiblingsOfMain(showSiblings);
      }
      if (sortChildrenBy) {
        chart.setSortChildrenFunction((a: any, b: any) => {
          const grab = (d: any) => {
            const dd = d?.data?.data ?? d?.data ?? {};
            if (sortChildrenBy === "metadata.birth_order") {
              const meta = dd.metadata;
              let order: number | null = null;
              if (typeof meta === "string") {
                try {
                  const parsed = JSON.parse(meta);
                  order = typeof parsed?.birth_order === "number" ? parsed.birth_order : null;
                } catch {
                  order = null;
                }
              } else if (meta && typeof meta === "object") {
                order = typeof meta.birth_order === "number" ? meta.birth_order : null;
              }
              if (order !== null) return order;
            }
            const label = (dd.label || `${(dd["first name"] || "").trim()} ${(dd["last name"] || "").trim()}`.trim()) || "";
            return label.toLowerCase();
          };
          const va = grab(a);
          const vb = grab(b);
          if (typeof va === "number" && typeof vb === "number") {
            return sortAscending ? va - vb : vb - va;
          }
          return sortAscending ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
        });
      }
      card.setOnCardClick(async (e: any, d: any) => {
        const id = d.data.id;
        const label = `${d.data["first name"] || ""} ${d.data["last name"] || ""}`.trim() || d.data.name || "";
        setSelectedMainId(id);
        chart.updateMainId(id);
        chart.updateTree({
          tree_position: "main_to_middle",
          transition_time: 350,
        });
        window.dispatchEvent(new CustomEvent("family:on-main-changed", { detail: { id, label } }));
        const spouseOptions = getSpouseOptions(id);
        window.dispatchEvent(new CustomEvent("family:on-spouses", { detail: { options: spouseOptions } }));
        const strictKey =
          (d.data.global_key && String(d.data.global_key).toLowerCase()) ||
          (d.data.metadata && (d.data.metadata as any).global_id && String((d.data.metadata as any).global_id).toLowerCase()) ||
          "";
        if (strictKey) {
          const treesByKey = await getPublicFamilyTreesByGlobalKey(strictKey);
          if (treesByKey.length > 0) {
            const details = await Promise.all(
              treesByKey.map(async (t) => {
                const det = await getPublicFamilyTreeBySlug(t.slug);
                return det ? { slug: t.slug, detail: det } : null;
              })
            );
            const candidates = (details.filter(Boolean) as Array<{ slug: string; detail: FamilyTreeDetail }>).filter(
              (x) => x.slug !== selectedFamilySlug
            );
            const scored = candidates
              .map((c) => {
                const me = c.detail.people.find((p) => {
                  const key =
                    (p.globalKey && p.globalKey.toLowerCase()) ||
                    ((p.metadata && (p.metadata as any).global_id && String((p.metadata as any).global_id).toLowerCase())) ||
                    "";
                  return key === strictKey;
                });
                const pid = me ? me.id : null;
                if (!pid) {
                  return { slug: c.slug, detail: c.detail, score: -1, parents: 0, children: 0, spouses: 0 };
                }
                const parents = c.detail.relationships.filter(
                  (r) => r.relationshipType === "parent" && r.relatedPersonId === pid
                ).length;
                const children = c.detail.relationships.filter(
                  (r) => r.relationshipType === "child" && r.relatedPersonId === pid
                ).length;
                const spouses = c.detail.relationships.filter(
                  (r) => r.relationshipType === "spouse" && (r.personId === pid || r.relatedPersonId === pid)
                ).length;
                const score = parents * 100 + children * 10 + spouses; // prioritize parents
                return { slug: c.slug, detail: c.detail, score, parents, children, spouses };
              })
              .sort((a, b) => b.score - a.score);
            const target = scored[0] || null;
            if (target) {
              const newData = buildChartData(target.detail);
              baselineRef.current = newData;
              const out = applySpouseFilter(newData);
              dataRef.current = out;
              chart.updateData(out);
              const person = target.detail.people.find((p) => {
                const key =
                  (p.globalKey && p.globalKey.toLowerCase()) ||
                  ((p.metadata && (p.metadata as any).global_id && String((p.metadata as any).global_id).toLowerCase())) ||
                  "";
                return key === strictKey;
              });
              const newMainId = person ? String(person.id) : newData[0]?.id || id;
              setSelectedMainId(newMainId);
              setSelectedFamilySlug(target.slug);
              chart.updateMainId(newMainId);
              chart.updateTree({ tree_position: "main_to_middle", transition_time: 350 });
            }
          }
        } else {
          const clickedLabel = String(d.data.label || d.data.name || "").toLowerCase();
          const trees = await getPublicFamilyTrees();
          const details = await Promise.all(
            trees.map(async (t) => {
              const det = await getPublicFamilyTreeBySlug(t.slug);
              return { slug: t.slug, detail: det };
            })
          );
          const candidates = details
            .filter((x) => {
              const det = x.detail;
              if (!det) return false;
              return det.people.some((p) => p.displayName.toLowerCase() === clickedLabel);
            })
            .filter((x) => x.slug !== selectedFamilySlug);
          const scored = candidates
            .map((c) => {
              const me = c.detail?.people.find((p) => p.displayName.toLowerCase() === clickedLabel);
              const pid = me ? me.id : null;
              if (!pid || !c.detail) {
                return { slug: c.slug, detail: c.detail!, score: -1, parents: 0, children: 0, spouses: 0 };
              }
              const parents = c.detail.relationships.filter(
                (r) => r.relationshipType === "parent" && r.relatedPersonId === pid
              ).length;
              const children = c.detail.relationships.filter(
                (r) => r.relationshipType === "child" && r.relatedPersonId === pid
              ).length;
              const spouses = c.detail.relationships.filter(
                (r) => r.relationshipType === "spouse" && (r.personId === pid || r.relatedPersonId === pid)
              ).length;
              const score = parents * 100 + children * 10 + spouses;
              return { slug: c.slug, detail: c.detail, score, parents, children, spouses };
            })
            .sort((a, b) => b.score - a.score);
          const target = scored[0] || null;
          if (target) {
            const newData = buildChartData(target.detail);
            baselineRef.current = newData;
            const out = applySpouseFilter(newData);
            dataRef.current = out;
            chart.updateData(out);
            const person = target.detail.people.find((p) => p.displayName.toLowerCase() === clickedLabel);
            const newMainId = person ? String(person.id) : newData[0]?.id || id;
            setSelectedMainId(newMainId);
            setSelectedFamilySlug(target.slug);
            chart.updateMainId(newMainId);
            chart.updateTree({ tree_position: "main_to_middle", transition_time: 350 });
            const spouseOptions2 = getSpouseOptions(newMainId);
            window.dispatchEvent(new CustomEvent("family:on-spouses", { detail: { options: spouseOptions2 } }));
          }
        }
      });
      chart.setOrientationVertical();
      chart.setTransitionTime(500);
      applyZoom(chart, 1, "fit");
      let initialMainId = chartData[0]?.id || "";
      const defaultId = (detail as any)?.tree?.defaultMainPersonId ?? null;
      if (defaultId) {
        const defNode = chartData.find((n) => n.id === String(defaultId));
        if (defNode) initialMainId = defNode.id;
      }
      setSelectedMainId(initialMainId);
      chart.updateMainId(initialMainId);
      chart.updateTree({
        initial: true,
        tree_position: "fit",
        transition_time: 500,
      });
      const initNode = chartData.find((n) => n.id === initialMainId);
      const initLabel = initNode ? ((initNode.data as any).label || (initNode.data as any).name || "") : "";
      window.dispatchEvent(new CustomEvent("family:on-main-changed", { detail: { id: initialMainId, label: initLabel } }));
      const spouseOptions0 = getSpouseOptions(initialMainId);
      window.dispatchEvent(new CustomEvent("family:on-spouses", { detail: { options: spouseOptions0 } }));
    };

    render().catch((error) => {
      console.error("Failed to render family chart:", error);
    });

    return () => {
      destroyed = true;
      chartRef.current = null;
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [chartData]);

  useEffect(() => {
    const onSetMain = (e: Event) => {
      const ce = e as CustomEvent<{ id: string }>;
      const id = ce.detail?.id;
      if (!id) return;
      const chart = chartRef.current;
      if (!chart) return;
      setSelectedMainId(id);
      chart.updateMainId(id);
      chart.updateTree({
        tree_position: "main_to_middle",
        transition_time: 350,
      });
      const spouseOptions = getSpouseOptions(id);
      window.dispatchEvent(new CustomEvent("family:on-spouses", { detail: { options: spouseOptions } }));
    };
    window.addEventListener("family:set-main", onSetMain as EventListener);
    return () => {
      window.removeEventListener("family:set-main", onSetMain as EventListener);
    };
  }, []);
  useEffect(() => {
    const onZoomIn = () => {
      const chart = chartRef.current;
      if (!chart) return;
      const nx = Math.min(spacingRef.current.x + 20, 360);
      const ny = Math.min(spacingRef.current.y + 15, 240);
      spacingRef.current = { x: nx, y: ny };
      chart.setCardXSpacing(nx);
      chart.setCardYSpacing(ny);
      chart.updateTree({ tree_position: "inherit", transition_time: 250 });
    };
    const onZoomOut = () => {
      const chart = chartRef.current;
      if (!chart) return;
      const nx = Math.max(spacingRef.current.x - 20, 140);
      const ny = Math.max(spacingRef.current.y - 15, 90);
      spacingRef.current = { x: nx, y: ny };
      chart.setCardXSpacing(nx);
      chart.setCardYSpacing(ny);
      chart.updateTree({ tree_position: "inherit", transition_time: 250 });
    };
    const onFit = () => {
      const chart = chartRef.current;
      if (!chart) return;
      chart.updateTree({ tree_position: "fit", transition_time: 300 });
    };
    const onCenterMain = () => {
      const chart = chartRef.current;
      if (!chart) return;
      chart.updateTree({ tree_position: "main_to_middle", transition_time: 300 });
    };
    const onOrientation = (e: Event) => {
      const ce = e as CustomEvent<{ vertical: boolean }>;
      const chart = chartRef.current;
      if (!chart) return;
      if (ce.detail?.vertical) {
        chart.setOrientationVertical();
      } else {
        chart.setOrientationHorizontal();
      }
      chart.updateTree({ tree_position: "fit", transition_time: 300 });
    };
    window.addEventListener("family:zoom-in", onZoomIn as EventListener);
    window.addEventListener("family:zoom-out", onZoomOut as EventListener);
    window.addEventListener("family:fit", onFit as EventListener);
    window.addEventListener("family:center-main", onCenterMain as EventListener);
    window.addEventListener("family:set-orientation", onOrientation as EventListener);
    return () => {
      window.removeEventListener("family:zoom-in", onZoomIn as EventListener);
      window.removeEventListener("family:zoom-out", onZoomOut as EventListener);
      window.removeEventListener("family:fit", onFit as EventListener);
      window.removeEventListener("family:center-main", onCenterMain as EventListener);
      window.removeEventListener("family:set-orientation", onOrientation as EventListener);
    };
  }, []);



  if (chartData.length === 0) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5 text-sm text-gray-400">
        No people available to render chart.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-3 text-cyan-200">
      <div ref={containerRef} className="f3 h-[720px] w-full overflow-hidden" />
    </div>
  );
};
