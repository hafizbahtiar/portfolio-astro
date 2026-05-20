import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React, { useState, useRef, useId, useEffect, useMemo, useCallback } from 'react';
import { f as familyService } from './family_C_CDot2R.mjs';
import { F as FamilyTreeChart } from './FamilyTreeChart_Cu6v61RI.mjs';

const TechSelect = ({
  value,
  onChange,
  options,
  placeholder = "Select option",
  className = "",
  label,
  ariaLabel
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const labelId = useId();
  const controlId = useId();
  const selectedOption = options.find((opt) => opt.value === value);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: `relative space-y-2 ${className}`, ref: dropdownRef, children: [
    label && /* @__PURE__ */ jsx(
      "label",
      {
        id: labelId,
        htmlFor: controlId,
        className: "block text-sm font-medium text-gray-400 font-mono tracking-wide",
        children: `// ${label}`
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          id: controlId,
          onClick: () => setIsOpen(!isOpen),
          "aria-label": !label ? ariaLabel : void 0,
          "aria-labelledby": label ? labelId : void 0,
          className: `
                        w-full bg-gray-900/50 border rounded-lg px-4 py-2 text-left text-white 
                        outline-none transition-all flex justify-between items-center group
                        ${isOpen ? "border-cyan-500 ring-2 ring-cyan-500/50" : "border-gray-700 hover:border-cyan-500/50"}
                    `,
          children: [
            /* @__PURE__ */ jsx("span", { className: `font-mono text-sm transition-colors truncate ${selectedOption ? "text-cyan-400" : "text-gray-300"}`, children: selectedOption ? selectedOption.label : placeholder }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center text-gray-500 group-hover:text-cyan-500 transition-colors ml-2", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: `w-4 h-4 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M19 9l-7 7-7-7"
                  }
                )
              }
            ) })
          ]
        }
      ),
      isOpen && /* @__PURE__ */ jsx("div", { className: "absolute z-50 w-full min-w-[100px] mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl transform origin-top animate-fade-in", children: /* @__PURE__ */ jsx("ul", { className: "max-h-60 overflow-y-auto py-1 custom-scrollbar", children: options.map((option) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleSelect(option.value),
          className: `
                                            w-full text-left px-4 py-2 text-sm font-mono transition-colors flex items-center justify-between group
                                            ${option.value === value ? "bg-cyan-900/20 text-cyan-400" : "text-gray-300 hover:bg-cyan-900/20 hover:text-cyan-400"}
                                        `,
          children: [
            /* @__PURE__ */ jsx("span", { children: option.label }),
            option.value === value && /* @__PURE__ */ jsx("span", { className: "text-cyan-500 font-bold", children: "_" })
          ]
        }
      ) }, option.value)) }) })
    ] })
  ] });
};

