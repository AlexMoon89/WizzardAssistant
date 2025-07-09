import React from "react";

// King Scale color hex map
const kingScaleColorHexMap = {
  "brilliance": "#FFFFFF",
  "white brilliance": "#FFFFFF",
  "pure soft blue": "#B8CCE2",
  "crimson": "#DC143C",
  "deep violet": "#4B0082",
  "orange": "#FFA500",
  "clear pink rose": "#FFB6C1",
  "golden yellow": "#FFD700",
  "amber": "#FFBF00",
  "violet purple": "#8A2BE2",
  "indigo": "#4B0082",
  "citrine": "#E4D00A",
  "yellow": "#FFFF00",
  "black": "#222222",
  "grey": "#C0C0C0",
  "blue": "#2196F3",
  "emerald": "#50C878",
  "scarlet": "#FF2400",
  "bright scarlet": "#FF5A36",
  "dark brown": "#654321",
  "bright yellowish green": "#BFFF00",
  "russet red": "#80461B"
};

// Queen Scale color hex map (same as in SephiraNode)
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
};
const normalizeColorName = (name: string) =>
  name.toLowerCase().replace(/[^a-z ]/g, "").replace(/\s+/g, " ").trim();
const getQueenScaleColorHex = (sephira: any) => {
  let queenColorName = sephira?.colors?.queen?.en || "";
  queenColorName = queenColorName.split(",")[0].split(" and ")[0].trim();
  const norm = normalizeColorName(queenColorName);
  return queenScaleColorHexMap[norm] || "#FFFFFF";
};

// Path Atziluth color hex map
const getAtziluthColor = (colorName = "") => {
  const primary = colorName.split(",")[0].split(" and ")[0].trim().toLowerCase();
  const colorMap = {
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
    'silver, rayed sky blue': '#B0C4DE'
  };
  return colorMap[primary as keyof typeof colorMap] || "#FFD700";
};

interface ReferenceModalProps {
  open: boolean;
  onClose: () => void;
  data: any;
  type: "sephira" | "path";
  lang: "en" | "es";
}

