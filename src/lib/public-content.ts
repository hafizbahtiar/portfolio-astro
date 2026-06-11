import type { Project } from "../types/project";
import type { Experience } from "../types/experiences";
import { API_BASE_URL } from "./config";
import {
    FALLBACK_PROJECTS,
    FALLBACK_EXPERIENCES,
    PROJECT_COPY,
} from "../data/portfolio-content";

/**
 * Server-side data loaders for the public site.
 *
 * Contract: these never throw and never return an empty list. If the API is
 * slow, down, or returns nothing, curated fallback content renders instead —
 * visitors must never see loading spinners, error banners, or empty states.
 */

const FETCH_TIMEOUT_MS = 4000;

async function fetchJson<T>(path: string): Promise<T | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/${path}`, {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });
        if (!response.ok) return null;
        const json = (await response.json()) as { success?: boolean; data?: T };
        return (json?.data as T) ?? null;
    } catch {
        return null;
    }
}

function sortProjects(projects: Project[]): Project[] {
    return projects
        .slice()
        .sort((a, b) =>
            a.featured !== b.featured
                ? a.featured
                    ? -1
                    : 1
                : (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
        );
}

export async function getPublicProjects(): Promise<Project[]> {
    const data = await fetchJson<Project[]>("projects");
    if (!data || data.length === 0) return sortProjects(FALLBACK_PROJECTS);

    // Apply curated Problem → Built → Tech → Impact copy over API records.
    return sortProjects(
        data.map((project) => {
            const copy = PROJECT_COPY[project.slug];
            return copy
                ? { ...project, title: copy.title ?? project.title, description: copy.description }
                : project;
        }),
    );
}

export async function getPublicExperiences(): Promise<Experience[]> {
    const data = await fetchJson<Experience[]>("experiences");
    const experiences = data && data.length > 0 ? data : FALLBACK_EXPERIENCES;
    return experiences.slice().sort((a, b) => {
        if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1;
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
}

export function formatMonthYear(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en-MY", {
        month: "short",
        year: "numeric",
    }).format(date);
}

export function formatDateRange(exp: Experience): string {
    const start = formatMonthYear(exp.startDate);
    const end = exp.isCurrent
        ? "Present"
        : exp.endDate
            ? formatMonthYear(exp.endDate)
            : "Present";
    return `${start} — ${end}`;
}
