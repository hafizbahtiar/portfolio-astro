import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { D as DataTable } from './DataTable_CnzBX05U.mjs';
import { b as blogService } from './blog_CeEAnqkL.mjs';

const BlogPostsTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await blogService.getAdminPosts();
        setData(posts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);
  const confirmDelete = async (post) => {
    const modal = window.confirmModal;
    if (modal?.show) {
      return modal.show({
        title: "Delete post",
        message: `Delete “${post.title}”? This action cannot be undone.`,
        confirmText: "Delete",
        cancelText: "Cancel",
        variant: "danger"
      });
    }
    return confirm("Are you sure you want to delete this post?");
  };
  const handleDelete = async (post) => {
    if (!post.id) {
      alert("Missing blog post ID");
      return;
    }
    const shouldDelete = await confirmDelete(post);
    if (!shouldDelete) return;
    try {
      const success = await blogService.deletePost(post.id);
      if (success) {
        setData((prev) => prev.filter((item) => item.id !== post.id));
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete post");
    }
  };
  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: row.original.title }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 font-mono", children: row.original.slug })
      ] })
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        const colorClass = status === "published" ? "bg-green-900/30 text-green-400 border border-green-900" : status === "draft" ? "bg-yellow-900/30 text-yellow-400 border border-yellow-900" : "bg-gray-800/60 text-gray-400 border border-gray-700";
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`,
            children: status ? status.toUpperCase() : "UNKNOWN"
          }
        );
      }
    },
    {
      accessorKey: "publishedDate",
      header: "Published",
      cell: ({ row }) => /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: row.original.publishedDate || "—" })
    },
    {
      accessorKey: "readTimeMinutes",
      header: "Read Time",
      cell: ({ row }) => /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: row.original.readTimeMinutes ? `${row.original.readTimeMinutes} min` : "—" })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `/admin/blog/edit?id=${row.original.id}`,
            className: "p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors",
            title: "Edit Post",
            "aria-label": `Edit ${row.original.title}`,
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
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDelete(row.original),
            className: "p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors",
            title: "Delete Post",
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
                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  }
                )
              }
            )
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ jsx(DataTable, { columns, data, isLoading });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "Manage Blog Posts" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex justify-between items-center"> <h1 class="text-3xl font-bold text-white tracking-tight">Blog Posts</h1> <a href="/admin/blog/new" class="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-mono text-sm transition-colors flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
NEW POST
</a> </div> ${renderComponent($$result2, "BlogPostsTable", BlogPostsTable, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/admin/blog/BlogPostsTable", "client:component-export": "BlogPostsTable" })} </div> ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/blog/index.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/blog/index.astro";
const $$url = "/admin/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
