import {
  BookOpenCheck,
  HeartPulse,
  Leaf,
  HandHeart,
  UsersRound,
  UtensilsCrossed,
} from 'lucide-react';

export const foundation = {
  name: 'Sri Sai Foundation',
  legalName: 'SREE SAI FOUNDATION',
  established: '14 July 2016',
  founder: 'M. Devaki',
  registrationNo: '128/2016',
  darpanId: 'TN/2018/0207396',
  darpanDate: '03 October 2018',
  csrNo: 'CSR00042113',
  pan: 'ABBTS4200Q',
  location: 'Chennai, Tamil Nadu',
  address: 'No. 37, Annai Sathiya Nagar, Ennore, Chennai – 600057, Tamil Nadu',
  phone: '+91 98407 96964',
  email: 'ennoresstrust@gmail.com',
};

export const programs = [
  {
    icon: BookOpenCheck,
    title: 'Education & Scholarships',
    short: 'Helping learners from economically weaker communities access education, training and opportunity.',
    bullets: [
      'Scholarship and course-fee support for deserving students',
      'Educational assistance for disadvantaged learners',
      'Libraries, learning resources, seminars and workshops',
      'Support for schools, colleges and vocational institutions',
    ],
  },
  {
    icon: UsersRound,
    title: 'Women Empowerment & Skills',
    short: 'Building pathways to self-reliance through skills, employability and entrepreneurship support.',
    bullets: [
      'Tailoring and garment-making skill development',
      'Beautician and vocational training initiatives',
      'Women-focused employment and entrepreneurship support',
      'Community awareness for equality and dignity',
    ],
  },
  {
    icon: HeartPulse,
    title: 'Health & Medical Relief',
    short: 'Promoting access to medical relief, preventive care and community health services.',
    bullets: [
      'Health camps and charitable medical support',
      'Medical relief for underserved communities',
      'Health education and preventive-care awareness',
      'Support for medical learning and research objectives',
    ],
  },
  {
    icon: HandHeart,
    title: 'Community Welfare',
    short: 'Supporting vulnerable families, older persons, children and communities with practical welfare initiatives.',
    bullets: [
      'Relief for weaker and disadvantaged sections',
      'Support for aged persons, children and persons with disabilities',
      'Community facilities and welfare measures',
      'Rehabilitation, guidance and self-employment support',
    ],
  },
  {
    icon: UtensilsCrossed,
    title: 'Food & Nutrition',
    short: 'Advancing food security and compassionate support for people in need.',
    bullets: [
      'Food and meal support for poor and vulnerable communities',
      'Nutrition-focused welfare activities',
      'Community support during periods of need',
      'Inclusive service without discrimination',
    ],
  },
  {
    icon: Leaf,
    title: 'Environment & Livelihoods',
    short: 'Connecting environmental awareness, village development and sustainable livelihoods.',
    bullets: [
      'Environmental protection and hygiene awareness',
      'Agriculture, cottage industry and livelihood support',
      'Village-development and family-welfare initiatives',
      'Technical and managerial assistance for better livelihoods',
    ],
  },
];

// `docs` entries point at files in `public/docs/`, so `public/docs/trust-deed.pdf`
// is written as `/docs/trust-deed.pdf`. Leave `docs` off an item to hide its
// view button.
export const compliance = [
  {
    label: 'Trust Registration',
    value: '128/2016',
    meta: 'Registered at Sub-Registrar Office, Tiruvottiyur',
    docs: [{ label: 'View', file: '/docs/trust-deed.pdf' }],
  },
  {
    label: 'NGO Darpan',
    value: 'TN/2018/0207396',
    meta: 'Government of India NGO registry',
    docs: [{ label: 'View', file: '/docs/ngo-darpan.pdf' }],
  },
  {
    label: 'CSR Registration',
    value: 'CSR00042113',
    meta: 'Registered for undertaking CSR activities',
    docs: [{ label: 'View', file: '/docs/csr-registration.pdf' }],
  },
  {
    label: 'Income-tax',
    value: '12A & 80G',
    meta: 'Registration / approval documents available in records',
    docs: [
      { label: 'View 12A', file: '/docs/12a-certificate.pdf' },
      { label: 'View 80G', file: '/docs/80g-certificate.pdf' },
    ],
  },
];

export const principles = [
  'Service without discrimination based on caste, religion or language',
  'Education and skill-building as pathways to long-term opportunity',
  'Respect, dignity and inclusion for vulnerable communities',
  'Responsible governance and transparent institutional growth',
];

// Hero slideshow images. Files live in `public/images/` and are referenced
// from the site root, so `public/images/hero-1.jpg` is written as
// `/images/hero-1.jpg`. Add or remove entries freely — one slide renders as a
// still image, two or more turn on the crossfade and the dots.
export const heroSlides = [
  { src: '/images/hero-1.jpg', alt: 'Sri Sai Foundation volunteers with the community' },
   { src: '/images/hero-2.jpg', alt: 'Women’s tailoring skill-development session' },
   { src: '/images/hero-3.jpg', alt: 'Students receiving educational support' },
   { src: '/images/hero-4.jpg', alt: 'Students receiving educational support' },
];