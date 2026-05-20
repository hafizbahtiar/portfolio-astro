import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';
import { D as DataTable } from './DataTable_CnzBX05U.mjs';
import { A as ApiClient } from './api-client_BtW8nPY3.mjs';

const API_BASE_URL = "http://localhost:8787/api/v1";
class ContactService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }
  async submitContactForm(data) {
    try {
      const url = `${this.baseUrl}/contact`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        return {
          success: true,
          message: result.data?.message || "Message sent successfully!"
        };
      } else {
        return {
          success: false,
          error: result.error || result.message || "Failed to send message."
        };
      }
    } catch (error) {
      console.error("Contact submission error:", error);
      return {
        success: false,
        error: "Network error. Please try again later."
      };
    }
  }
  async getOwnerContacts() {
    const result = await this.get("owner/contact");
    return result || [];
  }
  async getContactStats() {
    return this.get("owner/contact/stats");
  }
}
const contactService = new ContactService();

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
};
const truncate = (value, length) => {
  if (value.length <= length) return value;
  return `${value.slice(0, length).trim()}...`;
};
const ContactsTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(
    null
  );
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const contacts = await contactService.getOwnerContacts();
        setData(contacts);
      } catch (error) {
        console.error("Failed to load contacts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadContacts();
  }, []);
  const statusStyles = useMemo(
    () => ({
      NEW: "bg-cyan-900/30 text-cyan-300 border border-cyan-800",
      READ: "bg-blue-900/30 text-blue-300 border border-blue-800",
      REPLIED: "bg-green-900/30 text-green-300 border border-green-800",
      ARCHIVED: "bg-gray-800/60 text-gray-300 border border-gray-700"
    }),
    []
  );
  const columns = [
    {
      accessorKey: "name",
      header: "Sender",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: row.original.name }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 font-mono", children: row.original.email })
      ] })
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-200", children: row.original.subject }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 font-mono", children: truncate(row.original.message, 80) })
      ] })
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => /* @__PURE__ */ jsx(
        "span",
        {
          className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[row.original.status]}`,
          children: row.original.status
        }
      )
    },
    {
      accessorKey: "createdAt",
      header: "Received",
      cell: ({ row }) => /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-mono", children: formatDate(row.original.createdAt) })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setSelectedContact(row.original),
          className: "px-3 py-1.5 text-xs font-mono text-cyan-300 border border-cyan-500/40 rounded-lg hover:bg-cyan-500/10 transition-colors",
          children: "VIEW"
        }
      )
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DataTable, { columns, data, isLoading }),
    selectedContact && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Close modal",
          className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
          onClick: () => setSelectedContact(null)
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-3xl rounded-2xl border border-white/10 bg-gray-900/95 shadow-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-white/10", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-cyan-400 font-mono uppercase", children: "Contact Details" }),
            /* @__PURE__ */ jsx("h2", { className: "text-lg md:text-xl font-semibold text-white", children: selectedContact.subject })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedContact(null),
              className: "text-gray-400 hover:text-white transition-colors",
              "aria-label": "Close contact details",
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "h-5 w-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M6 18L18 6M6 6l12 12"
                    }
                  )
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-h-[75vh] overflow-y-auto px-6 py-5 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-mono", children: "FROM" }),
              /* @__PURE__ */ jsx("p", { className: "text-white", children: selectedContact.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 font-mono", children: selectedContact.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-mono", children: "STATUS" }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `inline-flex w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[selectedContact.status]}`,
                  children: selectedContact.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-mono", children: "PHONE" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: selectedContact.phone || "—" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-mono", children: "RECEIVED" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300 font-mono", children: formatDate(selectedContact.createdAt) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-mono", children: "MESSAGE" }),
            /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-white/10 bg-gray-900/70 p-4 text-sm text-gray-200 leading-relaxed whitespace-pre-line", children: selectedContact.message })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "px-4 py-2 text-sm font-mono text-gray-300 border border-gray-700 rounded-lg hover:text-white hover:border-gray-500 transition-colors",
            onClick: () => setSelectedContact(null),
            children: "CLOSE"
          }
        ) })
      ] })
    ] })
  ] });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "Contact Inbox" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex items-center justify-between"> <div class="space-y-1"> <h1 class="text-3xl font-bold text-white tracking-tight">Contact Me</h1> <p class="text-sm text-gray-400 font-mono">
Latest messages from visitors
</p> </div> </div> ${renderComponent($$result2, "ContactsTable", ContactsTable, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/admin/contact/ContactsTable", "client:component-export": "ContactsTable" })} </div> ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/contact/index.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/contact/index.astro";
const $$url = "/admin/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
