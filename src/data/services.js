/** Service catalogue — drives the services overview grid and nav dropdown. */

export const SERVICES = [
  {
    id: 'road-freight',
    to: '/services/road-freight',
    icon: 'truck',
    title: 'Road Transportation',
    summary:
      'Full-truck and part-truck movement on scheduled lanes, backed by an attached and owned fleet sized to the consignment rather than to what is parked outside.',
    points: ['FTL & PTL consignments', 'Scheduled lane departures', 'Multi-axle and container carriers'],
  },
  {
    id: 'project-cargo',
    to: '/services/project-cargo',
    icon: 'crane',
    title: 'Project Cargo',
    summary:
      'Over-dimensional and heavy-lift movement planned route-first — survey, permissions, escort and execution handled as one accountable programme.',
    points: ['ODC & heavy-lift movement', 'Route survey and permissions', 'Hydraulic axles and low-beds'],
  },
  {
    id: 'customized-solutions',
    to: '/services/customized-solutions',
    icon: 'layers',
    title: 'Customized Logistics Solutions',
    summary:
      'Logistics programmes engineered around an industry’s actual constraints — temperature, hazard class, batch integrity or line-side sequencing.',
    points: ['Industry-specific SOPs', 'Warehousing integration', 'Dedicated account teams'],
  },
  {
    id: 'interstate',
    to: '/services',
    icon: 'route',
    title: 'Interstate Distribution',
    summary:
      'Consolidated interstate movement between Gujarat, Andhra Pradesh and the national grid, with transhipment discipline that protects transit commitments.',
    points: ['Hub-and-spoke consolidation', 'Guaranteed transit windows', 'Milk-run distribution'],
  },
  {
    id: 'industrial',
    to: '/services',
    icon: 'factory',
    title: 'Industrial Transportation',
    summary:
      'Plant-to-plant and plant-to-port movement for continuous-process industries where a missed vehicle stops a production line.',
    points: ['Plant-to-port evacuation', 'Bulk and packed movement', 'Round-the-clock placement'],
  },
  {
    id: 'dedicated-fleet',
    to: '/services',
    icon: 'shield',
    title: 'Dedicated Fleet',
    summary:
      'Vehicles and drivers ring-fenced to a single client, branded and governed by your SOPs — capacity you can plan against instead of bid for.',
    points: ['Exclusive vehicle allocation', 'Client-branded fleet', 'Contracted capacity guarantees'],
  },
];

/** Home page "Our Expertise" — a shorter, punchier cut of the catalogue. */
export const EXPERTISE = SERVICES.slice(0, 4);

/** Seven-stage operating model shown on the home page and service pages. */
export const PROCESS_STEPS = [
  {
    title: 'Inquiry',
    text: 'Requirement captured with commodity, dimensions, lane and timeline — logged against a single reference number.',
  },
  {
    title: 'Planning',
    text: 'Route, vehicle class and permissions assessed. For ODC movement a physical route survey precedes any commitment.',
  },
  {
    title: 'Vehicle Allocation',
    text: 'Capacity blocked from the owned or contracted pool, with driver and documentation assigned before placement.',
  },
  {
    title: 'Dispatch',
    text: 'Loading supervised, cargo secured to plan, e-way bill and LR issued, and departure confirmed to the client.',
  },
  {
    title: 'Tracking',
    text: 'GPS position and milestone updates flow to the control tower; exceptions are escalated, not discovered later.',
  },
  {
    title: 'Delivery',
    text: 'Unloading coordinated with the consignee against a scheduled slot to avoid detention at either end.',
  },
  {
    title: 'Proof of Delivery',
    text: 'Signed POD digitised and attached to the consignment record, closing the loop for billing and audit.',
  },
];
