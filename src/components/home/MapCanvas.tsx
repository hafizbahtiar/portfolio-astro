import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Map,
  MapControls,
  type MapRef,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  MapPolygon,
} from "@/components/ui/map";
import klBoundary from "./kl-boundary.json";

// The accurate coordinates for Kuala Lumpur boundary
const kualaLumpurPolygon = klBoundary;

type MapMarkerData = {
  id: number;
  company: string;
  role: string;
  date: string;
  latitude: number;
  longitude: number;
};

type MapCanvasProps = {
  markers: MapMarkerData[];
  center?: [number, number];
  zoom?: number;
};

const MapCanvas = ({
  markers,
  center = [101.68879746977579, 3.1789972504885134],
  zoom = 11,
}: MapCanvasProps) => {
  const mapRef = useRef<MapRef | null>(null);
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(markers[0]?.id ?? null);

  const markerCoordinates = useMemo(
    () =>
      new globalThis.Map(
        markers.map((marker) => [marker.id, [marker.longitude, marker.latitude] as [number, number]]),
      ),
    [markers],
  );

  useEffect(() => {
    if (!markers.some((marker) => marker.id === activeMarkerId)) {
      setActiveMarkerId(markers[0]?.id ?? null);
    }
  }, [activeMarkerId, markers]);

  useEffect(() => {
    const handleFocusMarker = (event: Event) => {
      const markerId = (event as CustomEvent<{ markerId?: number }>).detail?.markerId;
      if (typeof markerId !== "number") return;
      const coordinates = markerCoordinates.get(markerId);
      if (!coordinates) return;

      setActiveMarkerId(markerId);
      mapRef.current?.flyTo({
        center: coordinates,
        zoom: Math.max(mapRef.current.getZoom(), 13),
        duration: 1200,
      });
    };

    window.addEventListener("map-focus-marker", handleFocusMarker);
    return () => {
      window.removeEventListener("map-focus-marker", handleFocusMarker);
    };
  }, [markerCoordinates]);

  return (
    <div className="h-full w-full">
      <Map ref={mapRef} center={center} zoom={zoom} className="h-full w-full">
        <MapControls position="bottom-right" showZoom={true} showLocate={true} />

        <MapPolygon
          id="kuala-lumpur-boundary"
          coordinates={kualaLumpurPolygon}
          fillColor="#22c55e" // Light green
          fillOpacity={0.15}
          outlineColor="#16a34a"
          outlineWidth={2}
          interactive={false}
        />

        {markers.map((marker) => {
          const isActive = marker.id === activeMarkerId;
          return (
            <MapMarker
              key={marker.id}
              longitude={marker.longitude}
              latitude={marker.latitude}
              onClick={() => setActiveMarkerId(marker.id)}
            >
              <MarkerContent className="relative">
                <div
                  className={`h-3 w-3 rounded-full transition-all ${isActive
                    ? "bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.95)] scale-125"
                    : "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                    }`}
                />
                <MarkerLabel
                  className={`text-[11px] ${isActive ? "text-cyan-200" : "text-white"}`}
                >
                  {marker.company}
                </MarkerLabel>
              </MarkerContent>
              <MarkerPopup closeButton={true}>
                <div className="text-sm font-semibold text-black">
                  {marker.company} ({marker.role})
                </div>
                <div className="text-xs text-black">{marker.date}</div>
              </MarkerPopup>
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
};

export default MapCanvas;
