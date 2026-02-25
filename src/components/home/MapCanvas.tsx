import React from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";

type MapMarkerData = {
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
}: MapCanvasProps) => (
  <div className="h-full w-full">
    <Map center={center} zoom={zoom} className="h-full w-full">
      <MapControls position="bottom-right" showZoom={true} showLocate={true} />
      {markers.map((marker) => (
        <MapMarker
          key={`${marker.company}-${marker.role}`}
          longitude={marker.longitude}
          latitude={marker.latitude}
        >
          <MarkerContent className="relative">
            <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            <MarkerLabel className="text-[11px] text-white">
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
      ))}
    </Map>
  </div>
);

export default MapCanvas;
