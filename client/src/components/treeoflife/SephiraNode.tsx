import React from "react";

interface SephiraNodeProps {
  sephira: any;
  x: number;
  y: number;
  onClick: (sephira: any) => void;
  isSelected: boolean;
  lang: "en" | "es";
}

// Queen Scale color hex map (Golden Dawn standard, plus common variants)
const queenScaleColorHexMap: Record<string, string> = {
  "white brilliance": "#FFFFFF",
  "grey": "#808080",
  "gray": "#808080",
  "black": "#000000",
  "blue": "#2196F3",
  "deep purple": "#483D8B",
  "scarlet": "#FF2400",
  "orange": "#FFA500",
  "yellow": "#FFFF00",
  "green": "#008000",
  "emerald": "#50C878",
  "amber": "#FFBF00",
  "violet": "#8A2BE2",
  "indigo": "#4B0082",
  "bright rose": "#FF69B4",
  "blue pearl grey": "#B0C4DE",
  "dark brown": "#654321",
  "yellow green": "#9AFF9A",
  "red orange": "#FF4500",
  "golden yellow": "#FFD700",
  "four colours": "#8A2BE2",
  // Add more as needed
};

// Normalize color name for matching
const normalizeColorName = (name: string) =>
  name.toLowerCase().replace(/[^a-z ]/g, "").replace(/\s+/g, " ").trim();

const getQueenScaleColorHex = (sephira: any) => {
  let queenColorName = sephira?.colors?.queen?.en || "";
  queenColorName = queenColorName.split(",")[0].split(" and ")[0].trim();
  const norm = normalizeColorName(queenColorName);
  return queenScaleColorHexMap[norm] || "#FFFFFF";
};

// Get black or white text for contrast on any bg color
const getTextContrast = (bgColor: string) => {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#111" : "#fff";
};

const SephiraNode: React.FC<SephiraNodeProps> = ({
  sephira,
  x,
  y,
  onClick,
  isSelected,
  lang,
}) => {
  const fillColor = getQueenScaleColorHex(sephira);
  const textColor = getTextContrast(fillColor);
  let queenColorName = sephira?.colors?.queen?.en || "";
  queenColorName = queenColorName.split(",")[0].split(" and ")[0].trim();

  return (
    <g
      tabIndex={0}
      aria-label={`${sephira[`title_${lang}`] || sephira.title_en} (${sephira[`name_${lang}`] || sephira.name_en})`}
      onClick={() => onClick(sephira)}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClick(sephira)}
      style={{ cursor: "pointer", outline: "none" }}
      role="button"
    >
      {/* Main Circle */}
      <circle
        cx={x}
        cy={y}
        r={32}
        fill={fillColor}
        stroke="#000"
        strokeWidth={isSelected ? 4 : 2}
        opacity={0.95}
      />
      {/* Sephira number */}
      <text
        x={x}
        y={y - 8}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={18}
        fontWeight="bold"
        fill={textColor}
        style={{ filter: "drop-shadow(0 1px 2px #0008)" }}
      >
        {sephira.number}
      </text>
      {/* Hebrew name */}
      <text
        x={x}
        y={y + 16}
        textAnchor="middle"
        fontSize={16}
        fill={textColor}
        fontFamily="serif"
        fontWeight={600}
        style={{ filter: "drop-shadow(0 1px 2px #0008)" }}
      >
        {sephira.hebrew || ''}
      </text>
      {/* English/Spanish name below */}
      <text
        x={x}
        y={y + 44}
        textAnchor="middle"
        fontSize={13}
        fill="#bbb"
        fontWeight={500}
        style={{ filter: "drop-shadow(0 1px 2px #0008)" }}
      >
        {lang === "en" ? sephira.title_en : sephira.title_es}
      </text>
      {/* Only show color label if not just "white" */}
      {sephira.colors?.queen?.[lang]
        && queenColorName !== "brilliance"
        && queenColorName !== "white brilliance" && (
        <text
          x={x}
          y={y + 62}
          textAnchor="middle"
          fontSize={11}
          fill="#999"
        >
          {sephira.colors.queen[lang]}
        </text>
      )}
    </g>
  );
};

export default SephiraNode;
