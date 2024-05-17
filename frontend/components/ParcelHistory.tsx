import React, { FC } from "react";
import { scaleTime } from "@visx/scale";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { Text } from "@visx/text";
import { extent } from "d3-array";
import { Pattern, PatternWaves, PatternLines } from "@visx/pattern";
import {
  calculateDaysInSegment,
  getColor,
  parseDate,
  groupDataByCoverage,
  groupDataByWinter,
  groupDataByYear,
} from "@/utils/utils";
import { ParcelDailyData, Segment } from "@/types/types";

interface ParcelHistoryProps {
  width: number;
  height: number;
  data: ParcelDailyData[];
}

// Renders the label for each segment
const renderLabels = (segments: Segment[], xScale: any, yPosition: number) => {
  return segments.map((segment, index) => {
    const startDate = parseDate(segment.start) as Date;
    const endDate = parseDate(segment.end) as Date;
    const barWidth = xScale(endDate) - xScale(startDate);
    const days = calculateDaysInSegment(startDate, endDate);

    if (segment.label) {
      const midPoint = xScale(startDate) + barWidth / 2;
      let labelText = "";

      // Labeling conditions to match the layout
      if (segment.label === "Bare" && days > 70) {
        labelText = `${segment.label} (${days} days)`;
      } else if (segment.covered && days > 20) {
        if (days > 70) labelText = `${segment.label} (${days} days)`;
        else labelText = segment.label;
      } else if (segment.label === "Winter") labelText = segment.label;
      // Check if the label is a year (e.g., 2020)
      else if (/^\d{4}$/.test(segment.label)) {
        labelText = segment.label;
      }

      return (
        <Text
          key={`label-${index}-${segment.start}-${segment.end}`}
          x={midPoint}
          y={yPosition}
          fill="white"
          fontSize={11}
          textAnchor="middle"
        >
          {labelText}
        </Text>
      );
    }

    return null;
  });
};

const ParcelHistory: FC<ParcelHistoryProps> = ({ width, height, data }) => {
  const margin = { top: 20, right: 0, bottom: 20, left: 0 };

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const dates = data.map((d) => parseDate(d.Date) as Date);
  const xDomain = extent(dates) as [Date, Date];
  const xScale = scaleTime({
    domain: xDomain,
    range: [0, xMax],
  });

  const segments = groupDataByCoverage(data);
  const segmentsByYear = groupDataByYear(data);
  const segmentsByWinter = groupDataByWinter(data);

  return (
    <>
      <svg width={width} height={height}>
        {/* Definitions of segment patterns */}
        <defs>
          <Pattern id="winter-pattern" width={7} height={10}>
            <animateTransform
              attributeType="xml"
              attributeName="patternTransform"
              type="translate"
              from="0 0"
              to="0 30"
              dur="15s"
              repeatCount="indefinite"
            />
            <circle cx={5} cy={5} r="1" fill="white" />
          </Pattern>
          <PatternWaves
            id="grass-pattern"
            height={5}
            width={5}
            stroke="#7CFC00"
            strokeWidth={1}
          />
          <PatternLines
            id="rice-pattern"
            height={4}
            width={4}
            stroke="#7CFC00"
            strokeWidth={1}
            orientation={["horizontal"]}
          />
          <PatternLines
            id="cover-crop-pattern"
            height={4}
            width={4}
            stroke="#066082"
            strokeWidth={1}
            orientation={["diagonal", "horizontal"]}
          />
        </defs>

        {/* Coverage segments (Bare, Rice, Grass, Cover Crop) */}
        <Group left={margin.left} top={margin.top}>
          {segments.map((segment, index) => {
            const startDate = parseDate(segment.start) as Date;
            const endDate = parseDate(segment.end) as Date;
            const barWidth = xScale(endDate) - xScale(startDate);
            const fill = getColor(segment.label);

            return (
              <React.Fragment
                key={`coverage-${index}-${segment.start}-${segment.end}`}
              >
                {/* Background rectangle */}
                <rect
                  x={xScale(startDate)}
                  y={0}
                  width={barWidth}
                  height={yMax}
                  fill={getColor(segment.label)} // Background color for the patterns
                  stroke="none"
                />
                <Bar
                  x={xScale(startDate)}
                  y={0}
                  width={barWidth}
                  height={yMax}
                  fill={fill}
                  stroke="none"
                />
              </React.Fragment>
            );
          })}
          {renderLabels(segments, xScale, -10)}
        </Group>

        {/* Year bar (Year segments) */}
        <Group left={margin.left} top={120}>
          {segmentsByYear.map((segment, index) => {
            const startDate = parseDate(segment.start) as Date;
            const endDate = parseDate(segment.end) as Date;
            const barWidth = xScale(endDate) - xScale(startDate);

            return (
              <Bar
                key={`year-bar-${index}-${segment.start}-${segment.end}`}
                x={xScale(startDate)}
                y={0}
                width={barWidth}
                height={20}
                fill="#0C0C0C"
                stroke="#0C0C0C"
              />
            );
          })}
          {renderLabels(segmentsByYear, xScale, 15)}
        </Group>

        {/* Winter segments */}
        <Group left={margin.left} top={20}>
          {segmentsByWinter.map((segment, index) => {
            const startDate = parseDate(segment.start) as Date;
            const endDate = parseDate(segment.end) as Date;
            const barWidth = xScale(endDate) - xScale(startDate);

            return (
              <Bar
                key={`winter-bar-${index}-${segment.start}-${segment.end}`}
                x={xScale(startDate)}
                y={0}
                width={barWidth}
                height={100}
                fill="url(#winter-pattern)"
                stroke="none"
              />
            );
          })}
          {renderLabels(segmentsByWinter, xScale, 115)}
        </Group>
      </svg>
    </>
  );
};

export default ParcelHistory;
