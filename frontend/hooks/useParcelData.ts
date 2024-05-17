"use client";
import { useEffect, useState } from 'react';
import { ParcelData } from '@/types/types';


const useParcelData = (parcelId: number) => {
  const [parcelData, setParcelData] = useState<ParcelData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchParcelData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'; // Default URL if env var is not set
      try {
        const response = await fetch(`${apiUrl}/parcels/${parcelId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data: ParcelData = await response.json();
        setParcelData(data);
        
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchParcelData();
  }, [parcelId]);

  return { parcelData, error, loading };
};

export default useParcelData;
