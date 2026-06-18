import { isTag, isText, type ChildNode, type Element } from "domhandler";
import { escapeAttribute, escapeText } from "entities";
import { parseDocument } from "htmlparser2";

const ALLOWED_TAGS = new Set([
  "a",
  "blockquote",
  "br",
  "code",
  "del",
  "em",
  "h2",
  "h3",
  "h4",
  "hr",
  "li",
  "ol",
  "p",
  "pre",
  "s",
  "span",
  "strong",
  "sub",
  "sup",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
]);

const VOID_TAGS = new Set(["br", "hr"]);

const ALLOWED_ATTRS = new Map<string, Set<string>>([
  ["a", new Set(["href", "name", "target", "rel", "class"])],
  ["code", new Set(["class"])],
  ["p", new Set(["class"])],
  ["pre", new Set(["class"])],
  ["span", new Set(["class"])],
  ["table", new Set(["class"])],
  ["td", new Set(["colspan", "rowspan", "class"])],
  ["th", new Set(["colspan", "rowspan", "class"])],
]);

const SAFE_HREF_PATTERN = /^(https?:|mailto:|tel:|#|\/(?!\/))/i;
const DROPPED_CONTENT_TAGS = new Set(["script", "style"]);

const renderAttrs = (node: Element, tagName: string): string => {
  const allowedAttrs = ALLOWED_ATTRS.get(tagName) ?? new Set<string>();
  const attrs: string[] = [];

  for (const [rawName, rawValue] of Object.entries(node.attribs)) {
    const name = rawName.toLowerCase();
    const value = rawValue.trim();

    if (!allowedAttrs.has(name) || name.startsWith("on")) {
      continue;
    }

    if (name === "href" && !SAFE_HREF_PATTERN.test(value)) {
      continue;
    }

    if (tagName === "a" && name === "rel") {
      continue;
    }

    attrs.push(`${name}="${escapeAttribute(value)}"`);
  }

  if (tagName === "a") {
    attrs.push('rel="noopener noreferrer"');
  }

  return attrs.length > 0 ? ` ${attrs.join(" ")}` : "";
};

const renderNode = (node: ChildNode): string => {
  if (isText(node)) {
    return escapeText(node.data);
  }

  if (!isTag(node)) {
    return "";
  }

  const tagName = node.name.toLowerCase();
  if (DROPPED_CONTENT_TAGS.has(tagName)) {
    return "";
  }

  const children = node.children.map(renderNode).join("");
  if (!ALLOWED_TAGS.has(tagName)) {
    return children;
  }

  const attrs = renderAttrs(node, tagName);
  if (VOID_TAGS.has(tagName)) {
    return `<${tagName}${attrs}>`;
  }

  return `<${tagName}${attrs}>${children}</${tagName}>`;
};

export const sanitizeRichHtml = (html: string): string => {
  const document = parseDocument(html, {
    decodeEntities: true,
    lowerCaseAttributeNames: true,
    lowerCaseTags: true,
  });

  return document.children.map(renderNode).join("");
};

export const serializeJsonForHtml = (value: unknown): string => {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
};