const ReferenceModal: React.FC<ReferenceModalProps> = ({
  open,
  onClose,
  data,
  type,
  lang
}) => {
  if (!open || !data) return null;

  // Dynamic color for modal header
  const headerBg =
    type === "sephira"
      ? kingScaleColorHexMap[
          ((data.colors?.king?.en || "").split(",")[0].split(" and ")[0].trim().toLowerCase() as keyof typeof kingScaleColorHexMap)
        ] || "#FFD700"
      : getAtziluthColor(data.colors?.atziluth?.en);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="bg-grimoire-parchment rounded-lg shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-grimoire-gold text-grimoire-dark p-4 rounded-t-lg relative">
          <button
            className="absolute top-2 right-2 text-grimoire-dark hover:text-black text-2xl leading-none"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
          {type === "sephira" ? (
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl font-bold">{data[`name_${lang}`]}</h2>
                <div className="text-lg opacity-80">{data[`title_${lang}`]}</div>
                <div className="text-lg font-serif mt-1">{data.hebrew}</div>
              </div>
              {/* Queen Scale color swatch */}
              {data.colors?.queen?.en && (
                <div className="flex flex-col items-center ml-2">
                  <span className="text-xs mb-1">Queen Scale</span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: getQueenScaleColorHex(data),
                      border: "2px solid #222"
                    }}
                  />
                  <span className="text-xs mt-1">{data.colors.queen[lang] || data.colors.queen.en}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl font-bold">Path {data.number}</h2>
                <div className="text-lg opacity-80">{data.tarot_trump}</div>
                <div className="text-lg font-serif mt-1">{data.hebrew_letter}</div>
              </div>
              {/* Atziluth color swatch */}
              {data.colors?.atziluth?.en && (
                <div className="flex flex-col items-center ml-2">
                  <span className="text-xs mb-1">Atziluth</span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: getAtziluthColor(data.colors.atziluth.en),
                      border: "2px solid #222"
                    }}
                  />
                  <span className="text-xs mt-1">{data.colors.atziluth[lang] || data.colors.atziluth.en}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 text-grimoire-dark space-y-4">
          {type === "sephira" ? (
            <>
              {/* Description */}
              {data[`description_${lang}`] ? (
                <div className="mb-4">
                  <p className="text-sm leading-relaxed italic">{data[`description_${lang}`]}</p>
                </div>
              ) : data.description_en ? (
                <div className="mb-4">
                  <p className="text-sm leading-relaxed italic">{data.description_en}</p>
                </div>
              ) : null}

              {/* Divine Attributions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-grimoire-gold mb-2">Divine Names</h3>
                  <div className="space-y-1 text-sm">
                    {data[`god_name_${lang}`] && (
                      <div>
                        <strong>God Name:</strong> {data[`god_name_${lang}`]}
                      </div>
                    )}
                    {data[`archangel_${lang}`] && (
                      <div>
                        <strong>Archangel:</strong> {data[`archangel_${lang}`]}
                      </div>
                    )}
                    {data[`angelic_chorus_${lang}`] && (
                      <div>
                        <strong>Angelic Choir:</strong> {data[`angelic_chorus_${lang}`]}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-grimoire-gold mb-2">Correspondences</h3>
                  <div className="space-y-1 text-sm">
                    {data[`element_${lang}`] && (
                      <div>
                        <strong>Element:</strong> {data[`element_${lang}`]} {data.element_symbol}
                      </div>
                    )}
                    {data[`chakra_${lang}`] && (
                      <div>
                        <strong>Chakra:</strong> {data[`chakra_${lang}`]}
                      </div>
                    )}
                    {data[`heaven_assiah_${lang}`] && (
                      <div>
                        <strong>Heaven:</strong> {data[`heaven_assiah_${lang}`]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Colors with color swatches */}
              {data.colors && (
                <div>
                  <h3 className="font-semibold text-grimoire-gold mb-2">Four Color Scales</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {data.colors.king && (
                      <div className="flex items-center gap-2">
                        <strong>King Scale:</strong> {data.colors.king[lang] || data.colors.king.en}
                        <span
                          className="inline-block rounded-full border border-gray-400"
                          style={{
                            width: 18,
                            height: 18,
                            background:
                              kingScaleColorHexMap[
                                ((data.colors.king.en || "")
                                  .split(",")[0]
                                  .split(" and ")[0]
                                  .trim()
                                  .toLowerCase()) as keyof typeof kingScaleColorHexMap
                              ] || "#fff"
                          }}
                        />
                      </div>
                    )}
                    {data.colors.queen && (
                      <div>
                        <strong>Queen Scale:</strong> {data.colors.queen[lang] || data.colors.queen.en}
                      </div>
                    )}
                    {data.colors.prince && (
                      <div>
                        <strong>Prince Scale:</strong> {data.colors.prince[lang] || data.colors.prince.en}
                      </div>
                    )}
                    {data.colors.princess && (
                      <div>
                        <strong>Princess Scale:</strong> {data.colors.princess[lang] || data.colors.princess.en}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tarot and Attributions */}
              <div className="border-t pt-4">
                {data[`tarot_reference_${lang}`] && (
                  <div className="mb-2">
                    <strong>Tarot Reference:</strong> {data[`tarot_reference_${lang}`]}
                  </div>
                )}
                {data[`attributions_${lang}`] && (
                  <div>
                    <strong>Attributions:</strong> {data[`attributions_${lang}`]}
                  </div>
                )}
              </div>

              {/* Fallback: Show all other fields for debugging */}
              <div className="mt-4 text-xs text-gray-500">
                <details>
                  <summary>Show all data (debug)</summary>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </details>
              </div>
            </>
          ) : (
            <>
              {/* Path Information */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <strong>From Sephira:</strong> {data.from}
                </div>
                <div>
                  <strong>To Sephira:</strong> {data.to}
                </div>
              </div>

              {data.element_planet_zodiac && (
                <div className="mb-4">
                  <strong>Element/Planet/Zodiac:</strong> {data.element_planet_zodiac}
                </div>
              )}

              {/* Meaning */}
              <div className="mb-4">
                <h3 className="font-semibold text-grimoire-gold mb-2">Meaning</h3>
                <p className="text-sm italic">
                  {data[`${lang === "en" ? "meaning_en" : "significado_es"}`] ||
                    data.meaning_en ||
                    data.significado_es ||
                    "No description available"}
                </p>
              </div>

              {/* Path Title */}
              {data[`path_title_${lang}`] && (
                <div className="mb-4">
                  <strong>Path Title:</strong> {data[`path_title_${lang}`]}
                </div>
              )}

              {/* Colors with color swatches */}
              {data.colors && (
                <div>
                  <h3 className="font-semibold text-grimoire-gold mb-2">Four World Colors</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {data.colors.atziluth && data.colors.atziluth[lang] && (
                      <div className="flex items-center gap-2">
                        <strong>Atziluth:</strong> {data.colors.atziluth[lang]}
                        <span
                          className="inline-block rounded-full border border-gray-400"
                          style={{
                            width: 18,
                            height: 18,
                            background: getAtziluthColor(data.colors.atziluth.en)
                          }}
                        />
                      </div>
                    )}
                    {data.colors.beriyah && data.colors.beriyah[lang] && (
                      <div>
                        <strong>Beriyah:</strong> {data.colors.beriyah[lang]}
                      </div>
                    )}
                    {data.colors.yetzirah && data.colors.yetzirah[lang] && (
                      <div>
                        <strong>Yetzirah:</strong> {data.colors.yetzirah[lang]}
                      </div>
                    )}
                    {data.colors.asiyah && data.colors.asiyah[lang] && (
                      <div>
                        <strong>Asiyah:</strong> {data.colors.asiyah[lang]}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Fallback: Show all other fields for debugging */}
              <div className="mt-4 text-xs text-gray-500">
                <details>
                  <summary>Show all data (debug)</summary>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </details>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferenceModal;
