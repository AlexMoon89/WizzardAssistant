import React from "react";
import SephiraNode from "./SephiraNode";
import PathLine from "./PathLine";

type SephiraNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Path {
  number: number;
  from: SephiraNumber;
  to: SephiraNumber;
  // add other path properties if needed
}

interface TreeDiagramProps {
  sephiroth: any[];
  paths: Path[];
  setSelected: (selected: { type: "sephira" | "path"; data: any } | null) => void;
  lang: "en" | "es";
}

const VALID_SEPHIROTH = new Set([1,2,3,4,5,6,7,8,9,10]);
// Only keep one direction for each path (from < to)
const uniquePathKey = (p: any) => p.from < p.to ? `${p.from}-${p.to}` : `${p.to}-${p.from}`;

/**
 * TreeDiagram Component
 * Renders the interactive Tree of Life diagram with clickable sephiroth and paths
 * Features:
 * - SVG-based rendering for scalability
 * - Responsive design
 * - Keyboard accessibility
 * - King Scale colors for sephiroth
 * - Atziluth colors for paths
 * - Hebrew letters and names displayed
 */
const TreeDiagram: React.FC<TreeDiagramProps> = ({
  sephiroth,
  paths,
  setSelected,
  lang,
}) => {
  // Only use the canonical 22 paths (number 11–32)
  const canonicalPaths = paths.filter(p => p.number >= 11 && p.number <= 32);

  // Traditional, symmetric layout for the Tree of Life
  const SEPHIROTH_POSITIONS = {
    1:  { x: 300, y: 80 },    // Kether (top center)
    2:  { x: 450, y: 180 },  // Chokmah (top right)
    3:  { x: 150, y: 180 },  // Binah (top left)
    4:  { x: 450, y: 320 },  // Chesed (middle right)
    5:  { x: 150, y: 320 },  // Geburah (middle left)
    6:  { x: 300, y: 380 },  // Tiphareth (center)
    7:  { x: 450, y: 520 },  // Netzach (lower right)
    8:  { x: 150, y: 520 },  // Hod (lower left)
    9:  { x: 300, y: 600 },  // Yesod (bottom center above Malkuth)
    10: { x: 300, y: 700 },  // Malkuth (bottom center)
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center p-8">
      <svg
        viewBox="0 0 600 750"
        width="100%"
        className="w-full h-auto border border-grimoire-gold rounded-lg bg-transparent"
        style={{
          maxWidth: 800,
          display: "block",
          margin: "0 auto",
          backgroundColor: "rgba(0,0,0,0.1)",
          minHeight: "600px"
        }}
        aria-label="Interactive Tree of Life diagram"
        role="img"
      >
        {/* Draw paths first so sephiroth nodes appear on top */}
        <g id="paths">
          {canonicalPaths.map((path, idx) => {
            const from = SEPHIROTH_POSITIONS[path.from];
            const to = SEPHIROTH_POSITIONS[path.to];
            if (!from || !to) return null;
            return (
              <PathLine
                key={`path-${path.number}-${idx}`}
                path={path}
                from={from}
                to={to}
                onClick={(clickedPath) => setSelected({ type: "path", data: clickedPath })}
                isSelected={false}
              />
            );
          })}
        </g>
        {/* Draw sephiroth nodes */}
        <g id="sephiroth">
          {sephiroth.map((sephira: { number: SephiraNumber; [key: string]: any }) => {
            const pos = SEPHIROTH_POSITIONS[sephira.number];
            if (!pos) return null;
            return (
              <SephiraNode
                key={`sephira-${sephira.number}`}
                sephira={sephira}
                x={pos.x}
                y={pos.y}
                onClick={(clickedSephira) => setSelected({ type: "sephira", data: clickedSephira })}
                isSelected={false}
                lang={lang}
              />
            );
          })}
        </g>
      </svg>
      {/* Instructions for mobile users */}
      <div className="text-center mt-6 text-base text-grimoire-parchment opacity-80">
        {lang === "en"
          ? "Tap any sephira (circle) or path (line) to explore its mystical significance"
          : "Toca cualquier sefirá (círculo) o sendero (línea) para explorar su significado místico"
        }
      </div>
    </div>
  );
};

export default TreeDiagram;
