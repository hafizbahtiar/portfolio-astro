import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { z as maybeRenderHead, a3 as addAttribute, Q as renderTemplate } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { r as renderScript } from './Background_CT-Pdz5l.mjs';
import { T as TextEditor } from './TextEditor_DzcJYdss.mjs';
import { clsx } from 'clsx';
import { jsx, jsxs } from 'react/jsx-runtime';
import { createContext, forwardRef, useRef, useState, useMemo, useImperativeHandle, useCallback, useEffect, useContext } from 'react';
import MapLibreGL from 'maplibre-gl';
/* empty css                   */
import { createPortal } from 'react-dom';
import { Plus, Minus, Loader2, Locate, Maximize } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const $$TechDateInput = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TechDateInput;
  const {
    label,
    name,
    value = "",
    required = false,
    class: className = "",
    id: inputId = `${name}-input`,
    placeholder
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`space-y-2 ${className}`, "class")}> <label class="block text-sm font-medium text-gray-400 font-mono tracking-wide"${addAttribute(inputId, "for")}> ${`// ${label}`} </label> <input${addAttribute(inputId, "id")} type="date"${addAttribute(name, "name")}${addAttribute(value, "value")}${addAttribute(required, "required")}${addAttribute(placeholder, "placeholder")} class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all font-mono text-sm"> </div>`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/TechDateInput.astro", void 0);

