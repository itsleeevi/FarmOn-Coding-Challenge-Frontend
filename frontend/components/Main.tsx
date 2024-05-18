"use client";
import React from "react";
import useParcelData from "@/hooks/useParcelData";
import ParcelHistory from "./ParcelHistory";
import ParcelMap from "./ParcelMap";
import ParcelHistoryLegend from "./ParcelHistoryLegend";
import Spinner from "./Spinner";

interface MainProps {
  parcelId: number;
}

const Main: React.FC<MainProps> = ({ parcelId }) => {
  const { parcelData, error, loading } = useParcelData(parcelId);
  const accessToken =
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
    "pk.eyJ1IjoibGVlZXZpIiwiYSI6ImNsdzk0Z292eTJhN24ya3BkeHRucWluZXYifQ.ybewJ1BZ5OxdyUw9Xn8Iqw"; // Default test token if env var is not set

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Error loading parcel data: {error}</div>
      </div>
    );
  }

  if (!parcelData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">No parcel data available.</div>
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          Error: Mapbox access token is not defined
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Logo */}
      <h1 className="my-4 text-6xl font-black text-center">FarmOn</h1>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-grayLight rounded">
        <div className="mb-4">
          {/* Parcel Details */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="bg-grayContrast flex flex-col text-start md:w-2/3 w-full border-8 border-grayContrast p-4 rounded">
              <h1 className="text-3xl font-black mb-2">
                {parcelData.parcel_name}
              </h1>
              <h3 className="text-lg font-semibold">
                {"ID: " + parcelData.parcel_id}
              </h3>
              <h3 className="text-lg font-semibold">
                {"Owner: " + parcelData.parcel_owner}
              </h3>
              <h3 className="text-lg font-semibold">
                {"Area: " +
                  parcelData.parcel_area +
                  " " +
                  parcelData.parcel_area_unit}
              </h3>
            </div>
            {/* Mapbox Component */}
            <ParcelMap
              width="100%"
              height="300px"
              accessToken={accessToken}
              coordinates={parcelData.parcel_geometry.geometry.coordinates}
            />
          </div>
        </div>
        {/* Parcel History */}
        <div className="bg-grayContrast p-4 rounded">
          <div className="flex flex-row justify-between mb-4">
            <h1 className="text-xl font-black">History</h1>
            <ParcelHistoryLegend />
          </div>
          <div className="overflow-x-auto pb-2 scrollbar-dark">
            <ParcelHistory
              width={1200}
              height={150}
              data={parcelData.parcel_daily_data}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
