import { c as createComponent } from './astro-component_BCrB7690.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead, c as addAttribute } from './entrypoint_DePlxNSC.mjs';
import { r as renderScript } from './api-client_CjQRNt0G.mjs';
import { g as getProjectBySlug, a as getProjectPolicyBySlug, $ as $$ProjectLayout, j as jomDapur, b as jdManagement, i as invois } from './invois_B07trsXQ.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useMemo, useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { marked } from 'marked';
import { $ as $$Image } from './_astro_assets_CWw_eLxF.mjs';

const TextEditor = ({
  content,
  editable = true,
  showToolbar = true,
  name,
  id
}) => {
  const html = useMemo(() => String(marked.parse(content || "")), [content]);
  const [formValue, setFormValue] = useState(html);
  const textareaRef = useRef(null);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4]
        }
      }),
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-blue-300 underline underline-offset-4"
        }
      })
    ],
    content: html,
    editable,
    onUpdate: ({ editor: editor2 }) => {
      if (!name) return;
      setFormValue(editor2.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-lg max-w-none text-gray-200 leading-relaxed focus:outline-none min-h-[220px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[320px] prose-headings:text-white prose-strong:text-white prose-a:text-blue-300 prose-a:font-medium prose-a:no-underline prose-a:hover:text-blue-200 prose-code:text-blue-300 prose-code:bg-gray-950/70 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-950/70 prose-pre:border prose-pre:border-blue-500/30 prose-pre:shadow-[inset_0_0_0_1px_rgba(59,130,246,0.12)] prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:font-mono prose-blockquote:border-blue-500/40 prose-blockquote:text-gray-300 prose-hr:border-gray-800"
      }
    }
  });
  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(html);
    if (name) {
      setFormValue(html);
    }
  }, [editor, html]);
  useEffect(() => {
    if (!editor || !textareaRef.current || !name) return;
    const textarea = textareaRef.current;
    const handleChange = () => {
      const nextValue = textarea.value;
      if (nextValue === formValue) return;
      setFormValue(nextValue);
      editor.commands.setContent(
        String(marked.parse(nextValue || ""))
      );
    };
    textarea.addEventListener("change", handleChange);
    return () => {
      textarea.removeEventListener("change", handleChange);
    };
  }, [editor, formValue, name]);
  if (!editor) return null;
  const iconButtonClass = "h-8 w-8 sm:h-9 sm:w-9 grid place-items-center rounded-md border transition-colors";
  const wideButtonClass = "h-8 w-10 sm:h-9 sm:w-11 grid place-items-center rounded-md border transition-colors";
  const activeClass = "text-white border-blue-400/60 bg-blue-500/20";
  const inactiveClass = "text-gray-400 border-gray-800 hover:text-white hover:border-blue-500/40";
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-blue-500/20 bg-gray-950/60 shadow-[0_0_32px_rgba(59,130,246,0.08)] overflow-hidden", children: [
    name && /* @__PURE__ */ jsx(
      "textarea",
      {
        ref: textareaRef,
        id,
        name,
        className: "sr-only",
        value: formValue,
        readOnly: true
      }
    ),
    showToolbar && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 border-b border-blue-500/20 bg-gray-950/80 px-2 sm:px-3 py-2 overflow-x-auto", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Bold",
          className: `${iconButtonClass} ${editor.isActive("bold") ? activeClass : inactiveClass}`,
          onClick: () => editor.chain().focus().toggleBold().run(),
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M7 5h7a3 3 0 0 1 0 6H7z" }),
                /* @__PURE__ */ jsx("path", { d: "M7 11h8a3 3 0 0 1 0 6H7z" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Italic",
          className: `${iconButtonClass} ${editor.isActive("italic") ? activeClass : inactiveClass}`,
          onClick: () => editor.chain().focus().toggleItalic().run(),
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M11 5h6" }),
                /* @__PURE__ */ jsx("path", { d: "M7 19h6" }),
                /* @__PURE__ */ jsx("path", { d: "M14 5l-4 14" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Underline",
          className: `${iconButtonClass} ${editor.isActive("underline") ? activeClass : inactiveClass}`,
          onClick: () => editor.chain().focus().toggleUnderline().run(),
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M7 5v6a5 5 0 0 0 10 0V5" }),
                /* @__PURE__ */ jsx("path", { d: "M5 19h14" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Strikethrough",
          className: `${iconButtonClass} ${editor.isActive("strike") ? activeClass : inactiveClass}`,
          onClick: () => editor.chain().focus().toggleStrike().run(),
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M16 6a4 4 0 0 0-8 0c0 3 8 2 8 6a4 4 0 0 1-8 0" }),
                /* @__PURE__ */ jsx("path", { d: "M4 12h16" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Inline code",
          className: `${iconButtonClass} ${editor.isActive("code") ? activeClass : inactiveClass}`,
          onClick: () => editor.chain().focus().toggleCode().run(),
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M8 8l-4 4 4 4" }),
                /* @__PURE__ */ jsx("path", { d: "M16 8l4 4-4 4" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "h-6 w-px bg-gray-800" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Heading 2",
          className: `${wideButtonClass} ${editor.isActive("heading", { level: 2 }) ? activeClass : inactiveClass}`,
          onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold tracking-wide", children: "H2" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Heading 3",
          className: `${wideButtonClass} ${editor.isActive("heading", { level: 3 }) ? activeClass : inactiveClass}`,
          onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold tracking-wide", children: "H3" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Bullet list",
          className: `${iconButtonClass} ${editor.isActive("bulletList") ? activeClass : inactiveClass}`,
          onClick: () => editor.chain().focus().toggleBulletList().run(),
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M8 6h12" }),
                /* @__PURE__ */ jsx("path", { d: "M8 12h12" }),
                /* @__PURE__ */ jsx("path", { d: "M8 18h12" }),
                /* @__PURE__ */ jsx("circle", { cx: "4", cy: "6", r: "1" }),
                /* @__PURE__ */ jsx("circle", { cx: "4", cy: "12", r: "1" }),
                /* @__PURE__ */ jsx("circle", { cx: "4", cy: "18", r: "1" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Numbered list",
          className: `${iconButtonClass} ${editor.isActive("orderedList") ? activeClass : inactiveClass}`,
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M8 6h12" }),
                /* @__PURE__ */ jsx("path", { d: "M8 12h12" }),
                /* @__PURE__ */ jsx("path", { d: "M8 18h12" }),
                /* @__PURE__ */ jsx("path", { d: "M4 6h1" }),
                /* @__PURE__ */ jsx("path", { d: "M4 12h1" }),
                /* @__PURE__ */ jsx("path", { d: "M4 18h1" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Quote",
          className: `${iconButtonClass} ${editor.isActive("blockquote") ? activeClass : inactiveClass}`,
          onClick: () => editor.chain().focus().toggleBlockquote().run(),
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M10 6H6v6h4V6z" }),
                /* @__PURE__ */ jsx("path", { d: "M18 6h-4v6h4V6z" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Horizontal rule",
          className: `${iconButtonClass} ${inactiveClass}`,
          onClick: () => editor.chain().focus().setHorizontalRule().run(),
          children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: /* @__PURE__ */ jsx("path", { d: "M4 12h16" })
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Code block",
          className: `${iconButtonClass} ${editor.isActive("codeBlock") ? activeClass : inactiveClass}`,
          onClick: () => editor.chain().focus().toggleCodeBlock().run(),
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M8 6l-4 6 4 6" }),
                /* @__PURE__ */ jsx("path", { d: "M16 6l4 6-4 6" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Link",
          className: `${iconButtonClass} ${editor.isActive("link") ? activeClass : inactiveClass}`,
          onClick: () => {
            const previousUrl = editor.getAttributes("link").href;
            const url = window.prompt(
              "Enter URL",
              previousUrl || ""
            );
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              return;
            }
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          },
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M10 13a5 5 0 0 1 0-7l2-2a5 5 0 0 1 7 7l-2 2" }),
                /* @__PURE__ */ jsx("path", { d: "M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 1 1-7-7l2-2" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "h-6 w-px bg-gray-800" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Undo",
          className: `${iconButtonClass} ${inactiveClass} disabled:opacity-40`,
          onClick: () => editor.chain().focus().undo().run(),
          disabled: !editor.can().undo(),
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M9 10H4l4-4" }),
                /* @__PURE__ */ jsx("path", { d: "M4 10h9a7 7 0 1 1 0 14" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Redo",
          className: `${iconButtonClass} ${inactiveClass} disabled:opacity-40`,
          onClick: () => editor.chain().focus().redo().run(),
          disabled: !editor.can().redo(),
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M15 10h5l-4-4" }),
                /* @__PURE__ */ jsx("path", { d: "M20 10h-9a7 7 0 1 0 0 14" })
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-4 md:p-6", children: /* @__PURE__ */ jsx(EditorContent, { editor }) })
  ] });
};

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const slug = Astro2.params.slug ?? "";
  const project = slug ? await getProjectBySlug(slug).catch(() => null) : null;
  if (!project) return Astro2.redirect("/404");
  const localImageMap = /* @__PURE__ */ new Map([
    ["/images/projects/jom-dapur.jpg", jomDapur],
    ["/images/projects/jd-management.png", jdManagement],
    ["/images/projects/invois/invois.png", invois]
  ]);
  const resolvedImage = localImageMap.get(project.imageUrl) ?? project.imageUrl ?? void 0;
  const isResolvedString = typeof resolvedImage === "string";
  const resolvedImageUrl = isResolvedString ? resolvedImage : void 0;
  const resolvedImageMeta = isResolvedString ? void 0 : resolvedImage;
  const formatStatus = (status) => {
    if (!status) return "Completed";
    return status.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };
  const technologies = project.technologies && project.technologies.length > 0 ? project.technologies : project.tags || [];
  const metaTags = [
    project.role,
    project.year?.toString(),
    project.projectType ? project.projectType.charAt(0).toUpperCase() + project.projectType.slice(1) : null,
    formatStatus(project.status)
  ].filter(Boolean);
  let policy = null;
  try {
    policy = await getProjectPolicyBySlug(project.slug);
  } catch {
  }
  const hasPolicy = Boolean(policy?.privacyPolicy || policy?.termsAndConditions);
  const showBanner = resolvedImage && (!project.imageVariant || project.imageVariant === "banner" || project.imageVariant === "width-banner");
  const showLogo = project.imageVariant === "logo" && resolvedImage;
  return renderTemplate`${renderComponent($$result, "ProjectLayout", $$ProjectLayout, { "title": `${project.title} - Hafiz Bahtiar`, "description": project.description, "data-astro-cid-ypiea6ip": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<a href="/projects" data-astro-reload class="inline-flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-6 group" data-astro-cid-ypiea6ip> <svg class="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ypiea6ip> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-ypiea6ip></path> </svg>
Back to Projects
</a>  <div class="mb-6" data-astro-cid-ypiea6ip> <h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 leading-snug" data-astro-cid-ypiea6ip> ${project.title} </h1> <p class="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-2 leading-relaxed max-w-2xl" data-astro-cid-ypiea6ip> ${project.description} </p> <div class="flex flex-wrap gap-2 mt-4" data-astro-cid-ypiea6ip> ${metaTags.map((tag) => renderTemplate`<span class="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md px-2.5 py-1" data-astro-cid-ypiea6ip> ${tag} </span>`)} </div> <div class="flex flex-wrap gap-3 mt-4" data-astro-cid-ypiea6ip> ${project.githubUrl && renderTemplate`<a${addAttribute(project.githubUrl, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors" data-astro-cid-ypiea6ip> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-ypiea6ip> <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" data-astro-cid-ypiea6ip></path> </svg>
Source Code
</a>`} ${project.liveUrl && renderTemplate`<a${addAttribute(project.liveUrl, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:border-blue-300 transition-colors" data-astro-cid-ypiea6ip>
Live Demo
<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ypiea6ip> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-astro-cid-ypiea6ip></path> </svg> </a>`} </div> </div>  ${showBanner && renderTemplate`<div class="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-6 bg-white dark:bg-slate-800" data-astro-cid-ypiea6ip> ${resolvedImageUrl ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": resolvedImageUrl, "alt": project.title, "width": 794, "height": 360, "loading": "eager", "decoding": "async", "class": "w-full h-44 sm:h-60 object-contain", "data-astro-cid-ypiea6ip": true })}` : renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": resolvedImageMeta, "alt": project.title, "width": 794, "height": 360, "loading": "eager", "decoding": "async", "class": "w-full h-44 sm:h-60 object-contain", "data-astro-cid-ypiea6ip": true })}`} </div>`}${showLogo && renderTemplate`<div class="flex justify-center mb-6 p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" data-astro-cid-ypiea6ip> ${resolvedImageUrl ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": resolvedImageUrl, "alt": `${project.title} logo`, "width": 80, "height": 80, "loading": "eager", "class": "h-20 w-auto", "data-astro-cid-ypiea6ip": true })}` : renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": resolvedImageMeta, "alt": `${project.title} logo`, "width": 80, "height": 80, "loading": "eager", "class": "h-20 w-auto", "data-astro-cid-ypiea6ip": true })}`} </div>`} <div class="border-b border-slate-200 dark:border-slate-700 mb-6" data-astro-cid-ypiea6ip> <div class="flex -mb-px overflow-x-auto" data-astro-cid-ypiea6ip> <button class="tab-btn is-active shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 border-blue-500 transition-colors" data-tab="overview" data-astro-cid-ypiea6ip>
Overview
</button> <button class="tab-btn shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 border-transparent transition-colors" data-tab="case-study" data-astro-cid-ypiea6ip>
Case Study
</button> <button class="tab-btn shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 border-transparent transition-colors" data-tab="tech-stack" data-astro-cid-ypiea6ip>
Tech Stack
</button> </div> </div>  <div id="overview" class="tab-content" data-astro-cid-ypiea6ip> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8" data-astro-cid-ypiea6ip> <div class="lg:col-span-2 space-y-6" data-astro-cid-ypiea6ip> <div data-astro-cid-ypiea6ip> <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2" data-astro-cid-ypiea6ip>
About this project
</h2> <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed" data-astro-cid-ypiea6ip> ${project.description} </p> </div> ${project.features && project.features.length > 0 && renderTemplate`<div data-astro-cid-ypiea6ip> <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3" data-astro-cid-ypiea6ip>
Features
</h2> <ul class="space-y-2" data-astro-cid-ypiea6ip> ${project.features.map((feature) => renderTemplate`<li class="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400" data-astro-cid-ypiea6ip> <svg class="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ypiea6ip> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-astro-cid-ypiea6ip></path> </svg> ${feature} </li>`)} </ul> </div>`} ${hasPolicy && renderTemplate`<div class="pt-4 border-t border-slate-200 dark:border-slate-700" data-astro-cid-ypiea6ip> <h2 class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3" data-astro-cid-ypiea6ip>
Legal
</h2> <div class="flex flex-wrap gap-3" data-astro-cid-ypiea6ip> ${policy?.privacyPolicy && renderTemplate`<a${addAttribute(`/projects/${project.slug}/privacy`, "href")} class="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors" data-astro-cid-ypiea6ip>
Privacy Policy
</a>`} ${policy?.termsAndConditions && renderTemplate`<a${addAttribute(`/projects/${project.slug}/terms`, "href")} class="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors" data-astro-cid-ypiea6ip>
Terms &amp; Conditions
</a>`} </div> </div>`} </div> <!-- Sidebar stats --> <div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 h-fit" data-astro-cid-ypiea6ip> <h3 class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4" data-astro-cid-ypiea6ip>
Project Info
</h3> <div class="space-y-3" data-astro-cid-ypiea6ip> ${[
    { label: "Role", value: project.role },
    { label: "Year", value: project.year?.toString() },
    {
      label: "Type",
      value: project.projectType ? project.projectType.charAt(0).toUpperCase() + project.projectType.slice(1) : null
    },
    {
      label: "Status",
      value: formatStatus(project.status)
    }
  ].filter((s) => s.value).map((stat) => renderTemplate`<div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3 last:border-0 last:pb-0" data-astro-cid-ypiea6ip> <span class="text-xs text-slate-400 dark:text-slate-500" data-astro-cid-ypiea6ip> ${stat.label} </span> <span class="text-xs text-slate-700 dark:text-slate-300 font-medium" data-astro-cid-ypiea6ip> ${stat.value} </span> </div>`)} </div> </div> </div> </div>  <div id="case-study" class="tab-content hidden" data-astro-cid-ypiea6ip> <div class="space-y-6" data-astro-cid-ypiea6ip> ${renderComponent($$result2, "TextEditor", TextEditor, { "content": project.description, "editable": false, "showToolbar": false, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/ui/TextEditor", "client:component-export": "TextEditor", "data-astro-cid-ypiea6ip": true })} ${project.features && project.features.length > 0 && renderTemplate`<div data-astro-cid-ypiea6ip> <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3" data-astro-cid-ypiea6ip>
Key Features
</h2> <ul class="space-y-2" data-astro-cid-ypiea6ip> ${project.features.map((feature) => renderTemplate`<li class="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400" data-astro-cid-ypiea6ip> <svg class="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ypiea6ip> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-astro-cid-ypiea6ip></path> </svg> ${feature} </li>`)} </ul> </div>`} </div> </div>  <div id="tech-stack" class="tab-content hidden" data-astro-cid-ypiea6ip> ${technologies.length > 0 ? renderTemplate`<div class="flex flex-wrap gap-2" data-astro-cid-ypiea6ip> ${technologies.map((tech) => renderTemplate`<span class="text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5" data-astro-cid-ypiea6ip> ${tech} </span>`)} </div>` : renderTemplate`<p class="text-slate-400 dark:text-slate-500 text-sm" data-astro-cid-ypiea6ip>No technologies listed.</p>`} </div> ` })}  ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/pages/projects/[slug]/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/projects/[slug]/index.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/projects/[slug]/index.astro";
const $$url = "/projects/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