const emptyTreeForm = {
  slug: "",
  name: "",
  description: "",
  isPublic: false
};
const emptyPersonForm = {
  firstName: "",
  lastName: "",
  displayName: "",
  gender: "unknown",
  birthDate: null,
  deathDate: null,
  isLiving: true,
  photoUrl: "",
  notes: "",
  metadata: {}
};
const genderOptions = ["male", "female", "other", "unknown"];
const genderSelectOptions = genderOptions.map((gender) => ({
  value: gender,
  label: gender
}));
const normalizeText = (value) => {
  if (value === void 0 || value === null) return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
};
const parseMetadata = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.error("Invalid metadata JSON", error);
  }
  return null;
};
const buildRelationshipSummary = (relationship, peopleById) => {
  const left = peopleById.get(relationship.personId)?.displayName || "Unknown";
  const right = peopleById.get(relationship.relatedPersonId)?.displayName || "Unknown";
  return `${left} ${relationship.relationshipType} ${right}`;
};
const TechDateField = ({
  label,
  value,
  onChange
}) => {
  const inputId = React.useId();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor: inputId,
        className: "block text-sm font-medium text-gray-400 font-mono tracking-wide",
        children: `// ${label}`
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        id: inputId,
        type: "date",
        value: value || "",
        onChange: (e) => onChange(e.target.value || null),
        className: "w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all font-mono text-sm"
      }
    )
  ] });
};
const TechCheckboxField = ({
  label,
  checked,
  onChange
}) => {
  const buttonId = React.useId();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor: buttonId,
        className: "block text-sm font-medium text-gray-400 font-mono tracking-wide",
        children: `// ${label}`
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        id: buttonId,
        type: "button",
        onClick: () => onChange(!checked),
        className: "w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-left text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all flex justify-between items-center group hover:border-cyan-500/50",
        children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono text-sm text-gray-300 group-hover:text-cyan-400 transition-colors truncate", children: checked ? `${label}: ON` : `${label}: OFF` }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center text-gray-500 group-hover:text-cyan-500 transition-colors", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-4 h-4",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M4 12h16"
                }
              )
            }
          ) })
        ]
      }
    )
  ] });
};
const getSpouseIds = (detail, personId) => {
  if (!detail) return [];
  return detail.relationships.filter(
    (relationship) => relationship.relationshipType === "spouse" && (relationship.personId === personId || relationship.relatedPersonId === personId)
  ).map(
    (relationship) => relationship.personId === personId ? relationship.relatedPersonId : relationship.personId
  ).filter((value, index, array) => array.indexOf(value) === index);
};
const FamilyTreeBuilder = ({ mode }) => {
  const [treeId, setTreeId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [treeForm, setTreeForm] = useState(emptyTreeForm);
  const [rootPersonForm, setRootPersonForm] = useState(emptyPersonForm);
  const [rootMetadataInput, setRootMetadataInput] = useState("{}");
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [personForm, setPersonForm] = useState(emptyPersonForm);
  const [personMetadataInput, setPersonMetadataInput] = useState("{}");
  const [coParentId, setCoParentId] = useState(null);
  const peopleById = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    detail?.people.forEach((person) => map.set(person.id, person));
    return map;
  }, [detail]);
  const selectedPerson = selectedPersonId ? peopleById.get(selectedPersonId) ?? null : null;
  const showToast = useCallback(
    (options) => {
      const registry = window.__uiAlerts;
      registry?.["family-builder-alert"]?.show(options);
    },
    []
  );
  const spouseOptions = useMemo(() => {
    if (!selectedPersonId) return [];
    return getSpouseIds(detail, selectedPersonId).map((id) => peopleById.get(id)).filter(Boolean);
  }, [detail, peopleById, selectedPersonId]);
  const stats = useMemo(() => {
    const people = detail?.people.length || 0;
    const relationships = detail?.relationships.length || 0;
    const living = detail?.people.filter((person) => person.isLiving).length || 0;
    return { people, relationships, living };
  }, [detail]);
  const resetInspectorForm = () => {
    setSelectedAction(null);
    setPersonForm(emptyPersonForm);
    setPersonMetadataInput("{}");
    setCoParentId(null);
  };
  const patchPersonInDetail = useCallback((nextPerson) => {
    setDetail((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        people: prev.people.map(
          (person) => person.id === nextPerson.id ? { ...person, ...nextPerson } : person
        )
      };
    });
  }, []);
  const centerOnPerson = (personId) => {
    setSelectedPersonId(personId);
    window.dispatchEvent(
      new CustomEvent("family:set-main", {
        detail: { id: String(personId) }
      })
    );
  };
  const handleChartSelectPerson = useCallback((personId) => {
    setSelectedPersonId(personId);
  }, []);
  const loadDetail = async (nextTreeId, options) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await familyService.getAdminTreeDetailById(nextTreeId);
      if (!result) {
        throw new Error("Family tree not found");
      }
      setTreeId(nextTreeId);
      setDetail(result);
      setTreeForm({
        slug: result.tree.slug,
        name: result.tree.name,
        description: result.tree.description || "",
        isPublic: result.tree.isPublic,
        defaultMainPersonId: result.tree.defaultMainPersonId ?? null
      });
      const defaultSelectedId = result.tree.defaultMainPersonId ?? result.people[0]?.id ?? null;
      const focusedPersonId = options?.focusPersonId && result.people.some((person) => person.id === options.focusPersonId) ? options.focusPersonId : defaultSelectedId;
      setSelectedPersonId(focusedPersonId);
      resetInspectorForm();
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to load family tree.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (mode !== "edit") return;
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    if (!id || Number.isNaN(id)) {
      setError("Missing family tree ID.");
      setIsLoading(false);
      return;
    }
    loadDetail(id);
  }, [mode]);
  useEffect(() => {
    if (!selectedPerson) {
      setPersonForm(emptyPersonForm);
      setPersonMetadataInput("{}");
      return;
    }
    if (selectedAction) return;
    setPersonForm({
      firstName: selectedPerson.firstName || "",
      lastName: selectedPerson.lastName || "",
      displayName: selectedPerson.displayName,
      gender: selectedPerson.gender,
      birthDate: selectedPerson.birthDate,
      deathDate: selectedPerson.deathDate,
      isLiving: selectedPerson.isLiving,
      photoUrl: selectedPerson.photoUrl || "",
      notes: selectedPerson.notes || "",
      metadata: selectedPerson.metadata || {}
    });
    setPersonMetadataInput(JSON.stringify(selectedPerson.metadata || {}, null, 2));
  }, [selectedAction, selectedPerson]);
  const handleCreateTree = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      const createdTree = await familyService.createTree({
        slug: treeForm.slug?.trim() || "",
        name: treeForm.name?.trim() || "",
        description: normalizeText(treeForm.description),
        isPublic: Boolean(treeForm.isPublic)
      });
      if (!createdTree) {
        throw new Error("Failed to create family tree");
      }
      let defaultMainPersonId = null;
      if (rootPersonForm.displayName?.trim()) {
        const createdRoot = await familyService.createPerson(createdTree.id, {
          firstName: normalizeText(rootPersonForm.firstName),
          lastName: normalizeText(rootPersonForm.lastName),
          displayName: rootPersonForm.displayName.trim(),
          gender: rootPersonForm.gender || "unknown",
          birthDate: normalizeText(rootPersonForm.birthDate),
          deathDate: normalizeText(rootPersonForm.deathDate),
          isLiving: Boolean(rootPersonForm.isLiving),
          photoUrl: normalizeText(rootPersonForm.photoUrl),
          notes: normalizeText(rootPersonForm.notes),
          metadata: parseMetadata(rootMetadataInput)
        });
        defaultMainPersonId = createdRoot?.id ?? null;
      }
      if (defaultMainPersonId) {
        await familyService.updateTree(createdTree.id, {
          defaultMainPersonId
        });
      }
      window.location.href = `/admin/family/edit?id=${createdTree.id}`;
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to create family tree.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleSaveTree = async (e) => {
    e.preventDefault();
    if (!treeId) return;
    setIsSaving(true);
    setError(null);
    try {
      await familyService.updateTree(treeId, {
        slug: treeForm.slug?.trim(),
        name: treeForm.name?.trim(),
        description: normalizeText(treeForm.description),
        isPublic: Boolean(treeForm.isPublic),
        defaultMainPersonId: treeForm.defaultMainPersonId ?? null
      });
      await loadDetail(treeId);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to save family tree.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleDeleteTree = async () => {
    if (!treeId || !detail) return;
    const confirmed = window.confirm(
      `Delete "${detail.tree.name}"? This cannot be undone.`
    );
    if (!confirmed) return;
    setIsSaving(true);
    setError(null);
    try {
      const ok = await familyService.deleteTree(treeId);
      if (!ok) {
        throw new Error("Failed to delete family tree");
      }
      window.location.href = "/admin/family";
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to delete family tree.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleSavePerson = async (e) => {
    e.preventDefault();
    if (!selectedPerson || !treeId) return;
    setIsSaving(true);
    setError(null);
    try {
      const updatedPerson = await familyService.updatePerson(selectedPerson.id, {
        firstName: normalizeText(personForm.firstName),
        lastName: normalizeText(personForm.lastName),
        displayName: personForm.displayName?.trim() || "",
        gender: personForm.gender || "unknown",
        birthDate: normalizeText(personForm.birthDate),
        deathDate: normalizeText(personForm.deathDate),
        isLiving: Boolean(personForm.isLiving),
        photoUrl: normalizeText(personForm.photoUrl),
        notes: normalizeText(personForm.notes),
        metadata: parseMetadata(personMetadataInput)
      });
      if (!updatedPerson) {
        throw new Error("Failed to save person");
      }
      if (treeForm.defaultMainPersonId === selectedPerson.id || detail?.tree.defaultMainPersonId === selectedPerson.id) {
        await familyService.updateTree(treeId, {
          defaultMainPersonId: selectedPerson.id
        });
      }
      patchPersonInDetail(updatedPerson);
      centerOnPerson(updatedPerson.id);
      showToast({
        type: "success",
        title: "Person updated",
        message: `${updatedPerson.displayName} saved without resetting the builder.`
      });
    } catch (err) {
      console.error(err);
      const message = err?.message || "Failed to save person.";
      setError(message);
      showToast({
        type: "error",
        title: "Save failed",
        message
      });
    } finally {
      setIsSaving(false);
    }
  };
  const handleDeletePerson = async () => {
    if (!selectedPerson || !treeId) return;
    const confirmed = window.confirm(
      `Delete "${selectedPerson.displayName}" and related links?`
    );
    if (!confirmed) return;
    setIsSaving(true);
    setError(null);
    try {
      const ok = await familyService.deletePerson(selectedPerson.id);
      if (!ok) throw new Error("Failed to delete person");
      await loadDetail(treeId);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to delete person.");
    } finally {
      setIsSaving(false);
    }
  };
  const beginRelationAction = (action) => {
    if (!selectedPerson) return;
    const suggestedGender = action === "father" || action === "son" ? "male" : action === "mother" || action === "daughter" ? "female" : "unknown";
    setSelectedAction(action);
    setPersonForm({
      ...emptyPersonForm,
      gender: suggestedGender,
      isLiving: true
    });
    setPersonMetadataInput("{}");
    setCoParentId(spouseOptions[0]?.id ?? null);
  };
  const createRelativePerson = useCallback(
    async ({
      action,
      anchorPersonId,
      otherParentId,
      payload
    }) => {
      if (!treeId) {
        throw new Error("Family tree not ready");
      }
      const created = await familyService.createPerson(treeId, {
        firstName: normalizeText(payload.firstName),
        lastName: normalizeText(payload.lastName),
        displayName: payload.displayName?.trim() || "",
        gender: payload.gender || "unknown",
        birthDate: normalizeText(payload.birthDate),
        deathDate: normalizeText(payload.deathDate),
        isLiving: Boolean(payload.isLiving),
        photoUrl: normalizeText(payload.photoUrl),
        notes: normalizeText(payload.notes),
        metadata: payload.metadata || null
      });
      if (!created) {
        throw new Error("Failed to create related person");
      }
      if (action === "father" || action === "mother") {
        await familyService.createRelationship(treeId, {
          personId: created.id,
          relatedPersonId: anchorPersonId,
          relationshipType: "parent",
          isPrimary: true
        });
      }
      if (action === "spouse") {
        await familyService.createRelationship(treeId, {
          personId: anchorPersonId,
          relatedPersonId: created.id,
          relationshipType: "spouse",
          isPrimary: true
        });
        await familyService.createRelationship(treeId, {
          personId: created.id,
          relatedPersonId: anchorPersonId,
          relationshipType: "spouse",
          isPrimary: true
        });
      }
      if (action === "son" || action === "daughter") {
        await familyService.createRelationship(treeId, {
          personId: anchorPersonId,
          relatedPersonId: created.id,
          relationshipType: "parent",
          isPrimary: true
        });
        if (otherParentId) {
          await familyService.createRelationship(treeId, {
            personId: otherParentId,
            relatedPersonId: created.id,
            relationshipType: "parent",
            isPrimary: true
          });
        }
      }
      return created;
    },
    [treeId]
  );
  const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (!treeId || !selectedPerson || !selectedAction) return;
    setIsSaving(true);
    setError(null);
    try {
      const created = await createRelativePerson({
        action: selectedAction,
        anchorPersonId: selectedPerson.id,
        otherParentId: coParentId,
        payload: {
          ...personForm,
          metadata: parseMetadata(personMetadataInput)
        }
      });
      await loadDetail(treeId, { focusPersonId: created.id });
      setSelectedAction(null);
      centerOnPerson(created.id);
      showToast({
        type: "success",
        title: "Relative created",
        message: `${created.displayName} added to the canvas tree.`
      });
    } catch (err) {
      console.error(err);
      const message = err?.message || "Failed to create related person.";
      setError(message);
      showToast({
        type: "error",
        title: "Create failed",
        message
      });
    } finally {
      setIsSaving(false);
    }
  };
  const handleCanvasInlineCreateRelative = useCallback(
    async ({
      relation,
      anchorPersonId,
      otherParentId,
      displayName,
      firstName,
      lastName,
      gender,
      birthDate,
      photoUrl
    }) => {
      if (!treeId) return;
      setIsSaving(true);
      setError(null);
      try {
        const created = await createRelativePerson({
          action: relation,
          anchorPersonId,
          otherParentId,
          payload: {
            firstName: firstName || null,
            lastName: lastName || null,
            displayName,
            gender,
            birthDate: birthDate || null,
            deathDate: null,
            isLiving: true,
            photoUrl: photoUrl || null,
            notes: null,
            metadata: null
          }
        });
        await loadDetail(treeId, { focusPersonId: created.id });
        centerOnPerson(created.id);
        showToast({
          type: "success",
          title: "Relative created",
          message: `${created.displayName} added from the canvas.`
        });
      } catch (err) {
        console.error(err);
        const message = err?.message || "Failed to create related person.";
        setError(message);
        showToast({
          type: "error",
          title: "Create failed",
          message
        });
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [createRelativePerson, loadDetail, showToast, treeId]
  );
  const relationTitle = useMemo(() => {
    if (!selectedAction || !selectedPerson) return "";
    const map = {
      father: `Add Father for ${selectedPerson.displayName}`,
      mother: `Add Mother for ${selectedPerson.displayName}`,
      spouse: `Add Spouse for ${selectedPerson.displayName}`,
      son: `Add Son for ${selectedPerson.displayName}`,
      daughter: `Add Daughter for ${selectedPerson.displayName}`
    };
    return map[selectedAction];
  }, [selectedAction, selectedPerson]);
  if (mode === "new") {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      error && /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]", children: [
        /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: handleCreateTree,
            className: "space-y-6 rounded-2xl border border-gray-700 bg-gray-800/40 p-6",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-cyan-400", children: "~/family/new" }),
                /* @__PURE__ */ jsx("h2", { className: "mt-2 text-2xl font-bold text-white", children: "Create Family Tree" }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-400", children: "Start with the tree details, then optionally add the first person so the builder can open with a focused root card." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Family name",
                    value: treeForm.name || "",
                    onChange: (e) => setTreeForm((prev) => ({ ...prev, name: e.target.value })),
                    required: true,
                    className: "rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "family-slug",
                    value: treeForm.slug || "",
                    onChange: (e) => setTreeForm((prev) => ({ ...prev, slug: e.target.value })),
                    required: true,
                    className: "rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  placeholder: "Description",
                  value: treeForm.description || "",
                  onChange: (e) => setTreeForm((prev) => ({ ...prev, description: e.target.value })),
                  className: "w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                }
              ),
              /* @__PURE__ */ jsx(
                TechCheckboxField,
                {
                  label: "Public tree",
                  checked: Boolean(treeForm.isPublic),
                  onChange: (value) => setTreeForm((prev) => ({ ...prev, isPublic: value }))
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-700 bg-gray-900/30 p-5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white", children: "Starter Person" }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-400", children: "Optional, but recommended so the edit builder opens with the first card already connected to the tree." }),
                /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "Display Name",
                      value: rootPersonForm.displayName || "",
                      onChange: (e) => setRootPersonForm((prev) => ({
                        ...prev,
                        displayName: e.target.value
                      })),
                      className: "rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    TechSelect,
                    {
                      value: rootPersonForm.gender || "unknown",
                      onChange: (value) => setRootPersonForm((prev) => ({
                        ...prev,
                        gender: value
                      })),
                      options: genderSelectOptions,
                      label: "Gender"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "First Name",
                      value: rootPersonForm.firstName || "",
                      onChange: (e) => setRootPersonForm((prev) => ({
                        ...prev,
                        firstName: e.target.value
                      })),
                      className: "rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "Last Name",
                      value: rootPersonForm.lastName || "",
                      onChange: (e) => setRootPersonForm((prev) => ({
                        ...prev,
                        lastName: e.target.value
                      })),
                      className: "rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    TechDateField,
                    {
                      label: "Birth Date",
                      value: rootPersonForm.birthDate,
                      onChange: (value) => setRootPersonForm((prev) => ({
                        ...prev,
                        birthDate: value
                      }))
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    TechCheckboxField,
                    {
                      label: "Is Living",
                      checked: Boolean(rootPersonForm.isLiving),
                      onChange: (value) => setRootPersonForm((prev) => ({
                        ...prev,
                        isLiving: value
                      }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    rows: 3,
                    placeholder: "Metadata JSON",
                    value: rootMetadataInput,
                    onChange: (e) => setRootMetadataInput(e.target.value),
                    className: "mt-3 w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 font-mono text-xs text-white outline-none focus:border-cyan-500"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isSaving,
                    className: "rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50",
                    children: "Create And Open Builder"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "/admin/family",
                    className: "rounded-md border border-gray-600 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-700/60",
                    children: "Cancel"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("aside", { className: "rounded-2xl border border-gray-700 bg-gray-800/40 p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-cyan-400", children: "~/builder-notes" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-2 text-xl font-semibold text-white", children: "Why Separate `new` And `edit`" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-3 text-sm text-gray-400", children: [
            /* @__PURE__ */ jsx("li", { children: "`new` stays focused on tree setup and the first root card." }),
            /* @__PURE__ */ jsx("li", { children: "`edit` becomes a dedicated builder with live chart, quick actions, and person inspector." }),
            /* @__PURE__ */ jsx("li", { children: "This follows the family-chart demo better than one overloaded admin screen." })
          ] })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    error && /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300", children: error }),
    isLoading ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-gray-700 bg-gray-800/40 p-8 text-sm text-gray-400", children: "Loading family builder..." }) : !detail || !treeId ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-red-500/40 bg-red-500/10 p-8 text-sm text-red-300", children: "Family tree detail not available." }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-gray-700 bg-gray-800/40 p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-cyan-400", children: "~/tree-config" }),
            /* @__PURE__ */ jsx("h2", { className: "mt-2 text-xl font-semibold text-white", children: detail.tree.name }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-400", children: "Tree settings stay in one top row so the builder canvas and inspector below can stay focused." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-gray-700 bg-gray-900/40 px-3 py-3", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-white", children: stats.people }),
              /* @__PURE__ */ jsx("div", { className: "text-[11px] uppercase tracking-wide text-gray-400", children: "People" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-gray-700 bg-gray-900/40 px-3 py-3", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-white", children: stats.relationships }),
              /* @__PURE__ */ jsx("div", { className: "text-[11px] uppercase tracking-wide text-gray-400", children: "Links" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-gray-700 bg-gray-900/40 px-3 py-3", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-white", children: stats.living }),
              /* @__PURE__ */ jsx("div", { className: "text-[11px] uppercase tracking-wide text-gray-400", children: "Living" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSaveTree, className: "mt-5 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,1.6fr)_220px_auto] xl:items-end", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: treeForm.name || "",
              onChange: (e) => setTreeForm((prev) => ({ ...prev, name: e.target.value })),
              className: "w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: treeForm.slug || "",
              onChange: (e) => setTreeForm((prev) => ({ ...prev, slug: e.target.value })),
              className: "w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
            }
          ),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 2,
              value: treeForm.description || "",
              onChange: (e) => setTreeForm((prev) => ({
                ...prev,
                description: e.target.value
              })),
              className: "w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
            }
          ),
          /* @__PURE__ */ jsx(
            TechCheckboxField,
            {
              label: "Public tree",
              checked: Boolean(treeForm.isPublic),
              onChange: (value) => setTreeForm((prev) => ({
                ...prev,
                isPublic: value
              }))
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 xl:justify-end", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleDeleteTree,
                disabled: isSaving,
                className: "rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:opacity-50",
                children: "Delete Tree"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: isSaving,
                className: "rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50",
                children: "Save Tree Settings"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 rounded-2xl border border-gray-700 bg-gray-800/40 p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-cyan-400", children: "~/visual-builder" }),
            /* @__PURE__ */ jsx("h2", { className: "mt-2 text-xl font-semibold text-white", children: "Tree Canvas" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-400", children: "Click a card to focus and open the inspector. This matches the flexible editing flow you were pointing at in the family-chart demo." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => window.dispatchEvent(new CustomEvent("family:fit")),
                className: "rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-200 transition hover:bg-gray-700/60",
                children: "Fit"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => window.dispatchEvent(new CustomEvent("family:center-main")),
                className: "rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-200 transition hover:bg-gray-700/60",
                children: "Center Main"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => window.dispatchEvent(
                  new CustomEvent("family:set-orientation", {
                    detail: { vertical: true }
                  })
                ),
                className: "rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-200 transition hover:bg-gray-700/60",
                children: "Vertical"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => window.dispatchEvent(
                  new CustomEvent("family:set-orientation", {
                    detail: { vertical: false }
                  })
                ),
                className: "rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-200 transition hover:bg-gray-700/60",
                children: "Horizontal"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-700 bg-gray-900/30 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-white", children: "Canvas Actions" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-400", children: "Select a person directly on the tree, then add relatives from here like the family-chart builder flow." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300", children: selectedPerson ? `Selected: ${selectedPerson.displayName}` : "Select a person in the canvas" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => beginRelationAction("father"),
                disabled: !selectedPerson,
                className: "rounded-xl border border-cyan-500/30 border-dashed bg-cyan-500/5 px-4 py-4 text-left transition hover:bg-cyan-500/10 disabled:opacity-40",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-cyan-300", children: "+ Add Father" }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-gray-400", children: "Attach a father to the selected person" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => beginRelationAction("mother"),
                disabled: !selectedPerson,
                className: "rounded-xl border border-pink-500/30 border-dashed bg-pink-500/5 px-4 py-4 text-left transition hover:bg-pink-500/10 disabled:opacity-40",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-pink-300", children: "+ Add Mother" }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-gray-400", children: "Attach a mother to the selected person" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => beginRelationAction("spouse"),
                disabled: !selectedPerson,
                className: "rounded-xl border border-amber-500/30 border-dashed bg-amber-500/5 px-4 py-4 text-left transition hover:bg-amber-500/10 disabled:opacity-40",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-amber-300", children: "+ Add Spouse" }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-gray-400", children: "Link a spouse directly from the canvas" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => beginRelationAction("son"),
                disabled: !selectedPerson,
                className: "rounded-xl border border-cyan-500/30 border-dashed bg-cyan-500/5 px-4 py-4 text-left transition hover:bg-cyan-500/10 disabled:opacity-40",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-cyan-300", children: "+ Add Son" }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-gray-400", children: "Add a son under the selected person" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => beginRelationAction("daughter"),
                disabled: !selectedPerson,
                className: "rounded-xl border border-pink-500/30 border-dashed bg-pink-500/5 px-4 py-4 text-left transition hover:bg-pink-500/10 disabled:opacity-40",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-pink-300", children: "+ Add Daughter" }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-gray-400", children: "Add a daughter under the selected person" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-gray-700 bg-gray-900/30 p-3", children: /* @__PURE__ */ jsx(
              FamilyTreeChart,
              {
                detail,
                currentSlug: detail.tree.slug,
                enableCrossTreeNavigation: false,
                onSelectPerson: handleChartSelectPerson,
                enableInlineAdd: true,
                onInlineCreateRelative: handleCanvasInlineCreateRelative,
                sortChildrenBy: "metadata.birth_order",
                sortAscending: true,
                showSiblings: true,
                ancestryDepth: 6,
                progenyDepth: 5
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-700 bg-gray-900/30 p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-white", children: "Relationships" }),
              /* @__PURE__ */ jsx("div", { className: "mt-3 max-h-60 space-y-2 overflow-y-auto pr-1", children: detail.relationships.map((relationship) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "rounded-lg border border-gray-700 bg-gray-900/40 px-3 py-2 text-sm text-gray-300",
                  children: buildRelationshipSummary(relationship, peopleById)
                },
                relationship.id
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("aside", { className: "space-y-5 rounded-xl border border-gray-700 bg-gray-900/30 p-4 xl:sticky xl:top-5", children: !selectedPerson ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-gray-700 bg-gray-900/40 p-5 text-sm text-gray-400", children: "Select a person from the chart to open the inspector." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-cyan-400", children: "~/inspector" }),
              /* @__PURE__ */ jsx("h2", { className: "mt-2 text-lg font-semibold text-white", children: selectedAction ? relationTitle : selectedPerson.displayName }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-400", children: selectedAction ? "Create a related person directly from the selected node." : "Edit the selected person and use quick actions to grow the tree." })
            ] }),
            !selectedAction ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => beginRelationAction("father"),
                    className: "rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20",
                    children: "Add Father"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => beginRelationAction("mother"),
                    className: "rounded-md border border-pink-500/30 bg-pink-500/10 px-3 py-2 text-sm font-semibold text-pink-300 transition hover:bg-pink-500/20",
                    children: "Add Mother"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => beginRelationAction("son"),
                    className: "rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20",
                    children: "Add Son"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => beginRelationAction("daughter"),
                    className: "rounded-md border border-pink-500/30 bg-pink-500/10 px-3 py-2 text-sm font-semibold text-pink-300 transition hover:bg-pink-500/20",
                    children: "Add Daughter"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => beginRelationAction("spouse"),
                    className: "col-span-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20",
                    children: "Add Spouse"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleSavePerson, className: "space-y-3", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: personForm.displayName || "",
                    onChange: (e) => setPersonForm((prev) => ({
                      ...prev,
                      displayName: e.target.value
                    })),
                    required: true,
                    className: "w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "First Name",
                      value: personForm.firstName || "",
                      onChange: (e) => setPersonForm((prev) => ({
                        ...prev,
                        firstName: e.target.value
                      })),
                      className: "rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "Last Name",
                      value: personForm.lastName || "",
                      onChange: (e) => setPersonForm((prev) => ({
                        ...prev,
                        lastName: e.target.value
                      })),
                      className: "rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsx(
                    TechSelect,
                    {
                      value: personForm.gender || "unknown",
                      onChange: (value) => setPersonForm((prev) => ({
                        ...prev,
                        gender: value
                      })),
                      options: genderSelectOptions,
                      label: "Gender"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    TechCheckboxField,
                    {
                      label: "Is Living",
                      checked: Boolean(personForm.isLiving),
                      onChange: (value) => setPersonForm((prev) => ({
                        ...prev,
                        isLiving: value
                      }))
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    TechDateField,
                    {
                      label: "Birth Date",
                      value: personForm.birthDate,
                      onChange: (value) => setPersonForm((prev) => ({
                        ...prev,
                        birthDate: value
                      }))
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    TechDateField,
                    {
                      label: "Death Date",
                      value: personForm.deathDate,
                      onChange: (value) => setPersonForm((prev) => ({
                        ...prev,
                        deathDate: value
                      }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    rows: 2,
                    placeholder: "Notes",
                    value: personForm.notes || "",
                    onChange: (e) => setPersonForm((prev) => ({
                      ...prev,
                      notes: e.target.value
                    })),
                    className: "w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    rows: 3,
                    placeholder: "Metadata JSON",
                    value: personMetadataInput,
                    onChange: (e) => setPersonMetadataInput(e.target.value),
                    className: "w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 font-mono text-xs text-white outline-none focus:border-cyan-500"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: isSaving,
                      className: "rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50",
                      children: "Save Person"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setTreeForm((prev) => ({
                        ...prev,
                        defaultMainPersonId: selectedPerson.id
                      })),
                      className: "rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20",
                      children: "Set As Main"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleDeletePerson,
                      disabled: isSaving,
                      className: "rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:opacity-50",
                      children: "Delete"
                    }
                  )
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleQuickAdd, className: "space-y-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: personForm.displayName || "",
                  onChange: (e) => setPersonForm((prev) => ({
                    ...prev,
                    displayName: e.target.value
                  })),
                  required: true,
                  placeholder: "Display Name",
                  className: "w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "First Name",
                    value: personForm.firstName || "",
                    onChange: (e) => setPersonForm((prev) => ({
                      ...prev,
                      firstName: e.target.value
                    })),
                    className: "rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Last Name",
                    value: personForm.lastName || "",
                    onChange: (e) => setPersonForm((prev) => ({
                      ...prev,
                      lastName: e.target.value
                    })),
                    className: "rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsx(
                  TechSelect,
                  {
                    value: personForm.gender || "unknown",
                    onChange: (value) => setPersonForm((prev) => ({
                      ...prev,
                      gender: value
                    })),
                    options: genderSelectOptions,
                    label: "Gender"
                  }
                ),
                /* @__PURE__ */ jsx(
                  TechDateField,
                  {
                    label: "Birth Date",
                    value: personForm.birthDate,
                    onChange: (value) => setPersonForm((prev) => ({
                      ...prev,
                      birthDate: value
                    }))
                  }
                )
              ] }),
              (selectedAction === "son" || selectedAction === "daughter") && spouseOptions.length > 0 && /* @__PURE__ */ jsx(
                TechSelect,
                {
                  value: coParentId ?? "",
                  onChange: (value) => setCoParentId(value ? Number(value) : null),
                  options: [
                    {
                      value: "",
                      label: `Only connect ${selectedPerson.displayName}`
                    },
                    ...spouseOptions.map((spouse) => ({
                      value: spouse.id,
                      label: `Connect spouse too: ${spouse.displayName}`
                    }))
                  ],
                  label: "Co Parent"
                }
              ),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 2,
                  placeholder: "Notes",
                  value: personForm.notes || "",
                  onChange: (e) => setPersonForm((prev) => ({
                    ...prev,
                    notes: e.target.value
                  })),
                  className: "w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                }
              ),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  placeholder: "Metadata JSON",
                  value: personMetadataInput,
                  onChange: (e) => setPersonMetadataInput(e.target.value),
                  className: "w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 font-mono text-xs text-white outline-none focus:border-cyan-500"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isSaving,
                    className: "rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50",
                    children: "Create Relation"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: resetInspectorForm,
                    className: "rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-300 transition hover:bg-gray-700/60",
                    children: "Cancel"
                  }
                )
              ] })
            ] })
          ] }) })
        ] })
      ] })
    ] })
  ] });
};

export { FamilyTreeBuilder as F };
