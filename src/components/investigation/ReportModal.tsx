import React from "react";
import { InvestigationCase } from "../../types";
import { FormalReportModal } from "./FormalReportModal";

interface ReportModalProps {
  investigation: InvestigationCase | null;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  investigation,
  onClose,
}) => {
  if (!investigation) return null;

  const exhibits =
    investigation.evidence_items ||
    (investigation.evidence ? [investigation.evidence] : []);

  return (
    <FormalReportModal
      investigation={investigation}
      evidenceItems={exhibits}
      isOpen={!!investigation}
      onClose={onClose}
    />
  );
};
