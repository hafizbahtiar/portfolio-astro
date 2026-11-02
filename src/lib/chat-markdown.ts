// Light markdown for AI chat bubbles (copied from nubisport-astro src/lib/chat-markdown.ts): the model's text never
// goes into innerHTML - only elements this file builds; no images, raw HTML or attributes from the model, and links
// only to a same-site path ("/admin/...").
const INLINE = /\[([^\]]+)\]\((\/[^)\s]+)\)|(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|`[^`]+`)/g;

function inline(el: HTMLElement, text: string) {
    let last = 0;
    for (const match of text.matchAll(INLINE)) {
        const token = match[0];
        const at = match.index ?? 0;
        if (at > last) el.append(document.createTextNode(text.slice(last, at)));
        const href = match[2];
        if (match[1] && href) {
            if (href.startsWith("/") && !href.startsWith("//")) {
                const a = document.createElement("a");
                a.href = href;
                a.textContent = match[1];
                el.append(a);
            } else {
                el.append(document.createTextNode(match[1]));
            }
        } else {
            const bold = token.startsWith("**") || token.startsWith("__");
            const code = token.startsWith("`");
            const wrap = bold ? 2 : 1;
            const node = document.createElement(bold ? "strong" : code ? "code" : "em");
            node.textContent = token.slice(wrap, -wrap);
            el.append(node);
        }
        last = at + token.length;
    }
    if (last < text.length) el.append(document.createTextNode(text.slice(last)));
}

// A GFM table's header separator: `| --- | :--: |` (needs a pipe, so a bare `---` stays text).
const TABLE_SEP = /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/;
const cells = (line: string) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

function paragraph(el: HTMLElement, lines: string[]) {
    const p = document.createElement("p");
    lines.forEach((line, i) => {
        if (i) p.append(document.createElement("br"));
        inline(p, line);
    });
    el.append(p);
}

function table(head: string, rows: string[]) {
    const wrap = document.createElement("div");
    const t = document.createElement("table");
    const tr = t.createTHead().insertRow();
    const names = cells(head);
    for (const name of names) {
        const th = document.createElement("th");
        inline(th, name);
        tr.append(th);
    }
    const body = t.createTBody();
    for (const row of rows) {
        const r = body.insertRow();
        const values = cells(row);
        names.forEach((_, i) => inline(r.insertCell(), values[i] ?? ""));
    }
    wrap.append(t);
    return wrap;
}

/** Render one AI bubble. Blocks: paragraphs, short headings, lists, tables, code fences. */
export function renderMarkdown(el: HTMLElement, text: string) {
    el.replaceChildren();
    const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/);
    for (const raw of blocks) {
        const block = raw.trim();
        if (!block) continue;
        if (block.startsWith("```")) {
            const body = block.replace(/^```[^\n]*\n?/, "").replace(/\n?```$/, "");
            const pre = document.createElement("pre");
            const code = document.createElement("code");
            code.textContent = body;
            pre.append(code);
            el.append(pre);
            continue;
        }
        if (/^###\s/.test(block)) {
            const h = document.createElement("h4");
            inline(h, block.replace(/^###\s+/, ""));
            el.append(h);
            continue;
        }
        if (/^##\s/.test(block)) {
            const h = document.createElement("h3");
            inline(h, block.replace(/^##\s+/, ""));
            el.append(h);
            continue;
        }
        const lines = block.split("\n");
        // A table may follow its intro line without a blank line between them.
        const t = lines.findIndex((line, i) => line.includes("|") && (lines[i + 1] ?? "").includes("|") && TABLE_SEP.test((lines[i + 1] ?? "").trim()));
        if (t >= 0) {
            let end = t + 2;
            while (end < lines.length && lines[end].includes("|")) end++;
            if (t) paragraph(el, lines.slice(0, t));
            el.append(table(lines[t], lines.slice(t + 2, end)));
            if (end < lines.length) paragraph(el, lines.slice(end));
            continue;
        }
        if (lines.every((line) => /^[-*]\s+/.test(line))) {
            const ul = document.createElement("ul");
            for (const line of lines) {
                const li = document.createElement("li");
                inline(li, line.replace(/^[-*]\s+/, ""));
                ul.append(li);
            }
            el.append(ul);
            continue;
        }
        if (lines.every((line) => /^\d+\.\s+/.test(line))) {
            const ol = document.createElement("ol");
            for (const line of lines) {
                const li = document.createElement("li");
                inline(li, line.replace(/^\d+\.\s+/, ""));
                ol.append(li);
            }
            el.append(ol);
            continue;
        }
        paragraph(el, lines);
    }
}
