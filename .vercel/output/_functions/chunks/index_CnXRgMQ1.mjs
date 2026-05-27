import { c as createComponent } from './astro-component_BCrB7690.mjs';
import 'piccolore';
import { m as maybeRenderHead, c as addAttribute, b as renderTemplate, r as renderComponent } from './entrypoint_DePlxNSC.mjs';
import { r as renderScript, $ as $$PublicLayout } from './api-client_CjQRNt0G.mjs';
import { F as FamilyTreeChart, g as getPublicFamilyTrees, a as getPublicFamilyTreeBySlug } from './FamilyTreeChart_DPYVHbL2.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import 'clsx';

const REL_LABEL = {
  parent: "Parent",
  adoptive_parent: "Adoptive Parent",
  child: "Child",
  adopted_child: "Adopted Child",
  spouse: "Spouse",
  sibling: "Sibling"
};
function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-MY", { year: "numeric", month: "short", day: "numeric" });
}
const PersonInfoPanel = ({ detail }) => {
  const [personId, setPersonId] = useState(null);
  useEffect(() => {
    const handler = (e) => {
      const id = e.detail?.id;
      if (id) setPersonId(String(id));
    };
    window.addEventListener("family:on-main-changed", handler);
    return () => window.removeEventListener("family:on-main-changed", handler);
  }, []);
  const person = personId ? detail.people.find((p) => String(p.id) === personId) : void 0;
  const nameMap = new Map(detail.people.map((p) => [p.id, p.displayName]));
  const relationships = person ? detail.relationships.filter((r) => r.personId === person.id || r.relatedPersonId === person.id).map((r) => {
    const isLeft = r.personId === person.id;
    const otherId = isLeft ? r.relatedPersonId : r.personId;
    return {
      label: REL_LABEL[r.relationshipType] ?? r.relationshipType,
      name: nameMap.get(otherId) ?? String(otherId),
      id: otherId
    };
  }) : [];
  if (!person) {
    return /* @__PURE__ */ jsx("div", { className: "h-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 flex items-center justify-center text-sm text-slate-400 dark:text-slate-500", children: "Click a person to see details" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "h-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 overflow-y-auto space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-slate-100 leading-tight", children: person.displayName }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400 capitalize", children: [
        person.gender,
        " · ",
        person.isLiving ? "Living" : "Deceased"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-3 gap-y-2 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Born" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-800 dark:text-slate-200", children: formatDate(person.birthDate) })
      ] }),
      !person.isLiving && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Died" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-800 dark:text-slate-200", children: formatDate(person.deathDate) })
      ] })
    ] }),
    person.notes && /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700 pt-3", children: person.notes }),
    relationships.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border-t border-slate-100 dark:border-slate-700 pt-3 space-y-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Relationships" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: relationships.map((r, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2 text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xs text-slate-400 dark:text-slate-500 w-24", children: r.label }),
        /* @__PURE__ */ jsx("span", { className: "text-slate-800 dark:text-slate-200", children: r.name })
      ] }, i)) })
    ] })
  ] });
};

const $$Checkbox = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Checkbox;
  const {
    label,
    name,
    checked = false,
    class: className = "",
    id: inputId = `${name}-checkbox`
  } = Astro2.props;
  const labelId = `${name}-label`;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`tech-checkbox-container space-y-2 ${className}`, "class")}${addAttribute(name, "data-name")}> <label${addAttribute(labelId, "id")} class="block text-sm font-medium text-slate-500 dark:text-slate-400"${addAttribute(inputId, "for")}> ${label} </label> <div class="relative"> <input${addAttribute(inputId, "id")} type="checkbox"${addAttribute(name, "name")}${addAttribute(checked, "checked")} class="sr-only"${addAttribute(labelId, "aria-labelledby")}> <button type="button" class="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-left text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all flex justify-between items-center group hover:border-cyan-500/50" data-trigger="true"${addAttribute(inputId, "aria-controls")}> <span class="selected-text text-sm text-slate-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate"> <span data-off>Spouse links: ON</span> <span data-on class="hidden">Spouse links: OFF</span> </span> <div class="flex items-center text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path> </svg> </div> </button> </div> </div> ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/Checkbox.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/Checkbox.astro", void 0);

