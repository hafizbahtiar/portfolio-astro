import React, { useEffect, useState } from "react";
import { getPublicFamilyTreeBySlug, getPublicFamilyTrees } from "../../lib/family";
import type { FamilyTree, FamilyTreeDetail } from "../../types/family";
import { FamilyTreeChart } from "./FamilyTreeChart";

interface Props {
  initialSlug?: string;
  minimal?: boolean;
}

export const PublicFamilyExplorer = ({ initialSlug, minimal }: Props) => {
  const [trees, setTrees] = useState<FamilyTree[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [detail, setDetail] = useState<FamilyTreeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getPublicFamilyTrees();
        setTrees(result);
        const preferred = initialSlug
          ? result.find((t) => t.slug === initialSlug)
          : result.find((t) => t.slug === "hafiz-family");
        setSelectedSlug(preferred?.slug || initialSlug || result[0]?.slug || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load public family trees.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [initialSlug]);

  useEffect(() => {
    if (!selectedSlug) {
      setDetail(null);
      return;
    }

    const loadDetail = async () => {
      setIsLoadingDetail(true);
      setError(null);
      try {
        const result = await getPublicFamilyTreeBySlug(selectedSlug);
        setDetail(result);
      } catch (err) {
        console.error(err);
        setError("Failed to load selected family tree.");
      } finally {
        setIsLoadingDetail(false);
      }
    };

    loadDetail();
  }, [selectedSlug]);

  const loadingEl = (
    <div className="h-full w-full min-h-[320px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-6 text-slate-500 dark:text-slate-400">
      Loading family trees...
    </div>
  );

  if (isLoading) return loadingEl;

  if (error) {
    return (
      <div className="h-full w-full min-h-[320px] rounded-xl border border-red-500/40 bg-red-500/10 flex items-center justify-center p-6 text-red-300">
        {error}
      </div>
    );
  }

  if (trees.length === 0) {
    return (
      <div className="h-full w-full min-h-[320px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-6 text-slate-500 dark:text-slate-400">
        No public family trees available yet.
      </div>
    );
  }

  if (isLoadingDetail) return loadingEl;

  if (!detail) {
    return (
      <div className="h-full w-full min-h-[320px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-6 text-slate-500 dark:text-slate-400">
        Family details unavailable.
      </div>
    );
  }

  if (minimal) {
    return <FamilyTreeChart detail={detail} currentSlug={detail.tree.slug} />;
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{detail.tree.name}</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {detail.tree.description || "No description provided."}
        </p>
      </div>
      <div className="h-[580px]">
        <FamilyTreeChart detail={detail} currentSlug={detail.tree.slug} />
      </div>
    </div>
  );
};
