/** Fleet catalogue for the showcase carousel and the Road Freight page. */

import flatbedImage from '../../assets/flatbed.jpg';
import lcvImage from '../../assets/lcv.jpg';
import multiAxleImage from '../../assets/multiaxel_32ft.avif';
import sxlImage from '../../assets/sxl_truck.jpg';

export const FLEET = [
  {
    id: 'container',
    name: '32 ft Multi-Axle Container',
    image: multiAxleImage,
    use: 'Enclosed long-haul movement for packed and palletised cargo.',
    payload: '18–21 T',
    length: '32 ft',
  },
  {
    id: 'sxl',
    name: '32 ft Single-Axle (SXL)',
    image: sxlImage,
    use: 'Flexible capacity for lighter, high-volume industrial loads.',
    payload: '7–9 T',
    length: '32 ft',
  },
  {
    id: 'trailer',
    name: '40 ft Flat-Bed Trailer',
    image: flatbedImage,
    use: 'Steel sections, machinery and containerised movement.',
    payload: '25–30 T',
    length: '40 ft',
  },
  {
    id: 'lcv',
    name: 'LCV & 19 ft Trucks',
    image: lcvImage,
    use: 'Agile distribution for short-haul and last-mile industrial supply.',
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