const $$Dropdown = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Dropdown;
  const {
    label,
    name,
    options,
    placeholder = "Select option",
    value = "",
    class: className = "",
    id: inputId = `${name}-input`
  } = Astro2.props;
  const triggerId = `${name}-trigger`;
  const labelId = `${name}-label`;
  const menuId = `${name}-menu`;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`tech-dropdown-container space-y-2 ${className}`, "class")}${addAttribute(name, "data-name")} data-astro-cid-wwe277d2> <label${addAttribute(labelId, "id")} class="block text-sm font-medium text-slate-500 dark:text-slate-400"${addAttribute(triggerId, "for")} data-astro-cid-wwe277d2> ${label} </label> <div class="relative" data-astro-cid-wwe277d2> <input${addAttribute(inputId, "id")} type="hidden"${addAttribute(name, "name")}${addAttribute(value, "value")} class="dropdown-input" data-astro-cid-wwe277d2> <button${addAttribute(triggerId, "id")}${addAttribute(labelId, "aria-labelledby")} aria-haspopup="listbox" aria-expanded="false" type="button" class="dropdown-trigger w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-left text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all flex justify-between items-center group hover:border-cyan-500/50" data-astro-cid-wwe277d2> <span class="selected-text text-sm text-slate-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate" data-astro-cid-wwe277d2> ${options.find((opt) => opt.value === value)?.label || placeholder} </span> <div class="flex items-center text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors" data-astro-cid-wwe277d2> <svg class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-wwe277d2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-wwe277d2></path> </svg> </div> </button> <div${addAttribute(menuId, "id")} class="dropdown-menu hidden absolute z-50 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl transform origin-top transition-all duration-200" data-astro-cid-wwe277d2> <ul class="max-h-60 overflow-y-auto py-1 custom-scrollbar" role="listbox"${addAttribute(labelId, "aria-labelledby")} data-astro-cid-wwe277d2> ${options.map((option) => renderTemplate`<li data-astro-cid-wwe277d2> <button type="button" role="option" class="dropdown-item w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"${addAttribute(option.value, "data-value")} data-astro-cid-wwe277d2> <span data-astro-cid-wwe277d2>${option.label}</span> </button> </li>`)} </ul> </div> </div> </div>  ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/Dropdown.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/Dropdown.astro", void 0);

