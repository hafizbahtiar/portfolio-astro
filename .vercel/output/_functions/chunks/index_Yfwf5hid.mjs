import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { D as DataTable } from './DataTable_CnzBX05U.mjs';
import { p as projectsService } from './projects_CfuewUuE.mjs';

const PoliciesTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isActiveRef = useRef(true);
  const loadPolicies = useCallback(async () => {
    setIsLoading(true);
    const projects = await projectsService.getAdminProjects();
    const rows = await Promise.all(
      projects.map(async (project) => {
        const policy = await projectsService.getAdminProjectPolicyById(project.id).catch(() => null);
        return {
          id: project.id,
          title: project.title,
          slug: project.slug,
          hasPrivacy: Boolean(policy?.privacyPolicy),
          hasTerms: Boolean(policy?.termsAndConditions),
          updatedAt: policy?.updatedAt ?? null
        };
      })
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
    const handlePageShow = (event) => {
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
  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString();
  };
  const badgeStyles = useMemo(
    () => ({
      privacy: "border-cyan-500/30 text-cyan-300 bg-cyan-500/10",
      terms: "border-purple-500/30 text-purple-300 bg-purple-500/10",
      inactive: "border-gray-700 text-gray-500 bg-gray-900/40"
    }),
    []
  );
  const columns = [
    {
      accessorKey: "title",
      header: "Project",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: row.original.title }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 font-mono", children: row.original.slug })
      ] })
    },
    {
      accessorKey: "hasPrivacy",
      header: "Privacy",
      cell: ({ row }) => /* @__PURE__ */ jsxs(
        "span",
        {
          className: `inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-mono border ${row.original.hasPrivacy ? badgeStyles.privacy : badgeStyles.inactive}`,
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `h-1.5 w-1.5 rounded-full ${row.original.hasPrivacy ? "bg-cyan-400" : "bg-gray-600"}`
              }
            ),
            "Privacy"
          ]
        }
      )
    },
    {
      accessorKey: "hasTerms",
      header: "Terms",
      cell: ({ row }) => /* @__PURE__ */ jsxs(
        "span",
        {
          className: `inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-mono border ${row.original.hasTerms ? badgeStyles.terms : badgeStyles.inactive}`,
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `h-1.5 w-1.5 rounded-full ${row.original.hasTerms ? "bg-purple-400" : "bg-gray-600"}`
              }
            ),
            "Terms"
          ]
        }
      )
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
      cell: ({ row }) => /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-mono", children: formatDate(row.original.updatedAt) })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const hasPolicy = row.original.hasPrivacy || row.original.hasTerms;
        const href = hasPolicy ? `/admin/policies/edit?id=${row.original.id}` : `/admin/policies/new?projectId=${row.original.id}`;
        return /* @__PURE__ */ jsx(
          "a",
          {
            href,
            className: "text-cyan-300 hover:text-cyan-200 font-mono text-xs uppercase tracking-wider",
            children: hasPolicy ? "Edit" : "Create"
          }
        );
      }
    }
  ];
  return /* @__PURE__ */ jsx(DataTable, { columns, data, isLoading });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "Project Policies" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex justify-between items-center"> <h1 class="text-3xl font-bold text-white tracking-tight" aria-label="Privacy Policies">
Privacy Policies
</h1> <a href="/admin/policies/new" class="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-mono text-sm transition-colors flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
NEW POLICY
</a> </div> ${renderComponent($$result2, "PoliciesTable", PoliciesTable, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/admin/policies/PoliciesTable", "client:component-export": "PoliciesTable" })} </div> ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/policies/index.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/policies/index.astro";
const $$url = "/admin/policies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
