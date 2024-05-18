import ParcelsData from "../data/parcels_data.json";
import {
  groupDataByCoverage,
  groupDataByWinter,
  groupDataByYear,
  getColor,
} from "../../utils/utils";
import { ParcelDailyData } from "../../types/types";

describe("Parcel History", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays parcel history segments correctly", () => {
    const mockData = ParcelsData[0];

    // Verify the data is rendered correctly
    cy.get("svg").within(() => {
      // Group data by coverage using the utility function
      const segmentsCoverage = groupDataByCoverage(
        mockData.parcel_daily_data as ParcelDailyData[]
      );
      const segmentsWinter = groupDataByWinter(
        mockData.parcel_daily_data as ParcelDailyData[]
      );
      const segmentsYear = groupDataByYear(
        mockData.parcel_daily_data as ParcelDailyData[]
      );

      // Check the number of rects matches the number of segments
      cy.get("rect.visx-bar").should(
        "have.length",
        segmentsCoverage.length + segmentsWinter.length + segmentsYear.length
      );

      // Verify each segment is rendered correctly
      segmentsCoverage.forEach((segment, index) => {
        cy.get("rect.visx-bar")
          .eq(index)
          .then(($rect) => {
            // Verify attributes of the rect (for example, its x position and fill color)
            expect($rect.attr("x")).to.exist;
            expect($rect.attr("y")).to.equal("0");
            const expectedColor = getColor(segment.label);
            expect($rect.attr("fill")).to.equal(expectedColor);
          });
      });

      segmentsYear.forEach((segment, index) => {
        cy.get("rect.visx-bar")
          .eq(segmentsCoverage.length + index)
          .then(($rect) => {
            expect($rect.attr("x")).to.exist;
            expect($rect.attr("y")).to.equal("0");
            expect($rect.attr("fill")).to.equal("#0C0C0C"); // color for year segments
          });
      });

      segmentsWinter.forEach((segment, index) => {
        cy.get("rect.visx-bar")
          .eq(segmentsCoverage.length + segmentsYear.length + index)
          .then(($rect) => {
            expect($rect.attr("x")).to.exist;
            expect($rect.attr("y")).to.equal("0");
            const expectedColor = getColor(segment.label);
            expect($rect.attr("fill")).to.equal(expectedColor); // color for winter segments
          });
      });
    });
  });
});
