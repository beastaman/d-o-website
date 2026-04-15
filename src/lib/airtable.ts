const BASE_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}`;
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

async function post(tableName: string, fields: Record<string, unknown>) {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(tableName)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message ?? 'Submission failed');
  }
  return res.json();
}

/* ── Scan Dataset Request (from product card modal) ─────────────────── */
export interface ScanRequestData {
  name: string;
  email: string;
  organization: string;
  vehicle: string;
  year: string;
  category: string;
  formats: string[];
  useCase: string;
  licenseRequired: string;
  notes: string;
}

export function submitScanRequest(data: ScanRequestData) {
  return post('Scan Dataset Requests', {
    Name: data.name,
    Email: data.email,
    Organization: data.organization,
    Dataset: data.vehicle,
    'Vehicle Year': data.year,
    Category: data.category,
    'Available Formats': data.formats.join(', '),
    'Use Case': data.useCase,
    'License Required': data.licenseRequired,
    'Additional Notes': data.notes,
    'Submitted At': new Date().toISOString(),
  });
}

/* ── Custom Scan Request (bespoke scanning form) ─────────────────────── */
export interface CustomScanData {
  name: string;
  company: string;
  email: string;
  vehicle: string;
  timeline: string;
  budget: string;
  useCase: string;
}

export function submitCustomScanRequest(data: CustomScanData) {
  return post('Custom Scan Requests', {
    Name: data.name,
    Company: data.company,
    Email: data.email,
    'Vehicle Required': data.vehicle,
    Timeline: data.timeline,
    'Budget Range': data.budget,
    'Use Case': data.useCase,
    'Submitted At': new Date().toISOString(),
  });
}

/* ── License Inquiry (license tier modal) ────────────────────────────── */
export interface LicenseInquiryData {
  name: string;
  email: string;
  organization: string;
  licenseTier: string;
  intendedUse: string;
  projectDescription: string;
}

export function submitLicenseInquiry(data: LicenseInquiryData) {
  return post('License Inquiries', {
    Name: data.name,
    Email: data.email,
    Organization: data.organization,
    'License Tier': data.licenseTier,
    'Intended Use': data.intendedUse,
    'Project Description': data.projectDescription,
    'Submitted At': new Date().toISOString(),
  });
}

/* ── Contact Inquiry (contact page & homepage contact section) ────────── */
export interface ContactData {
  name: string;
  email: string;
  organization: string;
  inquiryType: string;
  message: string;
}

export function submitContactInquiry(data: ContactData) {
  return post('Contact Inquiries', {
    Name: data.name,
    Email: data.email,
    Organization: data.organization,
    'Inquiry Type': data.inquiryType,
    Message: data.message,
    'Submitted At': new Date().toISOString(),
  });
}