const $$TechMultiDropdown = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TechMultiDropdown;
  const {
    label,
    name,
    options,
    placeholder = "Select options",
    values = [],
    class: className = "",
    id: inputId = `${name}-input`
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`tech-multi-dropdown-container space-y-2 ${className}`, "class")}${addAttribute(name, "data-name")} data-astro-cid-m6ciqikm> <label class="block text-sm font-medium text-gray-400 font-mono tracking-wide"${addAttribute(inputId, "for")} data-astro-cid-m6ciqikm> ${`// ${label}`} </label> <div class="relative" data-astro-cid-m6ciqikm> <input${addAttribute(inputId, "id")} type="hidden"${addAttribute(name, "name")}${addAttribute(JSON.stringify(values), "value")} class="dropdown-input"${addAttribute(placeholder, "data-placeholder")} data-astro-cid-m6ciqikm> <button type="button" class="dropdown-trigger w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-left text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all flex justify-between items-center group hover:border-cyan-500/50" data-astro-cid-m6ciqikm> <span class="selected-text font-mono text-sm text-gray-300 group-hover:text-cyan-400 transition-colors truncate" data-astro-cid-m6ciqikm> ${placeholder} </span> <div class="flex items-center text-gray-500 group-hover:text-cyan-500 transition-colors" data-astro-cid-m6ciqikm> <span class="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity font-mono hidden sm:inline-block" data-astro-cid-m6ciqikm>[MULTI]</span> <svg class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-m6ciqikm> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-m6ciqikm></path> </svg> </div> </button> <div class="dropdown-menu hidden absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl transform origin-top transition-all duration-200" data-astro-cid-m6ciqikm> <ul class="max-h-60 overflow-y-auto py-1 custom-scrollbar" data-astro-cid-m6ciqikm> ${options.map((option) => renderTemplate`<li data-astro-cid-m6ciqikm> <button type="button" class="dropdown-item w-full text-left px-4 py-2 text-sm font-mono text-gray-300 hover:bg-cyan-900/20 hover:text-cyan-400 transition-colors flex items-center justify-between group"${addAttribute(option.value, "data-value")} data-astro-cid-m6ciqikm> <span data-astro-cid-m6ciqikm>${option.label}</span> <span class="indicator opacity-0 group-hover:opacity-100 text-cyan-500 font-bold" data-astro-cid-m6ciqikm>
_
</span> </button> </li>`)} </ul> </div> </div> </div>  ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/TechMultiDropdown.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/TechMultiDropdown.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function getDocumentTheme() {
  if (typeof document === "undefined") return null;
  if (document.documentElement.classList.contains("dark")) return "dark";
  if (document.documentElement.classList.contains("light")) return "light";
  return null;
}
function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function useResolvedTheme(themeProp) {
  const [detectedTheme, setDetectedTheme] = useState(
    () => getDocumentTheme() ?? getSystemTheme()
  );
  useEffect(() => {
    if (themeProp) return;
    const observer = new MutationObserver(() => {
      const docTheme = getDocumentTheme();
      if (docTheme) {
        setDetectedTheme(docTheme);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e) => {
      if (!getDocumentTheme()) {
        setDetectedTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [themeProp]);
  return themeProp ?? detectedTheme;
}
const MapContext = createContext(null);
function getViewport(map) {
  const center = map.getCenter();
  return {
    center: [center.lng, center.lat],
    zoom: map.getZoom(),
    bearing: map.getBearing(),
    pitch: map.getPitch()
  };
}
function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}
const defaultStyles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
};
const DefaultLoader = () => /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
  /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full bg-muted-foreground/60 animate-pulse" }),
  /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" }),
  /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" })
] }) });
const Map = forwardRef(function Map2({
  children,
  className,
  theme: themeProp,
  styles,
  projection,
  viewport,
  onViewportChange,
  ...props
}, ref) {
  const containerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const currentStyleRef = useRef(null);
  const styleTimeoutRef = useRef(null);
  const internalUpdateRef = useRef(false);
  const resolvedTheme = useResolvedTheme(themeProp);
  const isControlled = viewport !== void 0 && onViewportChange !== void 0;
  const onViewportChangeRef = useRef(onViewportChange);
  onViewportChangeRef.current = onViewportChange;
  const mapStyles = useMemo(
    () => ({
      dark: styles?.dark ?? defaultStyles.dark,
      light: styles?.light ?? defaultStyles.light
    }),
    [styles]
  );
  useImperativeHandle(ref, () => mapInstance, [mapInstance]);
  const clearStyleTimeout = useCallback(() => {
    if (styleTimeoutRef.current) {
      clearTimeout(styleTimeoutRef.current);
      styleTimeoutRef.current = null;
    }
  }, []);
  useEffect(() => {
    if (!containerRef.current) return;
    const initialStyle = resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;
    currentStyleRef.current = initialStyle;
    const map = new MapLibreGL.Map({
      container: containerRef.current,
      style: initialStyle,
      renderWorldCopies: false,
      attributionControl: {
        compact: true
      },
      ...props,
      ...viewport
    });
    map.getCanvas().removeAttribute("tabindex");
    const styleDataHandler = () => {
      clearStyleTimeout();
      styleTimeoutRef.current = setTimeout(() => {
        setIsStyleLoaded(true);
        if (projection) {
          map.setProjection(projection);
        }
      }, 100);
    };
    const loadHandler = () => setIsLoaded(true);
    const handleMove = () => {
      if (internalUpdateRef.current) return;
      onViewportChangeRef.current?.(getViewport(map));
    };
    map.on("load", loadHandler);
    map.on("styledata", styleDataHandler);
    map.on("move", handleMove);
    setMapInstance(map);
    return () => {
      clearStyleTimeout();
      map.off("load", loadHandler);
      map.off("styledata", styleDataHandler);
      map.off("move", handleMove);
      map.remove();
      setIsLoaded(false);
      setIsStyleLoaded(false);
      setMapInstance(null);
    };
  }, []);
  useEffect(() => {
    if (!mapInstance || !isControlled || !viewport) return;
    if (mapInstance.isMoving()) return;
    const current = getViewport(mapInstance);
    const next = {
      center: viewport.center ?? current.center,
      zoom: viewport.zoom ?? current.zoom,
      bearing: viewport.bearing ?? current.bearing,
      pitch: viewport.pitch ?? current.pitch
    };
    if (next.center[0] === current.center[0] && next.center[1] === current.center[1] && next.zoom === current.zoom && next.bearing === current.bearing && next.pitch === current.pitch) {
      return;
    }
    internalUpdateRef.current = true;
    mapInstance.jumpTo(next);
    internalUpdateRef.current = false;
  }, [mapInstance, isControlled, viewport]);
  useEffect(() => {
    if (!mapInstance || !resolvedTheme) return;
    const newStyle = resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;
    if (currentStyleRef.current === newStyle) return;
    clearStyleTimeout();
    currentStyleRef.current = newStyle;
    setIsStyleLoaded(false);
    mapInstance.setStyle(newStyle, { diff: true });
  }, [mapInstance, resolvedTheme, mapStyles, clearStyleTimeout]);
  const contextValue = useMemo(
    () => ({
      map: mapInstance,
      isLoaded: isLoaded && isStyleLoaded
    }),
    [mapInstance, isLoaded, isStyleLoaded]
  );
  return /* @__PURE__ */ jsx(MapContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: cn("relative w-full h-full", className),
      children: [
        !isLoaded && /* @__PURE__ */ jsx(DefaultLoader, {}),
        mapInstance && children
      ]
    }
  ) });
});
const MarkerContext = createContext(null);
function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error("Marker components must be used within MapMarker");
  }
  return context;
}
function MapMarker({
  longitude,
  latitude,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onDragStart,
  onDrag,
  onDragEnd,
  draggable = false,
  ...markerOptions
}) {
  const { map } = useMap();
  const callbacksRef = useRef({
    onClick,
    onMouseEnter,
    onMouseLeave,
    onDragStart,
    onDrag,
    onDragEnd
  });
  callbacksRef.current = {
    onClick,
    onMouseEnter,
    onMouseLeave,
    onDragStart,
    onDrag,
    onDragEnd
  };
  const marker = useMemo(() => {
    const markerInstance = new MapLibreGL.Marker({
      ...markerOptions,
      element: document.createElement("div"),
      draggable
    }).setLngLat([longitude, latitude]);
    const handleClick = (e) => callbacksRef.current.onClick?.(e);
    const handleMouseEnter = (e) => callbacksRef.current.onMouseEnter?.(e);
    const handleMouseLeave = (e) => callbacksRef.current.onMouseLeave?.(e);
    markerInstance.getElement()?.addEventListener("click", handleClick);
    markerInstance.getElement()?.addEventListener("mouseenter", handleMouseEnter);
    markerInstance.getElement()?.addEventListener("mouseleave", handleMouseLeave);
    const handleDragStart = () => {
      const lngLat = markerInstance.getLngLat();
      callbacksRef.current.onDragStart?.({ lng: lngLat.lng, lat: lngLat.lat });
    };
    const handleDrag = () => {
      const lngLat = markerInstance.getLngLat();
      callbacksRef.current.onDrag?.({ lng: lngLat.lng, lat: lngLat.lat });
    };
    const handleDragEnd = () => {
      const lngLat = markerInstance.getLngLat();
      callbacksRef.current.onDragEnd?.({ lng: lngLat.lng, lat: lngLat.lat });
    };
    markerInstance.on("dragstart", handleDragStart);
    markerInstance.on("drag", handleDrag);
    markerInstance.on("dragend", handleDragEnd);
    return markerInstance;
  }, []);
  useEffect(() => {
    if (!map) return;
    marker.addTo(map);
    return () => {
      marker.remove();
    };
  }, [map]);
  if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
    marker.setLngLat([longitude, latitude]);
  }
  if (marker.isDraggable() !== draggable) {
    marker.setDraggable(draggable);
  }
  const currentOffset = marker.getOffset();
  const newOffset = markerOptions.offset ?? [0, 0];
  const [newOffsetX, newOffsetY] = Array.isArray(newOffset) ? newOffset : [newOffset.x, newOffset.y];
  if (currentOffset.x !== newOffsetX || currentOffset.y !== newOffsetY) {
    marker.setOffset(newOffset);
  }
  if (marker.getRotation() !== markerOptions.rotation) {
    marker.setRotation(markerOptions.rotation ?? 0);
  }
  if (marker.getRotationAlignment() !== markerOptions.rotationAlignment) {
    marker.setRotationAlignment(markerOptions.rotationAlignment ?? "auto");
  }
  if (marker.getPitchAlignment() !== markerOptions.pitchAlignment) {
    marker.setPitchAlignment(markerOptions.pitchAlignment ?? "auto");
  }
  return /* @__PURE__ */ jsx(MarkerContext.Provider, { value: { marker, map }, children });
}
function MarkerContent({ children, className }) {
  const { marker } = useMarkerContext();
  return createPortal(
    /* @__PURE__ */ jsx("div", { className: cn("relative cursor-pointer", className), children: children || /* @__PURE__ */ jsx(DefaultMarkerIcon, {}) }),
    marker.getElement()
  );
}
function DefaultMarkerIcon() {
  return /* @__PURE__ */ jsx("div", { className: "relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" });
}
const positionClasses = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-10 right-2"
};
function ControlGroup({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col rounded-md border border-border bg-background shadow-sm overflow-hidden [&>button:not(:last-child)]:border-b [&>button:not(:last-child)]:border-border", children });
}
function ControlButton({
  onClick,
  label,
  children,
  disabled = false
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      "aria-label": label,
      type: "button",
      className: cn(
        "flex items-center justify-center size-8 hover:bg-accent dark:hover:bg-accent/40 transition-colors",
        disabled && "opacity-50 pointer-events-none cursor-not-allowed"
      ),
      disabled,
      children
    }
  );
}
function MapControls({
  position = "bottom-right",
  showZoom = true,
  showCompass = false,
  showLocate = false,
  showFullscreen = false,
  className,
  onLocate
}) {
  const { map } = useMap();
  const [waitingForLocation, setWaitingForLocation] = useState(false);
  const handleZoomIn = useCallback(() => {
    map?.zoomTo(map.getZoom() + 1, { duration: 300 });
  }, [map]);
  const handleZoomOut = useCallback(() => {
    map?.zoomTo(map.getZoom() - 1, { duration: 300 });
  }, [map]);
  const handleResetBearing = useCallback(() => {
    map?.resetNorthPitch({ duration: 300 });
  }, [map]);
  const handleLocate = useCallback(() => {
    setWaitingForLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude
          };
          map?.flyTo({
            center: [coords.longitude, coords.latitude],
            zoom: 14,
            duration: 1500
          });
          onLocate?.(coords);
          setWaitingForLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setWaitingForLocation(false);
        }
      );
    }
  }, [map, onLocate]);
  const handleFullscreen = useCallback(() => {
    const container = map?.getContainer();
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  }, [map]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "absolute z-10 flex flex-col gap-1.5",
        positionClasses[position],
        className
      ),
      children: [
        showZoom && /* @__PURE__ */ jsxs(ControlGroup, { children: [
          /* @__PURE__ */ jsx(ControlButton, { onClick: handleZoomIn, label: "Zoom in", children: /* @__PURE__ */ jsx(Plus, { className: "size-4" }) }),
          /* @__PURE__ */ jsx(ControlButton, { onClick: handleZoomOut, label: "Zoom out", children: /* @__PURE__ */ jsx(Minus, { className: "size-4" }) })
        ] }),
        showCompass && /* @__PURE__ */ jsx(ControlGroup, { children: /* @__PURE__ */ jsx(CompassButton, { onClick: handleResetBearing }) }),
        showLocate && /* @__PURE__ */ jsx(ControlGroup, { children: /* @__PURE__ */ jsx(
          ControlButton,
          {
            onClick: handleLocate,
            label: "Find my location",
            disabled: waitingForLocation,
            children: waitingForLocation ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsx(Locate, { className: "size-4" })
          }
        ) }),
        showFullscreen && /* @__PURE__ */ jsx(ControlGroup, { children: /* @__PURE__ */ jsx(ControlButton, { onClick: handleFullscreen, label: "Toggle fullscreen", children: /* @__PURE__ */ jsx(Maximize, { className: "size-4" }) }) })
      ]
    }
  );
}
function CompassButton({ onClick }) {
  const { map } = useMap();
  const compassRef = useRef(null);
  useEffect(() => {
    if (!map || !compassRef.current) return;
    const compass = compassRef.current;
    const updateRotation = () => {
      const bearing = map.getBearing();
      const pitch = map.getPitch();
      compass.style.transform = `rotateX(${pitch}deg) rotateZ(${-bearing}deg)`;
    };
    map.on("rotate", updateRotation);
    map.on("pitch", updateRotation);
    updateRotation();
    return () => {
      map.off("rotate", updateRotation);
      map.off("pitch", updateRotation);
    };
  }, [map]);
  return /* @__PURE__ */ jsx(ControlButton, { onClick, label: "Reset bearing to north", children: /* @__PURE__ */ jsxs(
    "svg",
    {
      ref: compassRef,
      viewBox: "0 0 24 24",
      className: "size-5 transition-transform duration-200",
      style: { transformStyle: "preserve-3d" },
      children: [
        /* @__PURE__ */ jsx("path", { d: "M12 2L16 12H12V2Z", className: "fill-red-500" }),
        /* @__PURE__ */ jsx("path", { d: "M12 2L8 12H12V2Z", className: "fill-red-300" }),
        /* @__PURE__ */ jsx("path", { d: "M12 22L16 12H12V22Z", className: "fill-muted-foreground/60" }),
        /* @__PURE__ */ jsx("path", { d: "M12 22L8 12H12V22Z", className: "fill-muted-foreground/30" })
      ]
    }
  ) });
}

