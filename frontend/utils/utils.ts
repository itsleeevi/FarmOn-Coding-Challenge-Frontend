import { timeParse, timeFormat } from "d3-time-format";
import { Segment, ParcelDailyData } from "@/types/types";

export const parseDate = timeParse("%Y-%m-%d");
export const formatDate = timeFormat("%Y");
 
export const calculateDaysInSegment = (startDate: Date, endDate: Date): number => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };
 
export const getColor = (crop: string | undefined) => {
    switch (crop) {
      case "Rice":
        return "url(#rice-pattern)";
      case "Grass":
        return "url(#grass-pattern)";
      case "Cover Crop":
        return "url(#cover-crop-pattern)";
      case "Winter":
        return "url(#winter-pattern)";
      default:
        return "#121212"; // Bare 
    }
  };

// Groups parcel's daily data by year
export  const groupDataByYear = (data: ParcelDailyData[]): Segment[] => {
  const segments: Segment[] = [];
  let currentSegment: Segment | null = null;

  data.forEach((entry) => {
    if (!currentSegment) {
      currentSegment = {
        start: entry.Date,
        end: entry.Date,
        label: formatDate(parseDate(entry.Date) as Date),
      };
    } else if (
      formatDate(parseDate(entry.Date) as Date) ===
      formatDate(parseDate(currentSegment.end) as Date)
    ) {
      currentSegment.end = entry.Date;
    } else {
      segments.push(currentSegment);
      currentSegment = {
        start: entry.Date,
        end: entry.Date,
        label: formatDate(parseDate(entry.Date) as Date),
      };
    }
  });

  if (currentSegment) {
    segments.push(currentSegment);
  }

  return segments;
};

// Groups parcel's daily data by coverage
export const groupDataByCoverage = (data: ParcelDailyData[]): Segment[] => {
  const segments: Segment[] = [];
  let currentSegment: Segment | null = null;

  data.forEach((entry) => {
    if (!currentSegment) {
      currentSegment = {
        start: entry.Date,
        end: entry.Date,
        covered: entry.Covered,
        label: entry.Crop,
      };
    } else if (
      entry.Covered === currentSegment.covered &&
      entry.Crop === currentSegment.label
    ) {
      currentSegment.end = entry.Date;
    } else {
      segments.push(currentSegment);
      currentSegment = {
        start: entry.Date,
        end: entry.Date,
        covered: entry.Covered,
        label: entry.Crop,
      };
    }
  });

  if (currentSegment) {
    segments.push(currentSegment);
  }

  return segments;
};

// Groups parcel's daily data by winter season (December, January, February)
export  const groupDataByWinter = (data: ParcelDailyData[]): Segment[] => {
  const segments: Segment[] = [];
  let currentSegment: Segment | null = null;

  data.forEach((entry) => {
    const date = parseDate(entry.Date) as Date;
    const month = date.getMonth() + 1; // getMonth() is zero-based

    // December, January, February
    if (month === 12 || month === 1 || month === 2) {
      if (!currentSegment) {
        currentSegment = {
          start: entry.Date,
          end: entry.Date,
          label: "Winter",
        };
      } else {
        currentSegment.end = entry.Date;
      }
    } else {
      if (currentSegment) {
        segments.push(currentSegment);
        currentSegment = null;
      }
    }
  });

  if (currentSegment) {
    segments.push(currentSegment);
  }

  return segments;
};

