import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import TreeDiagram from "./TreeDiagram";
import ReferenceModal from "./ReferenceModal";

// --- Intro text in both languages ---
const introText = {
  en: `The Tree of Life is the central glyph of the Kabbalah, representing the structure of creation and the journey of the soul. Each sephira and path embodies unique mystical, psychological, and spiritual principles, forming a map for personal and cosmic understanding.`,
  es: `El Árbol de la Vida es el glifo central de la Cábala, que representa la estructura de la creación y el viaje del alma. Cada sephira y sendero encarna principios místicos, psicológicos y espirituales únicos, formando un mapa para la comprensión personal y cósmica.`
};

/**
 * TreeOfLifeSection
 * Loads sephiroth and path data, renders interactive tree & modal.
 * Expects JSON files in /public/data/
 */
const TreeOfLifeSection: React.FC = () => {
  const { language } = useLanguage();

  const [sephiroth, setSephiroth] = useState<any[]>([]);
  const [paths, setPaths] = useState<any[]>([]);
  const [selected, setSelected] = useState<{ type: "sephira" | "path"; data: any } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // --- Fetch sephiroth JSON ---
        const sephirothRes = await fetch("/data/tree-of-life-sephiroth.json");
        if (!sephirothRes.ok) throw new Error(`Failed to load sephiroth: ${sephirothRes.status}`);
        const sephirothData = await sephirothRes.json();
        setSephiroth(sephirothData);

        // --- Fetch paths JSON ---
        const pathsRes = await fetch("/data/tree-of-life-paths.json");
        if (!pathsRes.ok) throw new Error(`Failed to load paths: ${pathsRes.status}`);
        const pathsData = await pathsRes.json();
        // Only include valid paths (from & to are present)
        setPaths(pathsData.filter((p: any) => p.from && p.to));
      } catch (error) {
        console.error("Failed to load Tree of Life data:", error);

        // Fallback example data (for dev only)
        setSephiroth(
          Array.from({ length: 10 }, (_, i) => ({
            number: i + 1,
            name_en: `Sephira ${i + 1}`,
            name_es: `Sefirá ${i + 1}`,
            hebrew: `ס${i + 1}`,
            colors: { king: { en: "white", es: "blanco" } }
          }))
        );
        setPaths([
          { number: 11, from: 1, to: 2, hebrew_letter: "א" },
          { number: 12, from: 1, to: 3, hebrew_letter: "ב" },
          { number: 13, from: 2, to: 3, hebrew_letter: "ג" },
          { number: 14, from: 2, to: 6, hebrew_letter: "ד" },
          { number: 15, from: 3, to: 6, hebrew_letter: "ה" },
          { number: 16, from: 4, to: 6, hebrew_letter: "ו" },
          { number: 17, from: 5, to: 6, hebrew_letter: "ז" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <section
      id="tree-of-life"
      className="py-8 px-2 max-w-4xl mx-auto"
      aria-labelledby="tree-of-life-title"
    >
      <h2
        id="tree-of-life-title"
        className="text-2xl md:text-3xl font-display text-grimoire-amber mb-4"
      >
        {language === "en" ? "Tree of Life" : "Árbol de la Vida"}
      </h2>

      <p className="mb-6 text-grimoire-parchment max-w-2xl">
        {introText[language]}
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-grimoire-parchment">Loading Tree of Life...</div>
        </div>
      ) : (
        <>
          <TreeDiagram
            sephiroth={sephiroth}
            paths={paths}
            setSelected={setSelected}
            lang={language}
          />
          <ReferenceModal
            open={!!selected}
            onClose={() => setSelected(null)}
            data={selected?.data}
            type={selected ? selected.type : "sephira"}
            lang={language}
          />
        </>
      )}
    </section>
  );
};

export default TreeOfLifeSection;
