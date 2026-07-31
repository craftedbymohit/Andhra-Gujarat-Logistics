/** Long-form content for the three dedicated service pages. */

export const ROAD_FREIGHT = {
  advantages: [
    {
      title: 'Scheduled Lane Departures',
      text: 'Core lanes run to a published departure schedule, so part-load consignments are not held waiting for a truck to fill.',
    },
    {
      title: 'Vehicle Matched to Cargo',
      text: 'Density, dimensions and handling requirements decide the vehicle class — an SXL for volume, a multi-axle for weight, a trailer for length.',
    },
    {
      title: 'Documentation Handled at Branch',
      text: 'LR, e-way bill and transit paperwork issued at the loading branch, so nothing is reconstructed later at a checkpoint.',
    },
    {
      title: 'Detention Managed at Both Ends',
      text: 'Loading and unloading slots are coordinated with the consignee before dispatch, which is where most detention cost actually originates.',
    },
    {
      title: 'Single Point of Escalation',
      text: 'One named operations owner per account. Escalation does not restart at a branch switchboard.',
    },
  ],

  safety: [
    {
      title: 'Pre-Trip Inspection',
      text: 'Brakes, tyres, lights, lashing points, spill kit and extinguisher checked and signed off before every departure.',
    },
    {
      title: 'Load Securement Plan',
      text: 'Cargo-specific lashing — cradles for coils, chain and turnbuckle for machinery, edge protection on packed goods.',
    },
    {
      title: 'Driver Duty Discipline',
      text: 'Duty-hour limits and mandatory rest halts enforced on long-haul lanes, with relief drivers on time-critical runs.',
    },
    {
      title: 'Route Risk Assessment',
      text: 'Known accident-prone stretches, ghat sections and night-movement restrictions factored into the transit plan.',
    },
  ],

  tracking: [
    { icon: 'satellite', title: 'GPS on every vehicle', text: 'Live position and halt duration, visible to the control tower at all times.' },
    { icon: 'bell', title: 'Milestone updates', text: 'Loaded, departed, in transit, arrived and delivered — pushed to your team automatically.' },
    { icon: 'route', title: 'Deviation alerts', text: 'Any departure from the planned route triggers an alert before it becomes a delay.' },
    { icon: 'file', title: 'Digital POD', text: 'Signed proof of delivery digitised and attached to the consignment record within hours.' },
  ],
};

export const PROJECT_CARGO = {
  capabilities: [
    {
      icon: 'crane',
      title: 'Oversized Equipment',
      text: 'Reactors, columns, tanks and pressure vessels beyond standard road dimensions, moved on surveyed routes.',
    },
    {
      icon: 'factory',
      title: 'Factory Relocation',
      text: 'Phased dismantling, packing, movement and re-installation sequencing so the line restarts in the right order.',
    },
    {
      icon: 'gear',
      title: 'Heavy Machinery',
      text: 'Presses, turbines, generators and CNC installations requiring low-bed decks and precise rigging.',
    },
    {
      icon: 'building',
      title: 'Bridge & Precast Components',
      text: 'Girders, segments and structural steel delivered in erection sequence to live construction sites.',
    },
    {
      icon: 'route',
      title: 'Windmill Logistics',
      text: 'Blades, nacelles and tower sections to hill and coastal sites, including last-mile access preparation.',
    },
    {
      icon: 'bars',
      title: 'Power Plant Equipment',
      text: 'Transformers, boilers and switchgear moved under load-bearing and utility-clearance constraints.',
    },
  ],

  execution: [
    {
      title: 'Feasibility & Survey',
      text: 'Physical route survey capturing bridge capacities, overhead clearances, turning radii and ground bearing along the entire route.',
    },
    {
      title: 'Method Statement',
      text: 'A written execution plan covering equipment, rigging, lashing, escort arrangement and the movement window.',
    },
    {
      title: 'Permissions & Clearances',
      text: 'RTO permits in every transit state, police escort coordination, and electrical or highway authority clearances where required.',
    },
    {
      title: 'Mobilisation',
      text: 'Hydraulic axles, low-beds, cranes and escort vehicles positioned at origin ahead of the loading window.',
    },
    {
      title: 'Loading & Securement',
      text: 'Supervised lift and lashing against the method statement, with photographic record before departure.',
    },
    {
      title: 'Controlled Movement',
      text: 'Escorted transit with a supervisor travelling with the consignment and daily progress reporting to the client.',
    },
    {
      title: 'Site Delivery & Handover',
      text: 'Placement at the erection point in the sequence the site requires, with signed handover documentation.',
    },
  ],

  risks: [
    {
      title: 'Route Obstruction',
      text: 'Identified in survey and mitigated by temporary removal, diversion or alternate routing agreed before mobilisation.',
    },
    {
      title: 'Bridge & Culvert Capacity',
      text: 'Load spread calculated against structure capacity; reinforcement or bypass planned where the margin is thin.',
    },
    {
      title: 'Utility Interference',
      text: 'Overhead line clearances mapped and shutdown windows arranged with the utility in advance.',
    },
    {
      title: 'Weather Window',
      text: 'Monsoon and wind limits applied to blade and tall-cargo movement, with the schedule built around them.',
    },
    {
      title: 'Site Access & Ground Condition',
      text: 'Ground bearing assessed and temporary access prepared, so the consignment is not stranded at the last kilometre.',
    },
  ],
};

export const CUSTOM_SOLUTIONS = {
  components: [
    {
      icon: 'layers',
      title: 'Requirement Mapping',
      text: 'We start at your production plan and work backwards — volumes, seasonality, packaging, handling limits and delivery windows.',
    },
    {
      icon: 'route',
      title: 'Network Design',
      text: 'Lane structure, consolidation points and vehicle mix modelled against actual movement data rather than assumption.',
    },
    {
      icon: 'box',
      title: 'Warehousing Integration',
      text: 'Storage, staging and dispatch handled as one flow so cargo is not double-handled between a warehouse and a transporter.',
    },
    {
      icon: 'users',
      title: 'Dedicated Team',
      text: 'A named account team — planner, operations owner and documentation executive — who work only on your consignments.',
    },
    {
      icon: 'monitor',
      title: 'Reporting Cadence',
      text: 'Weekly operating review and a monthly performance pack covering on-time, detention, damage and cost-per-tonne by lane.',
    },
    {
      icon: 'shield',
      title: 'SOP Governance',
      text: 'Your handling standards written into our branch procedures and audited, rather than communicated verbally per load.',
    },
  ],

  support: [
    {
      title: 'Onboarding in 30 Days',
      text: 'Lane baselining, SOP documentation, team assignment and a pilot movement before full cutover.',
    },
    {
      title: 'Single Escalation Path',
      text: 'One account owner with a defined escalation ladder up to the branch head and, beyond that, the director for that region.',
    },
    {
      title: 'Capacity Commitments',
      text: 'Contracted vehicle availability by lane and by month, so peak season does not become a bidding exercise.',
    },
    {
      title: 'Quarterly Business Review',
      text: 'Formal review of performance against the agreed service levels, with corrective actions recorded and tracked.',
    },
  ],
};
