import React from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";

const MapCanvas = () => (
  <div className="h-full w-full">
    <Map center={[101.68879746977579, 3.1789972504885134]} zoom={11} className="h-full w-full">
      <MapControls position="bottom-right" showZoom={true} showLocate={true} />
      <MapMarker longitude={101.72203100800152} latitude={3.2045919219587615}>
        <MarkerContent className="relative">
          <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          <MarkerLabel className="text-[11px] text-white">
            Jom Dapur Sdn Bhd
          </MarkerLabel>
        </MarkerContent>
        <MarkerPopup closeButton={true}>
          <div className="text-sm font-semibold text-black">
            Jom Dapur Sdn Bhd (Software Engineer)
          </div>
          <div className="text-xs text-black">Sep 2020 - Nov 2022</div>
        </MarkerPopup>
      </MapMarker>
      <MapMarker longitude={101.649956} latitude={3.162812}>
        <MarkerContent className="relative">
          <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          <MarkerLabel className="text-[11px] text-white">
            Laureate System Solution Sdn Bhd
          </MarkerLabel>
        </MarkerContent>
        <MarkerPopup closeButton={true}>
          <div className="text-sm font-semibold text-black">
            Laureate System Solution Sdn Bhd (Mobile Developer)
          </div>
          <div className="text-xs text-black">
            Aug 2024 - Current ({new Date().toLocaleDateString('en-MY')})
          </div>
        </MarkerPopup>
      </MapMarker>
      <MapMarker longitude={101.69440540132585} latitude={3.169587829506779}>
        <MarkerContent className="relative">
          <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          <MarkerLabel className="text-[11px] text-white">
            Securiforce Sdn Bhd
          </MarkerLabel>
        </MarkerContent>
        <MarkerPopup closeButton={true}>
          <div className="text-sm font-semibold text-black">
            Securiforce Sdn Bhd (Programmer)
          </div>
          <div className="text-xs text-black">
            Dec 2022 - Jul 2024
          </div>
        </MarkerPopup>
      </MapMarker>
    </Map>
  </div>
);

export default MapCanvas;
