// Astro server renderer for lucide-react icons used in .astro files: writes the <svg> from the icon's own data instead
// of a React render. An admin page has 50+ icons; as React renders they cost ~3.5 ms warm and ~24 ms on a cold isolate -
// enough to hit the Workers Free 10 ms CPU limit (/admin/users, /admin/roles: exceededCpu). React islands are untouched.
// Output matches lucide-react's Icon (lucide-react/dist/esm/Icon.js): same attributes, classes and aria-hidden rule.

type IconNode = [string, Record<string, string | number>][]
type Props = Record<string, unknown>

const FORWARD_REF = Symbol.for('react.forward_ref')

// shortcut: reads lucide-react's internal shape (forwardRef render -> <Icon iconNode>), re-check on a lucide-react major upgrade.
// No hooks run: a lucide icon's outer render only builds the element.
function iconOf(component: unknown, props: Props): { iconNode: IconNode; className: string } | null {
    const c = component as { $$typeof?: symbol; render?: (p: Props, ref: null) => { props?: Props } }
    if (c?.$$typeof !== FORWARD_REF || typeof c.render !== 'function') return null
    try {
        const p = c.render(props, null)?.props
        return p && Array.isArray(p.iconNode) ? { iconNode: p.iconNode as IconNode, className: String(p.className ?? '') } : null
    } catch {
        return null // another forwardRef component (it would need React to render) - left to the React renderer
    }
}

const escape = (v: unknown) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
// SVG attributes that stay camelCase (React keeps them as written); the rest go kebab like React (strokeWidth -> stroke-width).
const CAMEL = new Set(['viewBox', 'preserveAspectRatio', 'gradientUnits', 'gradientTransform', 'patternUnits', 'clipPathUnits'])
const kebab = (k: string) =>
    CAMEL.has(k) || k.startsWith('aria-') || k.startsWith('data-') ? k : k.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
const attrs = (o: Props) =>
    Object.entries(o)
        .filter(([k, v]) => k !== 'key' && v != null && v !== false && typeof v !== 'function' && typeof v !== 'object')
        .map(([k, v]) => ` ${kebab(k)}="${escape(v)}"`)
        .join('')

export default {
    name: 'lucide-svg',
    check(component: unknown, props: Props) {
        return iconOf(component, props ?? {}) !== null
    },
    renderToStaticMarkup(component: unknown, props: Props) {
        const icon = iconOf(component, props ?? {})!
        const { color = 'currentColor', size = 24, strokeWidth = 2, absoluteStrokeWidth, className: _c, class: _cl, children: _ch, ...rest } = props ?? {}
        const a11y = Object.keys(rest).some(k => k.startsWith('aria-') || k === 'role' || k === 'title')
        const svg = {
            xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color,
            strokeWidth: absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
            strokeLinecap: 'round', strokeLinejoin: 'round',
            class: ['lucide', icon.className, _cl].filter(Boolean).join(' '),
            ...(a11y ? {} : { 'aria-hidden': 'true' }),
            ...rest,
        }
        const body = icon.iconNode.map(([tag, a]) => `<${tag}${attrs(a)}></${tag}>`).join('')
        return { html: `<svg${attrs(svg)}>${body}</svg>`, attrs: {} }
    },
}
