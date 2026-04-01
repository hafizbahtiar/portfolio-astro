import React, { useEffect, useState } from "react";
import { getPublicFamilyTreeBySlug, getPublicFamilyTrees } from "../../lib/family";
import type { FamilyTree, FamilyTreeDetail } from "../../types/family";
import { FamilyTreeChart } from "./FamilyTreeChart";

export const PublicFamilyExplorer = () => {
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
        const preferred = result.find((t) => t.slug === "hafiz-family");
        setSelectedSlug(preferred?.slug || result[0]?.slug || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load public family trees.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

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

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-6 text-gray-400">
        Loading public family trees...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-300">
        {error}
      </div>
    );
  }

  if (trees.length === 0) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-6 text-gray-400">
        No public family trees available yet.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {isLoadingDetail ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-6 text-gray-400">
          Loading family details...
        </div>
      ) : !detail ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-6 text-gray-400">
          Family details unavailable.
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5">
            <h2 className="text-2xl font-semibold text-white">{detail.tree.name}</h2>
            <p className="mt-2 text-sm text-gray-400">
              {detail.tree.description || "No description provided."}
            </p>
          </div>

          <FamilyTreeChart detail={detail} currentSlug={detail.tree.slug} />
        </div>
      )}
    </div>
  );
};
