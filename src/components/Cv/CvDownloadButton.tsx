import React, { useCallback, useRef, useState } from "react";
import { loadMissions } from "@/lib/portfolio-api";
import { MISSION_ARCHIVE, type MissionType } from "../Planetary/data/MissionData";
import { CvPreview } from "./CvPreview";

/**
 * Replaces the old /resume.pdf link: opens a print-ready CV built from the
 * profile and the current mission data at the moment of the click.
 */
export const CvDownloadButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [missions, setMissions] = useState<MissionType[] | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const openPreview = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // Force a fresh D1 read so the CV reflects the latest projects.
      const remote = await loadMissions({ force: true });
      setMissions(remote && remote.length > 0 ? remote : MISSION_ARCHIVE);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const closePreview = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      buttonRef.current?.focus({ preventScroll: true });
    });
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="resume-download-btn"
        onClick={openPreview}
        disabled={isLoading}
        aria-haspopup="dialog"
        aria-label="Baixar CV"
        title="Abre o currículo para imprimir ou salvar em PDF"
      >
        <span className="btn-icon" aria-hidden="true">
          {isLoading ? "…" : "↓"}
        </span>
        <span className="btn-text">
          {isLoading ? "GERANDO..." : "BAIXAR CV"}
        </span>
      </button>

      {isOpen && missions && (
        <CvPreview missions={missions} onClose={closePreview} />
      )}
    </>
  );
};
