const ALLOWED_TAGS = new Set([
  "A",
  "BLOCKQUOTE",
  "BR",
  "CODE",
  "DEL",
  "EM",
  "H2",
  "H3",
  "H4",
  "HR",
  "LI",
  "OL",
  "P",
  "PRE",
  "S",
  "SPAN",
  "STRONG",
  "SUB",
  "SUP",
  "TABLE",
  "TBODY",
  "TD",
  "TH",
  "THEAD",
  "TR",
  "U",
  "UL",
]);

const ALLOWED_ATTRS = new Map<string, Set<string>>([
  ["A", new Set(["href", "name", "target", "rel", "class"])],
  ["CODE", new Set(["class"])],
  ["P", new Set(["class"])],
  ["PRE", new Set(["class"])],
  ["SPAN", new Set(["class"])],
  ["TABLE", new Set(["class"])],
  ["TD", new Set(["colspan", "rowspan", "class"])],
  ["TH", new Set(["colspan", "rowspan", "class"])],
]);

const SAFE_URL_PATTERN = /^(https?:|mailto:|tel:|#|\/)/i;

export const sanitizeRichHtml = (html: string): string => {
  if (typeof document === "undefined") {
    return html;
  }

  const template = document.createElement("template");
  template.innerHTML = html;

  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as HTMLElement;
        if (!ALLOWED_TAGS.has(element.tagName)) {
          element.replaceWith(document.createTextNode(element.textContent || ""));
          continue;
        }

        const allowedAttrs = ALLOWED_ATTRS.get(element.tagName) ?? new Set<string>();
        for (const attr of Array.from(element.attributes)) {
          const name = attr.name.toLowerCase();
          const value = attr.value.trim();
          const allowed = allowedAttrs.has(name);
          const safeHref = name !== "href" || SAFE_URL_PATTERN.test(value);

          if (!allowed || name.startsWith("on") || !safeHref) {
            element.removeAttribute(attr.name);
          }
        }

        if (element.tagName === "A") {
          element.setAttribute("rel", "noopener noreferrer");
        }
      }
      walk(child);
    }
  };

  walk(template.content);
  return template.innerHTML;
};
