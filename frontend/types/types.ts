// Segment: a section on the parcel's timeline.
// - It's made out of the array of parcel's daily data (visually appearing as vertical bars) in timely order,
// and grouped by an attribute such as date, or coverage
export interface Segment {
    start: string;
    end: string;
    covered?: boolean;
    label?: string;
  }

export interface ParcelData {
    parcel_id: number;
    parcel_name: string;
    parcel_owner: string;
    parcel_area: number;
    parcel_area_unit: string;
    parcel_location: {
      type: string;
      properties: object;
      geometry: {
        coordinates: string[];
        type: string;
      };
    };
    parcel_geometry: {
      type: string;
      properties: object;
      geometry: {
        coordinates: [number, number][][];
        type: string;
      };
    };
    parcel_daily_data: ParcelDailyData[];
  }

export interface ParcelDailyData {
    Date: string;
    NDVI: number;
    NDVI_Interpolated: number;
    Covered: boolean;
    Crop: string;
  }
  
