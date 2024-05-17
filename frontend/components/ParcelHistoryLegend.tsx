import { LegendOrdinal, LegendItem } from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";
import { getColor } from "@/utils/utils";

// Legend: showing the association of patterns and colors to the historical parcel data
const ParcelHistoryLegend = () => {
  const legendGlyphSize = 15;
  const ordinalColorScale = scaleOrdinal<string, string>({
    domain: ["Bare", "Rice", "Grass", "Cover Crop", "Winter"],
    range: [
      getColor("Bare"),
      getColor("Rice"),
      getColor("Grass"),
      getColor("Cover Crop"),
      getColor("Winter"),
    ],
  });

  return (
    <>
      <LegendOrdinal
        scale={ordinalColorScale}
        labelFormat={(label) => `${label}`}
      >
        {(labels) => (
          <div className="flex flex-row">
            {labels.map((label, i) => {
              const value = label.value || "";
              return (
                <LegendItem key={`legend-ordinal-${i}`} margin="0 5px">
                  <svg width={legendGlyphSize} height={legendGlyphSize}>
                    <rect
                      fill={value.includes("url(") ? "none" : value}
                      width={legendGlyphSize}
                      height={legendGlyphSize}
                    />
                    {value.includes("url(") && (
                      <rect
                        fill={value}
                        width={legendGlyphSize}
                        height={legendGlyphSize}
                      />
                    )}
                  </svg>
                  <div className="text-[11px] ml-1">{label.text}</div>
                </LegendItem>
              );
            })}
          </div>
        )}
      </LegendOrdinal>
    </>
  );
};

export default ParcelHistoryLegend;
