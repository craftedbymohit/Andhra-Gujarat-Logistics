/** Industry verticals — used on the home strip and the Industries page. */

export const INDUSTRIES = [
  {
    id: 'chemical',
    icon: 'flask',
    title: 'Chemical & Petrochemical',
    summary:
      'Hazardous and non-hazardous chemical movement across the Ankleshwar, Vapi, Nandesari and Vizag belts, run to documented handling protocols.',
    highlights: [
      'MSDS-aligned handling and placarding',
      'TREM card and PESO-compliant vehicles',
      'Trained drivers for hazardous classes',
    ],
    metrics: [
      { label: 'Belts served', value: '6' },
      { label: 'Avg. lane time', value: '38h' },
    ],
  },
  {
    id: 'textile',
    icon: 'thread',
    title: 'Textile & Apparel',
    summary:
      'Yarn, grey fabric, processed cloth and made-ups moved from the Surat and Ahmedabad clusters to processing houses and national markets.',
    highlights: ['Bale and roll optimised loading', 'Moisture-protected covering', 'Cluster-level milk runs'],
    metrics: [
      { label: 'Monthly loads', value: '260+' },
      { label: 'Damage rate', value: '<0.4%' },
    ],
  },
  {
    id: 'engineering',
    icon: 'gear',
    title: 'Engineering & Machinery',
    summary:
      'Castings, machine tools and fabricated assemblies from Rajkot, Vadodara and Hyderabad — including consignments that need ODC clearance.',
    highlights: ['Fabrication and casting movement', 'ODC-capable trailers', 'Crane coordination at both ends'],
    metrics: [
      { label: 'Max payload', value: '100T' },
      { label: 'Clusters', value: '9' },
    ],
  },
  {
    id: 'steel',
    icon: 'bars',
    title: 'Steel & Metals',
    summary:
      'Coils, plates, billets, TMT and structural sections moved from plants and ports on multi-axle and semi-low-bed configurations.',
    highlights: ['Coil cradles and lashing discipline', 'Plant and port evacuation', 'Weighbridge-verified loading'],
    metrics: [
      { label: 'Tonnage / month', value: '18k' },
      { label: 'Plant tie-ups', value: '20+' },
    ],
  },
  {
    id: 'infrastructure',
    icon: 'building',
    title: 'Infrastructure & Construction',
    summary:
      'Girders, precast segments, transmission structures and plant equipment delivered to project sites with limited access and live schedules.',
    highlights: ['Site-access route surveys', 'Sequenced site deliveries', 'Escort and permission handling'],
    metrics: [
      { label: 'Projects served', value: '75+' },
      { label: 'Longest cargo', value: '42m' },
    ],
  },
  {
    id: 'automobile',
    icon: 'car',
    title: 'Automobile & Ancillary',
    summary:
      'Inbound component supply and line-side sequencing for OEMs and tier-1 suppliers across the Chakan, Sanand and Sriperumbudur corridors.',
    highlights: ['JIT inbound windows', 'Returnable bin management', 'Sequenced line-side delivery'],
    metrics: [
      { label: 'OEM lanes', value: '14' },
      { label: 'Window adherence', value: '97%' },
    ],
  },
  {
    id: 'fmcg',
    icon: 'box',
    title: 'FMCG & Consumer',
    summary:
      'High-frequency distribution from plants and mother warehouses to depots and distributors, with route plans built around delivery windows.',
    highlights: ['Depot and distributor runs', 'Multi-drop route planning', 'Peak-season surge capacity'],
    metrics: [
      { label: 'Drops / month', value: '4,800' },
      { label: 'Fill rate', value: '99.1%' },
    ],
  },
  {
    id: 'healthcare',
    icon: 'cross',
    title: 'Pharma & Healthcare',
    summary:
      'API, formulation and device movement from the Hyderabad, Ankleshwar and Vizag pharma clusters under batch-integrity controls.',
    highlights: ['Temperature-controlled options', 'Batch and lot traceability', 'Audit-ready documentation'],
    metrics: [
      { label: 'Cluster hubs', value: '5' },
      { label: 'Doc accuracy', value: '99.6%' },
    ],
  },
];
