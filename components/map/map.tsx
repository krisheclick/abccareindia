'use client';

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson";

export default function IndiaMap() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="w-full flex flex-col items-center">

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1000 }}
        width={800}
        height={900}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => setSelected(geo.properties)}
                style={{
                  default: { fill: "#cbd5e1", outline: "none" },
                  hover: { fill: "#2563eb", outline: "none" },
                  pressed: { fill: "#1d4ed8", outline: "none" }
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>

      {/* POPUP */}
      {selected && (
        <div className="fixed bottom-10 bg-white shadow-xl p-4 rounded-lg">
          <h2 className="font-bold">{selected.NAME_1}</h2>
          <p>Custom district/state data here</p>

          <button
            onClick={() => setSelected(null)}
            className="mt-2 text-blue-600"
          >
            Close
          </button>
        </div>
      )}

    </div>
  );
}