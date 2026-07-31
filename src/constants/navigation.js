/** Route table used by the header, mobile menu and footer. */

export const SERVICE_LINKS = [
  {
    label: 'Road Freight',
    to: '/services/road-freight',
    icon: 'truck',
    desc: 'FTL & PTL movement across national corridors',
  },
  {
    label: 'Project Cargo',
    to: '/services/project-cargo',
    icon: 'crane',
    desc: 'ODC, heavy-lift and factory relocation',
  },
  {
    label: 'Customized Solutions',
    to: '/services/customized-solutions',
    icon: 'layers',
    desc: 'Industry-engineered logistics programmes',
  },
];

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services', children: SERVICE_LINKS },
  { label: 'Branch Network', to: '/branch-network' },
  { label: 'Industries', to: '/industries' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_COLUMNS = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Branch Network', to: '/branch-network' },
      { label: 'Industries We Serve', to: '/industries' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Road Freight', to: '/services/road-freight' },
      { label: 'Project Cargo', to: '/services/project-cargo' },
      { label: 'Customized Solutions', to: '/services/customized-solutions' },
      { label: 'Interstate Distribution', to: '/services' },
      { label: 'Dedicated Fleet', to: '/services' },
    ],
  },
];
