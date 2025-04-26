
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface AstrologyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'zodiac' | 'planet' | 'house';
  data: any;
}

const AstrologyModal: React.FC<AstrologyModalProps> = ({ 
  open, 
  onOpenChange, 
  type, 
  data 
}) => {
  const { language } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-grimoire-dark bg-opacity-95 border-2 border-grimoire-gold">
        <DialogTitle className="font-display text-2xl text-grimoire-gold">
          {data.name[language]}
          {data.symbol && <span className="ml-2">{data.symbol}</span>}
          {type === 'house' && <span className="ml-2">({data.number})</span>}
        </DialogTitle>
        <DialogDescription className="sr-only">Details about this {type}</DialogDescription>

        <div className="space-y-4 py-4">
          {/* Description */}
          <div className="bg-grimoire-dark border border-grimoire-gold/50 rounded-md p-4">
            <p className="text-grimoire-parchment">{data.description[language]}</p>
          </div>

          {/* Additional Info */}
          <div className="bg-grimoire-dark border border-grimoire-gold/50 rounded-md p-4">
            {type === 'zodiac' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-accent text-grimoire-amber">Dates</h3>
                  <p className="text-grimoire-parchment">{data.dates}</p>
                </div>
                <div>
                  <h3 className="font-accent text-grimoire-amber">Element</h3>
                  <p className="text-grimoire-parchment">{data.element}</p>
                </div>
                <div>
                  <h3 className="font-accent text-grimoire-amber">Modality</h3>
                  <p className="text-grimoire-parchment">{data.modality}</p>
                </div>
                <div>
                  <h3 className="font-accent text-grimoire-amber">Ruling Planet</h3>
                  <p className="text-grimoire-parchment">{data.rulingPlanet}</p>
                </div>
              </div>
            )}

            {type === 'planet' && (
              <div>
                <h3 className="font-accent text-grimoire-amber mb-2">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {data.keywords[language].map((keyword: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-grimoire-blue/50 rounded-md text-grimoire-parchment">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {type === 'house' && (
              <div>
                <h3 className="font-accent text-grimoire-amber mb-2">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {data.keywords[language].map((keyword: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-grimoire-blue/50 rounded-md text-grimoire-parchment">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AstrologyModal;
