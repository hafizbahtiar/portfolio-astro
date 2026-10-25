// Errors under each field, for admin forms marked `novalidate` (the browser's own bubble is easy to
// miss and blocks Save silently when the bad field is on a hidden tab). Understands DatePicker's own
// error line and the API's "field: message; field: message" validation errors.

export interface FormErrorsOptions {
  /** Field name -> label, used when the field has no visible label (lists, hidden inputs). */
  labels?: Record<string, string>;
  /** API field name -> element id, for fields that are a list rather than one input (sources, victims). */
  targets?: Record<string, string>;
  /** Called with the first bad field before it is focused - e.g. open its tab. */
  reveal?: (el: HTMLElement) => void;
}

const LINE_CLASS = "form-field-error text-xs/5 text-red-600 dark:text-red-400";

export function formErrors(form: HTMLFormElement, opts: FormErrorsOptions = {}) {
  const labels = opts.labels ?? {};
  const targets = opts.targets ?? {};
  const listIds = new Set(Object.values(targets));

  const box = (el: Element) => el.closest(".space-y-2") ?? el.parentElement!;
  const labelOf = (el: Element, name?: string) =>
    (name && targets[name] && labels[name]) ||
    box(el).querySelector(".admin-label, label")?.textContent?.trim() ||
    labels[(el as HTMLInputElement).name] ||
    (el as HTMLInputElement).name ||
    name ||
    "";
  const target = (name: string) =>
    targets[name]
      ? document.getElementById(targets[name])
      : form.querySelector<HTMLElement>(`[name="${CSS.escape(name)}"]`);

  const set = (el: HTMLElement, msg: string) => {
    const picker = el.closest("[data-datepicker]");
    if (picker) {
      // DatePicker has its own error line; it clears it when a date is picked.
      picker.querySelector("[data-error]")!.textContent = msg;
      picker.querySelector("[data-text]")!.setAttribute("aria-invalid", "true");
      return;
    }
    el.setAttribute("aria-invalid", "true");
    const b = box(el);
    let line = b.querySelector<HTMLElement>(":scope > .form-field-error");
    if (!line) {
      line = document.createElement("p");
      line.className = LINE_CLASS;
      b.append(line);
    }
    line.textContent = msg;
  };
  const clearOne = (el: Element) => {
    el.removeAttribute("aria-invalid");
    box(el).querySelector(":scope > .form-field-error")?.remove();
  };
  const clear = () => {
    for (const line of form.querySelectorAll(".form-field-error")) line.remove();
    for (const el of form.querySelectorAll("[aria-invalid]")) el.removeAttribute("aria-invalid");
    for (const line of form.querySelectorAll("[data-datepicker] [data-error]")) line.textContent = "";
  };
  // Fixing a field clears its error.
  form.addEventListener("input", (e) => {
    const el = e.target as HTMLElement;
    clearOne(el);
    const list = el.closest<HTMLElement>("[id]");
    if (list && listIds.has(list.id)) clearOne(list);
  });

  /** Shows each error under its field, reveals + focuses the first; returns "Label: message" lines. */
  const show = (errors: [HTMLElement | null, string, string?][]) => {
    const lines: string[] = [];
    for (const [el, msg, name] of errors) {
      if (el) set(el, msg);
      const label = el ? labelOf(el, name) : name ? labels[name] ?? name : "";
      lines.push(label ? `${label}: ${msg}` : msg);
    }
    const first = errors.find(([el]) => el)?.[0];
    if (first) {
      opts.reveal?.(first);
      (first.closest("[data-datepicker]")?.querySelector<HTMLElement>("[data-text]") ?? first).focus();
    }
    return lines;
  };

  return {
    clear,
    /** Browser constraints (required, min/max, step, DatePicker). null = all valid. */
    check(): string[] | null {
      clear();
      const bad = [...form.elements].filter(
        (el): el is HTMLInputElement | HTMLTextAreaElement =>
          (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) && !el.checkValidity(),
      );
      return bad.length ? show(bad.map((el) => [el, el.validationMessage])) : null;
    },
    /** The API's 400 error ("field: message; ..."), shown per field. null = not a validation error. */
    fromApi(error: unknown): string[] | null {
      const raw = (error as { data?: { error?: string } })?.data?.error;
      if (!raw) return null;
      return show(
        raw.split("; ").map((part) => {
          const m = /^([\w.]+): (.+)$/.exec(part);
          return m ? [target(m[1]), m[2], m[1]] : [null, part];
        }),
      );
    },
  };
}
