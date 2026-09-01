/**
 * Every piece of client-supplied business information lives here.
 * Swap these values once and the whole site updates.
 *
 * NOTE: phone numbers, emails and addresses below are PLACEHOLDERS.
 * Replace them with the client's verified details before going live.
 */

export const COMPANY = {
  name: 'Andhra Gujarat Logistics',
  shortName: 'AGL',
  legalName: 'Andhra Gujarat Logistics Pvt. Ltd.',
  tagline: 'Moving Industries. Not Just Cargo.',
  established: 2012,

  phone: '+91 98250 00000',
  phoneAlt: '+91 90990 00000',
  whatsapp: '919825000000',
  email: 'info@andhragujaratlogistics.com',
  salesEmail: 'sales@andhragujaratlogistics.com',
  careersEmail: 'careers@andhragujaratlogistics.com',
  emergency: '+91 98250 11111',

  hq: {
    label: 'Corporate Office',
    lines: ['Plot 214, Transport Nagar Road', 'Aslali, Ahmedabad — 382427', 'Gujarat, India'],
  },

  hours: [
    { day: 'Monday – Saturday', time: '09:30 – 19:00' },
    { day: 'Sunday', time: 'Dispatch desk only' },
    { day: 'Control Tower', time: '24 × 7' },
  ],

  socials: [
    { label: 'LinkedIn', icon: 'linkedin', href: '#' },
    { label: 'Facebook', icon: 'facebook', href: '#' },
    { label: 'Instagram', icon: 'instagram', href: '#' },
    { label: 'YouTube', icon: 'youtube', href: '#' },
  ],
};

/** Headline KPIs — reused on the hero, the stats band and interior pages. */
export const KPIS = [
  { value: 98, suffix: '%', label: 'On-Time Deliveries', note: 'Measured across FY 2024–25 consignments' },
  { value: 9, suffix: '', label: 'Branch Locations', note: 'Gujarat, Andhra Pradesh, Telangana and Karnataka' },
  { value: 500, suffix: '+', label: 'Industrial Clients', note: 'Chemical, steel, pharma, auto & FMCG' },
  { value: 24, suffix: '×7', label: 'Operations Support', note: 'Control tower with live consignment visibility' },
];

export const ANNOUNCEMENTS = [
  'New branch operational at Ankleshwar — servicing the GIDC chemical belt.',
  'Dedicated fleet capacity now available for Gujarat ⇄ Andhra Pradesh lanes.',
  '24×7 control tower live — real-time consignment visibility for all contract clients.',
];