const DEFAULT_LATITUDE = 3.139;
const DEFAULT_LONGITUDE = 101.6869;
const inputClass = "w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all font-mono text-sm";
const labelClass = "block text-sm font-medium text-gray-400 font-mono tracking-wide";
function MapClickHandler({ onSelect }) {
  const { map } = useMap();
  useEffect(() => {
    if (!map) return;
    const handleClick = (event) => {
      onSelect({
        latitude: event.lngLat.lat,
        longitude: event.lngLat.lng
      });
    };
    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [map, onSelect]);
  return null;
}
function ExperienceMapPicker({
  latitudeName = "latitude",
  longitudeName = "longitude",
  initialLatitude = null,
  initialLongitude = null,
  className = ""
}) {
  const [latitude, setLatitude] = useState(
    initialLatitude ?? DEFAULT_LATITUDE
  );
  const [longitude, setLongitude] = useState(
    initialLongitude ?? DEFAULT_LONGITUDE
  );
  useEffect(() => {
    setLatitude(initialLatitude ?? DEFAULT_LATITUDE);
    setLongitude(initialLongitude ?? DEFAULT_LONGITUDE);
  }, [initialLatitude, initialLongitude]);
  useEffect(() => {
    const handleExternalUpdate = (event) => {
      const detail = event.detail;
      if (!detail) return;
      if (typeof detail.latitude === "number" || detail.latitude === null) {
        setLatitude(detail.latitude ?? DEFAULT_LATITUDE);
      }
      if (typeof detail.longitude === "number" || detail.longitude === null) {
        setLongitude(detail.longitude ?? DEFAULT_LONGITUDE);
      }
    };
    window.addEventListener("experience-map:update", handleExternalUpdate);
    return () => {
      window.removeEventListener("experience-map:update", handleExternalUpdate);
    };
  }, []);
  const center = useMemo(
    () => [longitude, latitude],
    [latitude, longitude]
  );
  const zoom = 12;
  const handleSelect = (coords) => {
    setLatitude(Number(coords.latitude.toFixed(6)));
    setLongitude(Number(coords.longitude.toFixed(6)));
  };
  const handleLocate = (coords) => {
    handleSelect(coords);
  };
  const handleMarkerDrag = (coords) => {
    setLatitude(Number(coords.lat.toFixed(6)));
    setLongitude(Number(coords.lng.toFixed(6)));
  };
  const handleClear = () => {
    setLatitude(DEFAULT_LATITUDE);
    setLongitude(DEFAULT_LONGITUDE);
  };
  return /* @__PURE__ */ jsxs("div", { className: `space-y-3 ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "experience-latitude", children: "// Coordinates" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleClear,
          className: "text-xs font-mono text-gray-400 hover:text-cyan-400 transition-colors",
          children: "CLEAR"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border border-gray-700 bg-gray-900/50", children: /* @__PURE__ */ jsx("div", { className: "h-64 w-full", children: /* @__PURE__ */ jsxs(
      Map,
      {
        className: "h-full w-full",
        viewport: { center, zoom },
        onViewportChange: () => void 0,
        children: [
          /* @__PURE__ */ jsx(MapControls, { showLocate: true, onLocate: handleLocate }),
          /* @__PURE__ */ jsx(MapClickHandler, { onSelect: handleSelect }),
          /* @__PURE__ */ jsx(
            MapMarker,
            {
              latitude,
              longitude,
              draggable: true,
              onDragEnd: handleMarkerDrag,
              children: /* @__PURE__ */ jsx(MarkerContent, { children: /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" }) })
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "experience-latitude", children: "// Latitude" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            name: latitudeName,
            step: "any",
            className: inputClass,
            id: "experience-latitude",
            value: Number.isNaN(latitude) ? "" : latitude,
            onChange: (e) => setLatitude(
              e.target.value === "" ? DEFAULT_LATITUDE : Number(e.target.value)
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, htmlFor: "experience-longitude", children: "// Longitude" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            name: longitudeName,
            step: "any",
            className: inputClass,
            id: "experience-longitude",
            value: Number.isNaN(longitude) ? "" : longitude,
            onChange: (e) => setLongitude(
              e.target.value === "" ? DEFAULT_LONGITUDE : Number(e.target.value)
            )
          }
        )
      ] })
    ] })
  ] });
}

const $$ExperienceForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ExperienceForm;
  const {
    submitLabel,
    submitButtonId = "submit-btn",
    displayOrderValue = 0,
    projectOptions = [],
    projectValues = []
  } = Astro2.props;
  const cardClass = "bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6";
  const titleClass = "text-lg font-bold text-white mb-6 border-b border-gray-700 pb-4";
  const labelClass = "block text-sm font-medium text-gray-400 font-mono tracking-wide";
  const inputClass = "w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all font-mono text-sm";
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-8"> <div class="space-y-8"> <div${addAttribute(cardClass, "class")}> <h3${addAttribute(titleClass, "class")}>Experience Overview</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="space-y-2"> <label${addAttribute(labelClass, "class")} for="experience-company">// Company </label> <input id="experience-company" type="text" name="companyName" required${addAttribute(inputClass, "class")}> </div> <div class="space-y-2"> <label${addAttribute(labelClass, "class")} for="experience-role">// Role</label> <input id="experience-role" type="text" name="role" required${addAttribute(inputClass, "class")}> </div> ${renderComponent($$result, "TechDateInput", $$TechDateInput, { "label": "Start Date", "name": "startDate", "required": true })} ${renderComponent($$result, "TechDateInput", $$TechDateInput, { "label": "End Date", "name": "endDate", "id": "experience-end-date" })} <div class="space-y-2 md:col-span-2"> <label${addAttribute(labelClass, "class")} for="experience-is-current">
// Current Company
</label> <div class="flex items-center gap-3 bg-gray-900/40 border border-gray-700 rounded-lg px-4 py-2"> <input id="experience-is-current" type="checkbox" name="isCurrent" class="h-4 w-4 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500/50"> <span class="text-sm font-mono text-gray-300">
Still working here
</span> </div> </div> <div class="space-y-2 md:col-span-2"> <label${addAttribute(labelClass, "class")} for="experience-description">
// Description
</label> ${renderComponent($$result, "TextEditor", TextEditor, { "id": "experience-description", "name": "description", "content": "", "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/ui/TextEditor", "client:component-export": "TextEditor" })} </div> </div> </div> </div> <div class="space-y-8"> <div${addAttribute(cardClass, "class")}> <h3${addAttribute(titleClass, "class")}>Location & Metadata</h3> <div class="grid grid-cols-1 gap-6"> <div class="space-y-2"> <label${addAttribute(labelClass, "class")} for="experience-location">// Location</label> <input id="experience-location" type="text" name="location"${addAttribute(inputClass, "class")}> </div> ${renderComponent($$result, "ExperienceMapPicker", ExperienceMapPicker, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/admin/experiences/ExperienceMapPicker", "client:component-export": "ExperienceMapPicker" })} ${renderComponent($$result, "TechMultiDropdown", $$TechMultiDropdown, { "label": "Projects", "name": "projectIds", "options": projectOptions, "values": projectValues, "placeholder": "Select projects" })} <div class="space-y-2"> <label${addAttribute(labelClass, "class")} for="experience-display-order">
// Display Order
</label> <input id="experience-display-order" type="number" name="displayOrder"${addAttribute(displayOrderValue, "value")}${addAttribute(inputClass, "class")}> </div> </div> </div> </div> </div> <div class="flex justify-end pt-4"> <button type="submit"${addAttribute(submitButtonId, "id")} class="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-2"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path> </svg> ${submitLabel} </button> </div> ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/admin/experiences/ExperienceForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/admin/experiences/ExperienceForm.astro", void 0);

export { $$ExperienceForm as $ };
