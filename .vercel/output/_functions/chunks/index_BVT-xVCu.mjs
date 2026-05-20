import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';
import { D as DataTable } from './DataTable_CnzBX05U.mjs';
import { f as familyService } from './family_C_CDot2R.mjs';

const FamilyTreesTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadTrees = async () => {
      try {
        const trees = await familyService.getAdminTrees();
        setData(trees);
      } catch (error) {
        console.error("Failed to load family trees:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTrees();
  }, []);
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Family Tree",
        cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: row.original.name }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono text-cyan-300", children: [
            "/",
            row.original.slug
          ] })
        ] })
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: row.original.description || "No description yet." })
      },
      {
        accessorKey: "isPublic",
        header: "Visibility",
        cell: ({ row }) => /* @__PURE__ */ jsx(
          "span",
          {
            className: `rounded-full px-2.5 py-1 text-[11px] font-semibold ${row.original.isPublic ? "bg-emerald-500/10 text-emerald-300" : "bg-gray-700/60 text-gray-300"}`,
            children: row.original.isPublic ? "PUBLIC" : "PRIVATE"
          }
        )
      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ row }) => /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-gray-300", children: new Date(row.original.updatedAt).toLocaleDateString() })
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: `/admin/family/edit?id=${row.original.id}`,
            className: "p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors",
            title: "Open Builder",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  }
                )
              }
            )
          }
        ) })
      }
    ],
    []
  );
  return /* @__PURE__ */ jsx(DataTable, { columns, data, isLoading });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "Manage Family Trees" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex justify-between items-center"> <h1 class="text-3xl font-bold text-white tracking-tight">Family Trees</h1> <a href="/admin/family/new" class="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-mono text-sm transition-colors flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
NEW FAMILY TREE
</a> </div> ${renderComponent($$result2, "FamilyTreesTable", FamilyTreesTable, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/admin/family/FamilyTreesTable", "client:component-export": "FamilyTreesTable" })} </div> ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/family/index.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/family/index.astro";
const $$url = "/admin/family";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
