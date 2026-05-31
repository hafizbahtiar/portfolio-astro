type PublicExperience = {
  id: number;
  companyName: string;
  role: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  latitude: unknown;
  longitude: unknown;
  description: string | null;
};

type TimelineEntry = {
  id: number;
  company: string;
  role: string;
  date: string;
  description: string | null;
  isCurrent: boolean;
};

type MapMarker = {
  id: number;
  company: string;
  role: string;
  date: string;
  latitude: number;
  longitude: number;
};

type ExperienceWindow = Window & {
  __experienceMapState?: {
    markers: MapMarker[];
    center?: [number, number];
    focusedMarkerId?: number;
  };
  __expKeydown?: AbortController;
};

const experienceWindow = window as ExperienceWindow;

function escapeHtml(str: string | null | undefined) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str ?? ""));
  return div.innerHTML;
}

function formatMonthYear(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-MY", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateRange(exp: PublicExperience) {
  const start = formatMonthYear(exp.startDate);
  const end = exp.isCurrent
    ? "Present"
    : exp.endDate
      ? formatMonthYear(exp.endDate)
      : "Present";
  return `${start} – ${end}`;
}

function toCoordinate(value: unknown) {
  const coordinate = Number(value);
  return Number.isFinite(coordinate) ? coordinate : null;
}

const fallbackExperiences: PublicExperience[] = [
  {
    id: 1,
    companyName: "Laureate System Solution Sdn Bhd",
    role: "Mobile Developer",
    startDate: "2024-08-01",
    endDate: null,
    isCurrent: true,
    latitude: 3.162812,
    longitude: 101.649956,
    description: "Government procurement platform development using Flutter.",
  },
  {
    id: 2,
    companyName: "Securiforce Sdn Bhd",
    role: "Programmer",
    startDate: "2022-12-01",
    endDate: "2024-07-31",
    isCurrent: false,
    latitude: 3.169587829506779,
    longitude: 101.69440540132585,
    description: "Cash-in-transit receipt book system for security operations.",
  },
  {
    id: 3,
    companyName: "Jom Dapur Sdn Bhd",
    role: "Software Engineer",
    startDate: "2020-09-01",
    endDate: "2022-11-30",
    isCurrent: false,
    latitude: 3.2045919219587615,
    longitude: 101.72203100800152,
    description: "Full-stack development for a food delivery platform.",
  },
  {
    id: 4,
    companyName: "Associated Testing Laboratory Sdn Bhd",
    role: "Site & Lab Technician",
    startDate: "2019-05-01",
    endDate: "2020-08-31",
    isCurrent: false,
    latitude: 3.196580727512005,
    longitude: 101.67055660869626,
    description: "Laboratory testing and on-site inspections.",
  },
];

