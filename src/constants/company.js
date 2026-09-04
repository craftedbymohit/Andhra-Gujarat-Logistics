/**
 * Every piece of client-supplied business information lives here.
 * Swap these values once and the whole site updates.
 *
 * NOTE: phone numbers, emails and addresses below are PLACEHOLDERS.
 * Replace them with the client's verified details before going live.
 */

export const COMPANY = {
  name: 'Andhra Gujarat Logistic',
  shortName: 'AGL',
  legalName: 'Andhra Gujarat Logistic Pvt. Ltd.',
  tagline: 'Moving Industries. Not Just Cargo.',
  established: 2012,

  phone: '+91 93746 19333',
  phoneAlt: '+91 93775 24908',
  whatsapp: '919979014440',
  email: 'andhragujaratlog@yahoo.com',
  salesEmail: 'andhragujaratlog@yahoo.com',
  careersEmail: 'andhragujaratlog@yahoo.com',
  emergency: '+91 99790 14440',
  emergencyAlt: '+91 76220 24908',

  hq: {
    label: 'Corporate Office',
    lines: ['Plot No. 2505 Mattex Battery Compound, Opp. Asian Paint Gate No. 2, G.I.D.C Ankleshwar-393002'],
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
