import React, { useEffect, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable";
import { blogService } from "../../../lib/blog";
import type { BlogPostSummary } from "../../../types/blog";

export const BlogPostsTable = () => {
  const [data, setData] = useState<BlogPostSummary[]>([]);
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

  const confirmDelete = async (post: BlogPostSummary) => {
    const modal = (window as Window & { confirmModal?: any }).confirmModal;
    if (modal?.show) {
      return modal.show({
        title: "Delete post",
        message: `Delete “${post.title}”? This action cannot be undone.`,
        confirmText: "Delete",
        cancelText: "Cancel",
        variant: "danger",
      });
    }
    return confirm("Are you sure you want to delete this post?");
  };

  const handleDelete = async (post: BlogPostSummary) => {
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

  const columns: ColumnDef<BlogPostSummary>[] = [
    {
      accessorKey: "title",
      header: "Title",
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const colorClass =
          status === "published"
            ? "bg-green-900/30 text-green-400 border border-green-900"
            : status === "draft"
              ? "bg-yellow-900/30 text-yellow-400 border border-yellow-900"
              : "bg-gray-800/60 text-gray-400 border border-gray-700";

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
          >
            {status ? status.toUpperCase() : "UNKNOWN"}
          </span>
        );
      },
    },
    {
      accessorKey: "publishedDate",
      header: "Published",
      cell: ({ row }) => (
        <span className="text-sm text-gray-300">
          {row.original.publishedDate || "—"}
        </span>
      ),
    },
    {
      accessorKey: "readTimeMinutes",
      header: "Read Time",
      cell: ({ row }) => (
        <span className="text-sm text-gray-300">
          {row.original.readTimeMinutes
            ? `${row.original.readTimeMinutes} min`
            : "—"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <a
            href={`/admin/blog/edit?id=${row.original.id}`}
            className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
            title="Edit Post"
            aria-label={`Edit ${row.original.title}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
          </a>
          <button
            onClick={() => handleDelete(row.original)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
            title="Delete Post"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};
