import {
  InvestigationCase,
  Transaction,
  EvidenceItem,
  FormalReportRecord,
  SystemHealth,
} from "../types";

import { auth } from "./firebase";

export const API_BASE = "/api/v1";

const isDemoEmail = (email: string | null) => {
  if (!email) return true;
  return (
    email.includes("fraudlens.ai") ||
    email.startsWith("demo") ||
    email === "investigator@fraudlens.ai"
  );
};

const getUserEmail = () => {
  if (auth.currentUser?.email) return auth.currentUser.email;
  try {
    const data = localStorage.getItem("fraudlens_demo_user");
    if (data) {
      const user = JSON.parse(data);
      return user.email;
    }
  } catch(e) {}
  return null;
};

export async function fetchHealth(): Promise<SystemHealth> {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error("Failed to fetch system health");
  return res.json();
}

export async function fetchInvestigations(params?: {
  status?: string;
  severity?: string;
  search?: string;
}): Promise<{
  total: number;
  investigations: InvestigationCase[];
}> {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.severity) query.set("severity", params.severity);
  if (params?.search) query.set("search", params.search);
  
  const email = getUserEmail();
  if (email && !isDemoEmail(email)) {
    query.set("investigator", email);
  }

  const res = await fetch(`${API_BASE}/investigations?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch investigations");
  return res.json();
}

export async function fetchInvestigationById(id: string): Promise<InvestigationCase> {
  const res = await fetch(`${API_BASE}/investigations/${id}`);
  if (!res.ok) throw new Error("Failed to fetch investigation case");
  return res.json();
}

export async function updateInvestigationStatus(
  id: string,
  payload: { status?: string; severity?: string; investigator_notes?: string; assigned_to?: string }
): Promise<InvestigationCase> {
  const res = await fetch(`${API_BASE}/investigations/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update investigation");
  return res.json();
}

export async function signOffInvestigation(
  id: string,
  signed_by: string
): Promise<InvestigationCase> {
  const res = await fetch(`${API_BASE}/investigations/${id}/sign-off`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ signed_by }),
  });
  if (!res.ok) throw new Error("Failed to sign off investigation");
  return res.json();
}

export async function createInvestigation(data: {
  amount: number;
  currency?: string;
  merchant: string;
  category?: string;
  card_last4?: string;
  evidence_ids?: string[];
  title?: string;
  investigator_notes?: string;
  assigned_to?: string;
}): Promise<InvestigationCase> {
  const payload = { ...data };
  const email = getUserEmail();
  if (email && !isDemoEmail(email)) {
    payload.assigned_to = email;
  }

  const res = await fetch(`${API_BASE}/investigations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create investigation case");
  return res.json();
}

export async function askInvestigatorAssistant(
  caseId: string,
  question: string
): Promise<{ answer: string; timestamp: string }> {
  const res = await fetch(`${API_BASE}/investigations/${caseId}/assistant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => null);
    throw new Error(errData?.error || "Assistant request failed");
  }
  return res.json();
}

export async function uploadEvidence(data: {
  filename: string;
  data_url: string;
  document_type?: string;
  uploaded_by?: string;
}): Promise<EvidenceItem> {
  const payload = { ...data };
  const email = getUserEmail();
  if (email && !isDemoEmail(email)) {
    payload.uploaded_by = email;
  }
  const res = await fetch(`${API_BASE}/evidence/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to upload evidence");
  return res.json();
}

export async function fetchEvidenceList(params?: {
  document_type?: string;
  search?: string;
}): Promise<{ total: number; evidence: EvidenceItem[] }> {
  const query = new URLSearchParams();
  if (params?.document_type) query.set("document_type", params.document_type);
  if (params?.search) query.set("search", params.search);

  const email = getUserEmail();
  if (email && !isDemoEmail(email)) {
    query.set("investigator", email);
  }

  const res = await fetch(`${API_BASE}/evidence?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch evidence list");
  return res.json();
}

export async function fetchEvidenceById(id: string): Promise<EvidenceItem> {
  const res = await fetch(`${API_BASE}/evidence/${id}`);
  if (!res.ok) throw new Error("Failed to fetch evidence item");
  return res.json();
}

export async function compareEvidence(data: {
  transaction_id: string;
  evidence_ids: string[];
}): Promise<{
  findings: any[];
  timeline: any[];
  evidence_analyzed: number;
}> {
  const res = await fetch(`${API_BASE}/evidence/compare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to compare evidence");
  return res.json();
}

export async function fetchReports(): Promise<{ total: number; reports: FormalReportRecord[] }> {
  const query = new URLSearchParams();
  const email = getUserEmail();
  if (email && !isDemoEmail(email)) {
    query.set("investigator", email);
  }

  const res = await fetch(`${API_BASE}/reports?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch reports");
  return res.json();
}

export async function fetchAnalytics(): Promise<any> {
  const query = new URLSearchParams();
  const email = getUserEmail();
  if (email && !isDemoEmail(email)) {
    query.set("investigator", email);
  }

  const res = await fetch(`${API_BASE}/analytics?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch analytics");
  return res.json();
}

export async function fetchTransactions(params?: { search?: string }): Promise<{
  total: number;
  transactions: Transaction[];
}> {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);

  const email = getUserEmail();
  if (email && !isDemoEmail(email)) {
    query.set("investigator", email);
  }

  const res = await fetch(`${API_BASE}/transactions?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}
