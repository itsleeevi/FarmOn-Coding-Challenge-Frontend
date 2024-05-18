"use client";
import { useSearchParams } from "next/navigation";
import Main from "@/components/Main";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

// Check /?parcel_id={parcel_id} in the URL
const SearchParcel = () => {
  const searchParams = useSearchParams();
  const parcelIdParam = searchParams.get("parcel_id");

  // Ensure parcelId is a number
  // By default it sets the ID 1 parcel
  const parcelId = parcelIdParam ? parseInt(parcelIdParam, 10) : 1;

  if (parcelId === null) {
    return <Spinner />;
  }
  return <Main parcelId={parcelId} />;
};

const Home: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchParcel />
    </Suspense>
  );
};

export default Home;
