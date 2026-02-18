import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable";
import { projectsService } from "../../../lib/projects";

interface PolicyRow {
  id: number;
  title: string;
  slug: string;
  hasPrivacy: boolean;
  hasTerms: boolean;
  updatedAt?: string | null;
}

export const PoliciesTable = () => {
  const [data, setData] = useState<PolicyRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isActiveRef = useRef(true);

  const loadPolicies = useCallback(async () => {
    setIsLoading(true);
    const projects = await projectsService.getAdminProjects();
    const rows = await Promise.all(
      projects.map(async (project) => {
        const policy = await projectsService
          .getAdminProjectPolicyById(project.id)
          .catch(() => null);
        return {
          id: project.id,
          title: project.title,
          slug: project.slug,
          hasPrivacy: Boolean(policy?.privacyPolicy),
          hasTerms: Boolean(policy?.termsAndConditions),
          updatedAt: policy?.updatedAt ?? null,
        };
      }),
    );
    if (!isActiveRef.current) return;
    setData(rows);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    isActiveRef.current = true;

    const runLoad = async () => {
      try {
        await loadPolicies();
      } catch (error) {
        if (!isActiveRef.current) return;
        console.error("Failed to load policies:", error);
        setIsLoading(false);
      }
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        runLoad();
      }
    };

    runLoad();
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      isActiveRef.current = false;
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [loadPolicies]);

  const formatDate = (value?: string | null) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString();
  };

  const badgeStyles = useMemo(
    () => ({
      privacy: "border-cyan-500/30 text-cyan-300 bg-cyan-500/10",
      terms: "border-purple-500/30 text-purple-300 bg-purple-500/10",
      inactive: "border-gray-700 text-gray-500 bg-gray-900/40",
    }),
    [],
  );

  const columns: ColumnDef<PolicyRow>[] = [
    {
      accessorKey: "title",
      header: "Project",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-white">{row.original.title}</span>
          <span className="text-xs text-gray-500 font-mono">
            {row.original.slug}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "hasPrivacy",
      header: "Privacy",
      cell: ({ row }) => (
        <span
          className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-mono border ${row.original.hasPrivacy ? badgeStyles.privacy : badgeStyles.inactive
            }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${row.original.hasPrivacy ? "bg-cyan-400" : "bg-gray-600"
              }`}
          ></span>
          Privacy
        </span>
      ),
    },
    {
      accessorKey: "hasTerms",
      header: "Terms",
      cell: ({ row }) => (
        <span
          className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-mono border ${row.original.hasTerms ? badgeStyles.terms : badgeStyles.inactive
            }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${row.original.hasTerms ? "bg-purple-400" : "bg-gray-600"
              }`}
          ></span>
          Terms
        </span>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
      cell: ({ row }) => (
        <span className="text-gray-400 font-mono">
          {formatDate(row.original.updatedAt)}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const hasPolicy = row.original.hasPrivacy || row.original.hasTerms;
        const href = hasPolicy
          ? `/admin/policies/edit?id=${row.original.id}`
          : `/admin/policies/new?projectId=${row.original.id}`;
        return (
          <a
            href={href}
            className="text-cyan-300 hover:text-cyan-200 font-mono text-xs uppercase tracking-wider"
          >
            {hasPolicy ? "Edit" : "Create"}
          </a>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};
