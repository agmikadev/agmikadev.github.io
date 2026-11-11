import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { MissionType } from "../Planetary/data/MissionData";
import { cvProfile } from "./data/profile";
import { CvDocument } from "./CvDocument";
import "./CvPreview.css";

interface CvPreviewProps {
  missions: MissionType[];
  onClose: () => void;
}

export const CvPreview: React.FC<CvPreviewProps> = ({ missions, onClose }) => {
  const printRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = document.getElementById("root");
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.classList.add("cv-printing");
    root?.setAttribute("inert", "");
    closeRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("cv-printing");
      root?.removeAttribute("inert");
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (ready) printRef.current?.focus();
  }, [ready]);

  useEffect(() => {
    let cancelled = false;

    const prepare = async () => {
      await document.fonts.ready;
      const photo = document.querySelector<HTMLImageElement>(".cv-photo");
      if (photo && !photo.complete) {
        await photo.decode().catch(() => undefined);
      }
      if (!cancelled) setReady(true);
    };

    prepare();

    return () => {
      cancelled = true;
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return createPortal(
    <div
      className="cv-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Currículo de ${cvProfile.name}`}
    >
      <header className="cv-overlay__toolbar">
        <div className="cv-overlay__title">
          CURRÍCULO // {cvProfile.name}
        </div>

        <div className="cv-overlay__actions">
          <span className="cv-overlay__hint">
            No diálogo, escolha “Salvar como PDF”.
          </span>
          <button
            ref={printRef}
            type="button"
            className="cv-overlay__action cv-overlay__action--primary"
            onClick={handlePrint}
            disabled={!ready}
          >
            {ready ? "SALVAR PDF" : "PREPARANDO..."}
          </button>
          <button
            ref={closeRef}
            type="button"
            className="cv-overlay__action"
            onClick={onClose}
          >
            FECHAR
          </button>
        </div>
      </header>

      <div className="cv-overlay__pages">
        <CvDocument missions={missions} />
      </div>
    </div>,
    document.body,
  );
};