function buildSlideHTML(entry: TimelineEntry, index: number, total: number) {
  return `
    <div class="exp-slide shrink-0 w-full" data-marker-id="${entry.id}">
      <div class="flex gap-3">
        <div class="flex flex-col items-center pt-1 shrink-0">
          <div class="w-2.5 h-2.5 rounded-full bg-blue-500/80 ring-2 ring-blue-500/20 shrink-0"></div>
          ${index < total - 1 ? '<div class="w-px flex-1 bg-slate-200 dark:bg-slate-700 mt-1.5 min-h-[40px]"></div>' : ""}
        </div>
        <div class="flex-1 pb-2">
          <div class="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <h4 class="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">${escapeHtml(entry.company)}</h4>
              <p class="text-xs text-blue-400 dark:text-blue-400 mt-0.5">${escapeHtml(entry.role)}</p>
            </div>
            ${entry.isCurrent ? '<span class="text-xs px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 shrink-0">Current</span>' : ""}
          </div>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">${escapeHtml(entry.date)}</p>
          ${entry.description ? `<p class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">${escapeHtml(entry.description)}</p>` : ""}
        </div>
      </div>
    </div>`;
}

async function loadExperiences() {
  const loadingEl = document.getElementById("exp-slides-loading");
  const errorEl = document.getElementById("exp-slides-error");
  const slidesContainer = document.getElementById("exp-slides");
  const counter = document.getElementById("exp-counter");

  let experiences: PublicExperience[] = [];

  try {
    const apiUrl = `${import.meta.env.PUBLIC_API_URL || "https://api.hafizbahtiar.com/api/v1"}`;
    const response = await fetch(`${apiUrl}/experiences`);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const json = await response.json();
    experiences = json?.data || json || [];

    if (!experiences || experiences.length === 0) {
      experiences = fallbackExperiences;
    }
  } catch {
    experiences = fallbackExperiences;
    loadingEl?.classList.add("hidden");
    errorEl?.classList.remove("hidden");
  }

  const timelineEntries: TimelineEntry[] = experiences
    .slice()
    .sort((a, b) => {
      if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    })
    .map((exp) => ({
      id: exp.id,
      company: exp.companyName,
      role: exp.role,
      date: formatDateRange(exp),
      description: exp.description,
      isCurrent: exp.isCurrent,
    }));

  const mapMarkers = experiences.reduce<MapMarker[]>((markers, exp) => {
    const latitude = toCoordinate(exp.latitude);
    const longitude = toCoordinate(exp.longitude);
    if (latitude === null || longitude === null) return markers;
    markers.push({
      id: exp.id,
      company: exp.companyName,
      role: exp.role,
      date: formatDateRange(exp),
      latitude,
      longitude,
    });
    return markers;
  }, []);

  loadingEl?.classList.add("hidden");

  if (slidesContainer && timelineEntries.length > 0) {
    slidesContainer.innerHTML = timelineEntries
      .map((entry, i) => buildSlideHTML(entry, i, timelineEntries.length))
      .join("");
  }

  if (counter) counter.textContent = `1 / ${timelineEntries.length}`;

  let mapCenter: [number, number] | undefined;

  if (mapMarkers.length > 0) {
    const avgLng =
      mapMarkers.reduce((sum, marker) => sum + marker.longitude, 0) /
      mapMarkers.length;
    const avgLat =
      mapMarkers.reduce((sum, marker) => sum + marker.latitude, 0) /
      mapMarkers.length;
    mapCenter = [avgLng, avgLat];
  }

  experienceWindow.__experienceMapState = {
    markers: mapMarkers,
    center: mapCenter,
    focusedMarkerId: mapMarkers[0]?.id,
  };

  window.dispatchEvent(
    new CustomEvent("map:set-markers", { detail: { markers: mapMarkers } }),
  );

  if (mapCenter) {
    window.dispatchEvent(
      new CustomEvent("map:set-center", { detail: { center: mapCenter } }),
    );
  }

  initExpSlider();

  if (mapMarkers.length > 0) {
    window.dispatchEvent(
      new CustomEvent("map-focus-marker", {
        detail: { markerId: mapMarkers[0].id },
      }),
    );
  }
}

function initExpSlider() {
  const slides = Array.from(document.querySelectorAll<HTMLElement>(".exp-slide"));
  const slidesContainer = document.getElementById("exp-slides");
  const prevBtn = document.getElementById("exp-prev");
  const nextBtn = document.getElementById("exp-next");
  const counter = document.getElementById("exp-counter");
  const dotsContainer = document.getElementById("exp-dots");

  if (!slides.length || !slidesContainer) return;

  const slideTrack = slidesContainer;
  const total = slides.length;
  let current = 0;

  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Go to experience ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  function focusMarker(index: number) {
    const markerId = Number(slides[index]?.dataset.markerId);
    if (!Number.isNaN(markerId)) {
      window.dispatchEvent(
        new CustomEvent("map-focus-marker", { detail: { markerId } }),
      );
    }
  }

  function goTo(index: number) {
    current = Math.max(0, Math.min(total - 1, index));

    slideTrack.style.transform = `translateX(-${current * 100}%)`;

    if (counter) counter.textContent = `${current + 1} / ${total}`;
    if (prevBtn instanceof HTMLButtonElement) prevBtn.disabled = current === 0;
    if (nextBtn instanceof HTMLButtonElement) {
      nextBtn.disabled = current === total - 1;
    }

    if (dotsContainer) {
      Array.from(dotsContainer.children).forEach((dot, i) => {
        if (!(dot instanceof HTMLElement)) return;
        dot.className = `rounded-full transition-colors ${i === current
            ? "w-4 h-1.5 bg-blue-500"
            : "w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
          }`;
      });
    }

    focusMarker(current);
  }

  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));

  experienceWindow.__expKeydown?.abort();
  const kbController = new AbortController();
  experienceWindow.__expKeydown = kbController;

  let sectionVisible = false;
  const sectionEl = document.getElementById("map");
  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      sectionVisible = entry?.isIntersecting ?? false;
    },
    { threshold: 0.1 },
  );
  if (sectionEl) visibilityObserver.observe(sectionEl);

  document.addEventListener(
    "keydown",
    (e) => {
      if (!sectionVisible) return;
      const active = document.activeElement;
      if (
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        active instanceof HTMLSelectElement ||
        (active instanceof HTMLElement && active.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    },
    { signal: kbController.signal },
  );

  goTo(0);
}

loadExperiences();
document.addEventListener("astro:page-load", loadExperiences);
document.addEventListener("astro:after-swap", loadExperiences);
