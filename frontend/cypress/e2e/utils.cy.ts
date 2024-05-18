import {
  groupDataByYear,
  groupDataByCoverage,
  groupDataByWinter,
} from "../../utils/utils";

describe("Utility Data Grouping Functions", () => {
  const mockData = [
    {
      Date: "2020-01-07",
      NDVI: 0.1,
      NDVI_Interpolated: 0.1,
      Covered: false,
      Crop: "Bare",
    },
    {
      Date: "2020-02-15",
      NDVI: 0.2,
      NDVI_Interpolated: 0.2,
      Covered: true,
      Crop: "Grass",
    },
    {
      Date: "2020-03-10",
      NDVI: 0.3,
      NDVI_Interpolated: 0.3,
      Covered: true,
      Crop: "Grass",
    },
    {
      Date: "2020-12-25",
      NDVI: 0.4,
      NDVI_Interpolated: 0.4,
      Covered: false,
      Crop: "Bare",
    },
    {
      Date: "2021-01-05",
      NDVI: 0.5,
      NDVI_Interpolated: 0.5,
      Covered: false,
      Crop: "Bare",
    },
    {
      Date: "2021-02-20",
      NDVI: 0.6,
      NDVI_Interpolated: 0.6,
      Covered: true,
      Crop: "Cover Crop",
    },
    {
      Date: "2021-03-15",
      NDVI: 0.7,
      NDVI_Interpolated: 0.7,
      Covered: false,
      Crop: "Bare",
    },
  ];

  it("should group data by year", () => {
    const expectedSegments = [
      { start: "2020-01-07", end: "2020-12-25", label: "2020" },
      { start: "2021-01-05", end: "2021-03-15", label: "2021" },
    ];

    const result = groupDataByYear(mockData);
    expect(result).to.deep.equal(expectedSegments);
  });

  it("should group data by coverage", () => {
    const expectedSegments = [
      { start: "2020-01-07", end: "2020-01-07", covered: false, label: "Bare" },
      { start: "2020-02-15", end: "2020-03-10", covered: true, label: "Grass" },
      { start: "2020-12-25", end: "2021-01-05", covered: false, label: "Bare" },
      {
        start: "2021-02-20",
        end: "2021-02-20",
        covered: true,
        label: "Cover Crop",
      },
      { start: "2021-03-15", end: "2021-03-15", covered: false, label: "Bare" },
    ];

    const result = groupDataByCoverage(mockData);
    expect(result).to.deep.equal(expectedSegments);
  });

  it("should group data by winter", () => {
    const expectedSegments = [
      { start: "2020-01-07", end: "2020-02-15", label: "Winter" },
      { start: "2020-12-25", end: "2021-02-20", label: "Winter" },
    ];

    const result = groupDataByWinter(mockData);
    expect(result).to.deep.equal(expectedSegments);
  });
});
