import Map, { Source, Layer } from "react-map-gl";
import type { FillLayer } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";

export type ParcelMapProps = {
  width: string;
  height: string;
  accessToken: string;
  coordinates: [number, number][][];
};

const polygonLayer: FillLayer = {
  id: "polygon",
  type: "fill",
  source: "parcel-geometry-data",
  paint: {
    "fill-color": "#7CFC00",
    "fill-opacity": 0.6,
  },
};

const ParcelMap: React.FC<ParcelMapProps> = ({
  width,
  height,
  accessToken,
  coordinates,
}) => {
  const mapStyleUrl = `https://api.maptiler.com/maps/c03b9c3a-2608-48b4-b8b8-29d30f03ee55/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`;

  // Defining a geoJson FeatureCollection object that matches the map component's type
  const geoJson: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Polygon" },
        geometry: {
          type: "Polygon",
          coordinates: coordinates,
        },
      },
    ],
  };

  return (
    <div className="bg-grayContrast p-4 rounded" style={{ width, height }}>
      {/* Mapbox component */}
      <Map
        mapboxAccessToken={accessToken}
        initialViewState={{
          longitude: coordinates[0][0][0], // Using the first coordinates as initial view
          latitude: coordinates[0][0][1],
          zoom: 13,
        }}
        mapStyle={mapStyleUrl}
      >
        {/* Drawing the parcel's geometry */}
        <Source id="parcel-geometry-data" type="geojson" data={geoJson}>
          <Layer {...polygonLayer} />
        </Source>
      </Map>
    </div>
  );
};

export default ParcelMap;
