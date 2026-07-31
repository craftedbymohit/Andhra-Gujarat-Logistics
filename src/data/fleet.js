/** Fleet catalogue for the showcase carousel and the Road Freight page. */

export const FLEET = [
  {
    id: 'container',
    art: 'truck',
    name: '32 ft Multi-Axle Container',
    use: 'Palletised and packed cargo on long-haul lanes.',
    payload: '18–21 T',
    length: '32 ft',
  },
  {
    id: 'sxl',
    art: 'truck',
    name: '32 ft Single-Axle (SXL)',
    use: 'High-volume, low-density cargo such as textiles and packaging.',
    payload: '7–9 T',
    length: '32 ft',
  },
  {
    id: 'trailer',
    art: 'trailer',
    name: '40 ft Flat-Bed Trailer',
    use: 'Steel sections, machinery and containerised movement.',
    payload: '25–30 T',
    length: '40 ft',
  },
  {
    id: 'lowbed',
    art: 'lowbed',
    name: 'Semi Low-Bed Trailer',
    use: 'Tall and heavy machinery needing reduced deck height.',
    payload: '40–60 T',
    length: '45 ft',
  },
  {
    id: 'hydraulic',
    art: 'axle',
    name: 'Hydraulic Modular Axle',
    use: 'Over-dimensional and heavy-lift project consignments.',
    payload: '100 T+',
    length: 'Modular',
  },
  {
    id: 'lcv',
    art: 'van',
    name: 'LCV & 19 ft Trucks',
    use: 'City distribution, milk runs and last-mile industrial supply.',
    payload: '3–7 T',
    length: '14–19 ft',
  },
];

/** Key operating lanes for the Road Freight page. */
export const LANES = [
  { from: 'Ahmedabad', to: 'Hyderabad', distance: '1,190 km', transit: '38–42 hrs' },
  { from: 'Ahmedabad', to: 'Vijayawada', distance: '1,420 km', transit: '46–52 hrs' },
  { from: 'Surat', to: 'Visakhapatnam', distance: '1,510 km', transit: '52–58 hrs' },
  { from: 'Ankleshwar', to: 'Hyderabad', distance: '1,010 km', transit: '34–38 hrs' },
  { from: 'Vapi', to: 'Chennai', distance: '1,660 km', transit: '56–62 hrs' },
  { from: 'Rajkot', to: 'Delhi NCR', distance: '1,090 km', transit: '36–40 hrs' },
  { from: 'Gandhidham', to: 'Nagpur', distance: '1,180 km', transit: '38–44 hrs' },
  { from: 'Hyderabad', to: 'Pune', distance: '560 km', transit: '18–22 hrs' },
];
