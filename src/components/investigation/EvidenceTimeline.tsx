import React from "react";
import { TimelineEvent } from "../../types";
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

interface EvidenceTimelineProps {
  timeline: TimelineEvent[];
}

export const EvidenceTimeline: React.FC<EvidenceTimelineProps> = ({ timeline }) => {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-slate-700" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Chronological Evidence Timeline
        </h4>
      </div>

      <div className="relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {timeline.map((event, idx) => {
          const hasAnomaly = !!event.divergence_flag || !!event.is_inconsistent;
          const title = event.title || event.event || "Evidence Log";
          const anomalyText =
            event.inconsistency_reason ||
            "Temporal inconsistency detected between ledger timestamp and receipt clock";

          return (
            <div key={event.id || idx} className="relative mb-5 last:mb-0">
              {/* Dot */}
              <div
                className={`absolute -left-[19px] top-1 h-3.5 w-3.5 rounded-full border-2 bg-white ${
                  hasAnomaly
                    ? "border-rose-500 ring-4 ring-rose-100"
                    : "border-blue-600 ring-2 ring-blue-50"
                }`}
              />

              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-slate-500">
                    {event.display_time ||
                      new Date(event.timestamp).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                    {event.source}
                  </span>
                  {hasAnomaly && (
                    <span className="inline-flex items-center gap-1 rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700">
                      <AlertTriangle className="h-3 w-3" />
                      <span>CHRONOLOGY INVERSION</span>
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-slate-800">{title}</p>
                {event.description && (
                  <p className="text-xs text-slate-500">{event.description}</p>
                )}

                {hasAnomaly && (
                  <p className="text-xs text-rose-600 font-medium">
                    {anomalyText}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