const PublicFamilyExplorer = ({ initialSlug, minimal }) => {
  const [trees, setTrees] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getPublicFamilyTrees();
        setTrees(result);
        const preferred = initialSlug ? result.find((t) => t.slug === initialSlug) : result.find((t) => t.slug === "hafiz-family");
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
  const loadingEl = /* @__PURE__ */ jsx("div", { className: "h-full w-full min-h-[320px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-6 text-slate-500 dark:text-slate-400", children: "Loading family trees..." });
  if (isLoading) return loadingEl;
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "h-full w-full min-h-[320px] rounded-xl border border-red-500/40 bg-red-500/10 flex items-center justify-center p-6 text-red-300", children: error });
  }
  if (trees.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "h-full w-full min-h-[320px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-6 text-slate-500 dark:text-slate-400", children: "No public family trees available yet." });
  }
  if (isLoadingDetail) return loadingEl;
  if (!detail) {
    return /* @__PURE__ */ jsx("div", { className: "h-full w-full min-h-[320px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-6 text-slate-500 dark:text-slate-400", children: "Family details unavailable." });
  }
  if (minimal) {
    return /* @__PURE__ */ jsx(FamilyTreeChart, { detail, currentSlug: detail.tree.slug });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-slate-900 dark:text-slate-100", children: detail.tree.name }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-500 dark:text-slate-400", children: detail.tree.description || "No description provided." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-[580px]", children: /* @__PURE__ */ jsx(FamilyTreeChart, { detail, currentSlug: detail.tree.slug }) })
  ] });
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const slug = Astro2.params.slug ?? "";
  const [families, detail] = await Promise.all([
    getPublicFamilyTrees().catch(() => []),
    slug ? getPublicFamilyTreeBySlug(slug).catch(() => null) : Promise.resolve(null)
  ]);
  const familyOptions = families.map((t) => ({ value: t.slug, label: t.name }));
  const personOptions = (detail?.people || []).map((p) => ({
    value: String(p.id),
    label: p.displayName
  }));
  const initialMainId = (() => {
    const defId = detail?.tree.defaultMainPersonId ?? null;
    if (defId) return String(defId);
    return String(detail?.people[0]?.id || "");
  })();
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, { "title": `${detail?.tree.name || "Family"} Family` }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<section class="container-main py-24 space-y-8"> <div class="space-y-3"> <a href="/family" class="inline-flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors group"> <svg class="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>\nBack to Families\n</a> <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight"> ', ' </h1> <p class="text-slate-500 dark:text-slate-400 max-w-3xl"> ', ' </p> </div> <div class="space-y-4"> <div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 flex flex-wrap items-end gap-3"> <div class="w-48 shrink-0"> ', ' </div> <div class="w-48 shrink-0"> ', ' </div> <div class="w-44 shrink-0"> ', ' </div> <div class="flex flex-wrap gap-2 items-end pb-0.5"> <button id="btn-orient-vertical" type="button" class="rounded-md px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Vertical</button> <button id="btn-orient-horizontal" type="button" class="rounded-md px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Horizontal</button> <button id="btn-zoom-out" type="button" class="rounded-md px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">-</button> <button id="btn-zoom-in" type="button" class="rounded-md px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">+</button> <button id="btn-center-main" type="button" class="rounded-md px-3 py-2 text-sm border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-500/20">Center Main</button> <button id="btn-fit" type="button" class="rounded-md px-3 py-2 text-sm border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-500/20">Fit</button> </div> </div> <div class="flex gap-4 h-[580px]"> <div class="flex-1 min-w-0"> ', " </div> ", ` </div> </div> <script>
      const chooseInput = document.querySelector('input[name="choose-family"]');
      const mainInput = document.querySelector('input[name="main-person"]');
      const noSpouseInput = document.querySelector('input[name="no-spouse"]');
      function onChooseChange() {
        const slug = chooseInput?.value || "";
        if (!slug) return;
        window.dispatchEvent(
          new CustomEvent("family:set-family", { detail: { slug } }),
        );
        window.location.href = \`/family/\${slug}\`;
      }
      function onMainChange() {
        const id = mainInput?.value || "";
        if (!id) return;
        window.dispatchEvent(
          new CustomEvent("family:set-main", { detail: { id } }),
        );
      }
      function onNoSpouseChange() {
        const el = document.querySelector('input[name="no-spouse"]');
        const checked = !!(el && el instanceof HTMLInputElement
          ? el.checked
          : false);
        const api =
          typeof window !== "undefined" && window && window["familyChartApi"]
            ? window["familyChartApi"]
            : null;
        if (api && typeof api.setShowSpouses === "function") {
          api.setShowSpouses(!checked);
        }
        window.dispatchEvent(new CustomEvent("family:center-main"));
      }
      chooseInput?.addEventListener("change", onChooseChange);
      mainInput?.addEventListener("change", onMainChange);
      noSpouseInput?.addEventListener("change", onNoSpouseChange);
      document.addEventListener("change", (e) => {
        const el = e.target instanceof Element ? e.target : null;
        if (!el) return;
        let name = el.getAttribute ? el.getAttribute("name") : null;
        if (!name && el.closest) {
          const inputEl = el.closest("input[name]");
          if (inputEl && inputEl.getAttribute) {
            name = inputEl.getAttribute("name");
          }
        }
        if (name === "choose-family") onChooseChange();
        if (name === "main-person") onMainChange();
        if (name === "no-spouse") onNoSpouseChange();
      });
      window.addEventListener("family:on-main-changed", (e) => {
        const id = e?.detail?.id;
        if (!id || !mainInput) return;
        if (mainInput.value === String(id)) return;
        mainInput.value = id;
        mainInput.dispatchEvent(new Event("change", { bubbles: true }));
      });
      if (window.setupDropdowns) {
        window.setupDropdowns();
      }
      const zIn = document.getElementById("btn-zoom-in");
      const zOut = document.getElementById("btn-zoom-out");
      const fit = document.getElementById("btn-fit");
      const center = document.getElementById("btn-center-main");
      const v = document.getElementById("btn-orient-vertical");
      const h = document.getElementById("btn-orient-horizontal");
      zIn?.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("family:zoom-in"));
      });
      zOut?.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("family:zoom-out"));
      });
      fit?.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("family:fit"));
      });
      center?.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("family:center-main"));
      });
      const orientBase =
        "rounded-md px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700";
      const orientActive =
        "rounded-md px-3 py-2 text-sm border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-500/20";
      function setOrientUI(vertical) {
        if (!v || !h) return;
        v.className = vertical ? orientActive : orientBase;
        h.className = vertical ? orientBase : orientActive;
      }
      v?.addEventListener("click", () => {
        window.dispatchEvent(
          new CustomEvent("family:set-orientation", {
            detail: { vertical: true },
          }),
        );
        setOrientUI(true);
      });
      h?.addEventListener("click", () => {
        window.dispatchEvent(
          new CustomEvent("family:set-orientation", {
            detail: { vertical: false },
          }),
        );
        setOrientUI(false);
      });
      setOrientUI(true);
      if (mainInput && mainInput.value) {
        mainInput.dispatchEvent(new Event("change", { bubbles: true }));
      }
    <\/script> </section> `], [" ", '<section class="container-main py-24 space-y-8"> <div class="space-y-3"> <a href="/family" class="inline-flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors group"> <svg class="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>\nBack to Families\n</a> <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight"> ', ' </h1> <p class="text-slate-500 dark:text-slate-400 max-w-3xl"> ', ' </p> </div> <div class="space-y-4"> <div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 flex flex-wrap items-end gap-3"> <div class="w-48 shrink-0"> ', ' </div> <div class="w-48 shrink-0"> ', ' </div> <div class="w-44 shrink-0"> ', ' </div> <div class="flex flex-wrap gap-2 items-end pb-0.5"> <button id="btn-orient-vertical" type="button" class="rounded-md px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Vertical</button> <button id="btn-orient-horizontal" type="button" class="rounded-md px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Horizontal</button> <button id="btn-zoom-out" type="button" class="rounded-md px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">-</button> <button id="btn-zoom-in" type="button" class="rounded-md px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">+</button> <button id="btn-center-main" type="button" class="rounded-md px-3 py-2 text-sm border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-500/20">Center Main</button> <button id="btn-fit" type="button" class="rounded-md px-3 py-2 text-sm border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-500/20">Fit</button> </div> </div> <div class="flex gap-4 h-[580px]"> <div class="flex-1 min-w-0"> ', " </div> ", ` </div> </div> <script>
      const chooseInput = document.querySelector('input[name="choose-family"]');
      const mainInput = document.querySelector('input[name="main-person"]');
      const noSpouseInput = document.querySelector('input[name="no-spouse"]');
      function onChooseChange() {
        const slug = chooseInput?.value || "";
        if (!slug) return;
        window.dispatchEvent(
          new CustomEvent("family:set-family", { detail: { slug } }),
        );
        window.location.href = \\\`/family/\\\${slug}\\\`;
      }
      function onMainChange() {
        const id = mainInput?.value || "";
        if (!id) return;
        window.dispatchEvent(
          new CustomEvent("family:set-main", { detail: { id } }),
        );
      }
      function onNoSpouseChange() {
        const el = document.querySelector('input[name="no-spouse"]');
        const checked = !!(el && el instanceof HTMLInputElement
          ? el.checked
          : false);
        const api =
          typeof window !== "undefined" && window && window["familyChartApi"]
            ? window["familyChartApi"]
            : null;
        if (api && typeof api.setShowSpouses === "function") {
          api.setShowSpouses(!checked);
        }
        window.dispatchEvent(new CustomEvent("family:center-main"));
      }
      chooseInput?.addEventListener("change", onChooseChange);
      mainInput?.addEventListener("change", onMainChange);
      noSpouseInput?.addEventListener("change", onNoSpouseChange);
      document.addEventListener("change", (e) => {
        const el = e.target instanceof Element ? e.target : null;
        if (!el) return;
        let name = el.getAttribute ? el.getAttribute("name") : null;
        if (!name && el.closest) {
          const inputEl = el.closest("input[name]");
          if (inputEl && inputEl.getAttribute) {
            name = inputEl.getAttribute("name");
          }
        }
        if (name === "choose-family") onChooseChange();
        if (name === "main-person") onMainChange();
        if (name === "no-spouse") onNoSpouseChange();
      });
      window.addEventListener("family:on-main-changed", (e) => {
        const id = e?.detail?.id;
        if (!id || !mainInput) return;
        if (mainInput.value === String(id)) return;
        mainInput.value = id;
        mainInput.dispatchEvent(new Event("change", { bubbles: true }));
      });
      if (window.setupDropdowns) {
        window.setupDropdowns();
      }
      const zIn = document.getElementById("btn-zoom-in");
      const zOut = document.getElementById("btn-zoom-out");
      const fit = document.getElementById("btn-fit");
      const center = document.getElementById("btn-center-main");
      const v = document.getElementById("btn-orient-vertical");
      const h = document.getElementById("btn-orient-horizontal");
      zIn?.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("family:zoom-in"));
      });
      zOut?.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("family:zoom-out"));
      });
      fit?.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("family:fit"));
      });
      center?.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("family:center-main"));
      });
      const orientBase =
        "rounded-md px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700";
      const orientActive =
        "rounded-md px-3 py-2 text-sm border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-500/20";
      function setOrientUI(vertical) {
        if (!v || !h) return;
        v.className = vertical ? orientActive : orientBase;
        h.className = vertical ? orientBase : orientActive;
      }
      v?.addEventListener("click", () => {
        window.dispatchEvent(
          new CustomEvent("family:set-orientation", {
            detail: { vertical: true },
          }),
        );
        setOrientUI(true);
      });
      h?.addEventListener("click", () => {
        window.dispatchEvent(
          new CustomEvent("family:set-orientation", {
            detail: { vertical: false },
          }),
        );
        setOrientUI(false);
      });
      setOrientUI(true);
      if (mainInput && mainInput.value) {
        mainInput.dispatchEvent(new Event("change", { bubbles: true }));
      }
    <\/script> </section> `])), maybeRenderHead(), detail?.tree.name || slug, detail?.tree.description ?? (detail ? "No description provided for this family tree." : "Family tree not found."), renderComponent($$result2, "Dropdown", $$Dropdown, { "label": "Choose Family", "name": "choose-family", "options": familyOptions, "value": detail?.tree.slug || slug, "placeholder": "Select family" }), renderComponent($$result2, "Dropdown", $$Dropdown, { "label": "Main Person", "name": "main-person", "options": personOptions, "value": initialMainId, "placeholder": "Select main person" }), renderComponent($$result2, "Checkbox", $$Checkbox, { "label": "No Spouse", "name": "no-spouse" }), detail && detail.people.length > 0 ? renderTemplate`${renderComponent($$result2, "FamilyTreeChart", FamilyTreeChart, { "client:load": true, "detail": detail, "currentSlug": detail.tree.slug, "sortChildrenBy": "metadata.birth_order", "sortAscending": true, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/family/FamilyTreeChart", "client:component-export": "FamilyTreeChart" })}` : renderTemplate`<div class="space-y-3 h-full"> <div class="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-yellow-600 dark:text-yellow-300 text-sm">
Live data will be loaded in the browser for this family.
</div> <div class="h-full"> ${renderComponent($$result2, "PublicFamilyExplorer", PublicFamilyExplorer, { "client:load": true, "minimal": true, "initialSlug": slug, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/family/PublicFamilyExplorer", "client:component-export": "PublicFamilyExplorer" })} </div> </div>`, detail && renderTemplate`<div class="w-64 shrink-0"> ${renderComponent($$result2, "PersonInfoPanel", PersonInfoPanel, { "client:load": true, "detail": detail, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/family/PersonInfoPanel", "client:component-export": "PersonInfoPanel" })} </div>`) })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/family/[slug]/index.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/family/[slug]/index.astro";
const $$url = "/family/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
