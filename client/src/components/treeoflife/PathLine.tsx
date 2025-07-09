import React from "react";

interface PathLineProps {
  path: any;
  from: { x: number; y: number };
  to: { x: number; y: number };
  onClick: (path: any) => void;
  isSelected: boolean;
}

// Helper function to convert Atziluth color names to hex values
const getAtziluthColorHex = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    'bright pale yellow': '#FFFFE0',
    'sky blue': '#87CEEB',
    'yellow': '#FFFF00',
    'blue emerald': '#0D98BA',
    'emerald': '#50C878',
    'orange': '#FFA500',
    'violet': '#8A2BE2',
    'red': '#FF0000',
    'blue': '#0000FF',
    'citrine': '#E4D00A',
    'deep purple': '#483D8B',
    'maroon': '#800000',
    'bright red': '#FF0000',
    'deep blue': '#000080',
    'green': '#008000',
  };
  return colorMap[colorName.toLowerCase()] || '#888888';
};

// Atziluth color mapping for paths
const getAtziluthColor = (colorName: string): string => {
  if (!colorName) return '#FF00FF'; // Debug fallback

  // Use only the first color (before comma or "and")
  const primaryColor = colorName.split(",")[0].split(" and ")[0].trim().toLowerCase();

  const colorMap: Record<string, string> = {
    'bright pale yellow': '#FFFFE0',
    'yellow': '#FFFF00',
    'blue': '#0000FF',
    'emerald green': '#50C878',
    'scarlet red': '#FF2400',
    'red orange': '#FF4500',
    'orange': '#FFA500',
    'amber': '#FFBF00',
    'greenish yellow': '#ADFF2F',
    'yellowish green': '#9AFF9A',
    'violet': '#8A2BE2',
    'emerald blue': '#047D7D',
    'deep blue': '#000080',
    'green': '#008000',
    'indigo black': '#1C1C3A',
    'glowing orange scarlet': '#FF4500',
    'sky blue': '#87CEEB',
    'blue emerald': '#0D98BA',
    'citrine': '#E4D00A',
    'deep purple': '#483D8B',
    'maroon': '#800000',
    'bright red': '#FF0000',
    'silver': '#C0C0C0',
    'grey': '#888888',
    'cold pale blue': '#B0E0E6',
    'indigo': '#4B0082',
    'purple': '#800080',
    'indigo, flecked violet': '#8A2BE2',
    'emerald flecked gold': '#50C878',
    'silver, rayed sky blue': '#B0C4DE',
    // Add more as needed
  };

  return colorMap[primaryColor] || '#FF00FF'; // Magenta for missing
};


const PathLine: React.FC<PathLineProps> = ({ path, from, to, onClick, isSelected }) => {
  // Get Atziluth color for the path
  const atziluthColor = path.colors?.atziluth?.en || 'grey';
  const pathColor = getAtziluthColor(atziluthColor);
  
  // Calculate midpoint for Hebrew letter placement
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  
  // Extract Hebrew letter (first character)
  const hebrewLetter = path.hebrew_letter?.split(' ')[0] || path.number.toString();
  
  return (
    <g>
      {/* Path line */}
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={isSelected ? "#FFD700" : pathColor}
        strokeWidth={isSelected ? 4 : 2}
        tabIndex={0}
        aria-label={`Path ${path.number} - ${path.hebrew_letter || 'Hebrew letter'}`}
        onClick={() => onClick(path)}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClick(path)}
        style={{ cursor: "pointer" }}
        role="button"
        opacity={0.8}
      />
      
      {/* Background circle for Hebrew letter */}
      <circle
        cx={midX}
        cy={midY}
        r={8}
        fill="rgba(255,255,255,0.9)"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth={1}
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Hebrew letter */}
      <text
        x={midX}
        y={midY}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
        fill="#000"
        fontWeight="bold"
        fontFamily="serif"
        style={{ pointerEvents: 'none' }}
      >
        {hebrewLetter}
      </text>
    </g>
  );
};

export default PathLine;
