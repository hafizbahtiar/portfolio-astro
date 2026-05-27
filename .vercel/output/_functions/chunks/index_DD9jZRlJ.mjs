import { c as createComponent } from './astro-component_BCrB7690.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead, c as addAttribute } from './entrypoint_DePlxNSC.mjs';
import { $ as $$PublicLayout } from './api-client_CjQRNt0G.mjs';
import { g as getPublicFamilyTrees, a as getPublicFamilyTreeBySlug, F as FamilyTreeChart } from './FamilyTreeChart_DPYVHbL2.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let trees = [];
  try {
    trees = await getPublicFamilyTrees();
  } catch {
  }
  const peopleKey = (p) => {
    const gk = (p.globalKey || "").trim().toLowerCase();
    if (gk.length > 0) return gk;
    return p.displayName.trim().toLowerCase();
  };
  const slugs = trees.map((t) => t.slug);
  const details = (await Promise.all(slugs.map((slug) => getPublicFamilyTreeBySlug(slug)))).filter(Boolean);
  const personByKey = /* @__PURE__ */ new Map();
  const keyToNewId = /* @__PURE__ */ new Map();
  let nextId = 1;
  for (const d of details) {
    for (const p of d.people) {
      const key = peopleKey(p);
      const existing = personByKey.get(key);
      if (!existing) {
        const merged = {
          id: nextId,
          treeId: 0,
          firstName: p.firstName,
          lastName: p.lastName,
          displayName: p.displayName,
          globalKey: p.globalKey ?? null,
          gender: p.gender,
          birthDate: p.birthDate,
          deathDate: p.deathDate,
          isLiving: p.isLiving,
          photoUrl: p.photoUrl,
          notes: p.notes,
          metadata: p.metadata,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt
        };
        personByKey.set(key, merged);
        keyToNewId.set(key, nextId);
        nextId += 1;
      } else {
        existing.firstName = existing.firstName ?? p.firstName ?? null;
        existing.lastName = existing.lastName ?? p.lastName ?? null;
        existing.photoUrl = existing.photoUrl ?? p.photoUrl ?? null;
        existing.notes = existing.notes ?? p.notes ?? null;
        existing.gender = existing.gender === "unknown" ? p.gender : existing.gender;
        existing.birthDate = existing.birthDate ?? p.birthDate ?? null;
        existing.deathDate = existing.deathDate ?? p.deathDate ?? null;
        existing.isLiving = existing.isLiving || p.isLiving;
      }
    }
  }
  const combinedPeople = Array.from(personByKey.values());
  const relKey = (r) => `${r.relationshipType}:${r.personId}->${r.relatedPersonId}`;
  const relSet = /* @__PURE__ */ new Set();
  const combinedRelationships = [];
  for (const d of details) {
    for (const r of d.relationships) {
      const left = d.people.find((p) => p.id === r.personId);
      const right = d.people.find((p) => p.id === r.relatedPersonId);
      if (!left || !right) continue;
      const leftKey = peopleKey(left);
      const rightKey = peopleKey(right);
      const newLeftId = keyToNewId.get(leftKey);
      const newRightId = keyToNewId.get(rightKey);
      if (!newLeftId || !newRightId) continue;
      const newRel = {
        id: combinedRelationships.length + 1,
        treeId: 0,
        personId: newLeftId,
        relatedPersonId: newRightId,
        relationshipType: r.relationshipType,
        isPrimary: r.isPrimary,
        startDate: r.startDate,
        endDate: r.endDate,
        notes: r.notes,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt
      };
      const k = relKey(newRel);
      if (!relSet.has(k)) {
        relSet.add(k);
        combinedRelationships.push(newRel);
      }
    }
  }
  const addParentRelIfMissing = (parentName, childName) => {
    const parent = combinedPeople.find(
      (p) => p.displayName.trim().toLowerCase() === parentName.trim().toLowerCase()
    );
    const child = combinedPeople.find(
      (p) => p.displayName.trim().toLowerCase() === childName.trim().toLowerCase()
    );
    if (!parent || !child) return;
    const candidate = {
      id: combinedRelationships.length + 1,
      treeId: 0,
      personId: parent.id,
      relatedPersonId: child.id,
      relationshipType: "parent",
      isPrimary: true,
      startDate: null,
      endDate: null,
      notes: null,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const k = relKey(candidate);
    if (!relSet.has(k)) {
      relSet.add(k);
      combinedRelationships.push(candidate);
    }
  };
  addParentRelIfMissing("Mohd Bahtiar", "Muhamad Nurhafiz");
  addParentRelIfMissing("Zarina", "Muhamad Nurhafiz");
  const meIndex = combinedPeople.findIndex(
    (p) => p.displayName.trim().toLowerCase() === "muhamad nurhafiz"
  );
  if (meIndex > 0) {
    const me2 = combinedPeople.splice(meIndex, 1)[0];
    combinedPeople.unshift(me2);
  }
  const me = combinedPeople.find(
    (p) => p.displayName.trim().toLowerCase() === "muhamad nurhafiz"
  ) || combinedPeople[0] || null;
  const combinedDetail = {
    tree: {
      id: 0,
      slug: "combined-family",
      name: "Combined Family",
      description: "Combined view of Hafiz, Bahtiar, and Azhari families, centered for full ancestry.",
      isPublic: true,
      createdByUserId: null,
      defaultMainPersonId: me ? me.id : null,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    people: combinedPeople,
    relationships: combinedRelationships
  };
  const hasPeople = combinedPeople.length > 0;
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, { "title": "Family" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-main py-24 space-y-8"> <div class="space-y-3"> <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
Big Family (Combined)
</h1> <p class="text-slate-500 dark:text-slate-400 max-w-2xl">
Combined view of Hafiz, Bahtiar, and Azhari families, centered for full
        ancestry.
</p> </div> <div class="space-y-4"> ${trees.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2"> ${trees.map((t) => renderTemplate`<a${addAttribute(`/family/${t.slug}`, "href")} class="rounded-md px-3 py-2 text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"> ${t.name} </a>`)} </div>`} <div class="h-[580px]"> ${hasPeople ? renderTemplate`${renderComponent($$result2, "FamilyTreeChart", FamilyTreeChart, { "client:load": true, "detail": combinedDetail, "currentSlug": "combined-family", "useLabelOnly": true, "ancestryDepth": 6, "progenyDepth": 5, "showSiblings": true, "sortChildrenBy": "metadata.birth_order", "sortAscending": true, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/family/FamilyTreeChart", "client:component-export": "FamilyTreeChart" })}` : renderTemplate`<div class="h-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
Family data unavailable.
</div>`} </div> </div> </section> ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/family/index.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/family/index.astro";
const $$url = "/family";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
