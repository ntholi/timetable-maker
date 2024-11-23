import {
  BAAS,
  BEN,
  BHR,
  BIB,
  CAT,
  CGD,
  CMK,
  DAT,
  DBM,
  DCAV,
  DGD,
  DMK,
  DRM,
} from './courses';

interface Program {
  id: number;
  name: string;
  code: string;
  faculty: string;
  courses?: {
    code: string;
    name: string;
  }[];
}

export const programs: Program[] = [
  {
    id: 518,
    name: 'BA in Architectural Studies',
    code: 'BAAS',
    faculty: 'FABE',
    courses: BAAS,
  },
  {
    id: 509,
    name: 'Certificate in Architectural Technology',
    code: 'CAT',
    faculty: 'FABE',
    courses: CAT,
  },
  {
    id: 493,
    name: 'Diploma in Architecture Technology',
    code: 'DAT',
    faculty: 'FABE',
    courses: DAT,
  },
  {
    id: 512,
    name: 'Certificate in Graphic Design',
    code: 'CGD',
    faculty: 'FDI',
    courses: CGD,
  },
  {
    id: 486,
    name: 'Diploma in Creative Advertising',
    code: 'DCAV',
    faculty: 'FDI',
    courses: DCAV,
  },
  {
    id: 487,
    name: 'Diploma in Graphic Design',
    code: 'DGD',
    faculty: 'FDI',
    courses: DGD,
  },
  {
    id: 503,
    name: 'B Bus in Entrepreneurship',
    code: 'BEN',
    faculty: 'FBMG',
    courses: BEN,
  },
  {
    id: 528,
    name: 'BA in Human Resource Management',
    code: 'BHR',
    faculty: 'FBMG',
    courses: BHR,
  },
  {
    id: 505,
    name: 'B Bus in International Business',
    code: 'BIB',
    faculty: 'FBMG',
    courses: BIB,
  },
  {
    id: 513,
    name: 'Certificate in Marketing',
    code: 'CMK',
    faculty: 'FBMG',
    courses: CMK,
  },
  {
    id: 499,
    name: 'Diploma in Business Management',
    code: 'DBM',
    faculty: 'FBMG',
    courses: DBM,
  },
  {
    id: 500,
    name: 'Diploma in Marketing',
    code: 'DMK',
    faculty: 'FBMG',
    courses: DMK,
  },
  {
    id: 498,
    name: 'Diploma in Retail Management',
    code: 'DRM',
    faculty: 'FBMG',
    courses: DRM,
  },
  {
    id: 530,
    name: 'BA in Professional Communication',
    code: 'BPC',
    faculty: 'FCMB',
  },
  {
    id: 506,
    name: 'Diploma in Journalism & Media',
    code: 'DJM',
    faculty: 'FCMB',
  },
  {
    id: 490,
    name: 'Diploma in Public Relations',
    code: 'DPR',
    faculty: 'FCMB',
  },
  {
    id: 521,
    name: 'BSc in Business Information Technology',
    code: 'BSCBIT',
    faculty: 'FICT',
  },
  {
    id: 520,
    name: 'BSc in Information Technology',
    code: 'BSCIT',
    faculty: 'FICT',
  },
  {
    id: 522,
    name: 'BSc in Software Engineering with Multimedia',
    code: 'BSCSM',
    faculty: 'FICT',
  },
  {
    id: 526,
    name: 'Certificate in Business Information Technology',
    code: 'CBIT',
    faculty: 'FICT',
  },
  {
    id: 524,
    name: 'Diploma in Business Information Technology',
    code: 'DBIT',
    faculty: 'FICT',
  },
  {
    id: 523,
    name: 'Diploma in Information Technology',
    code: 'DIT',
    faculty: 'FICT',
  },
  {
    id: 525,
    name: 'Diploma in Multimedia & Software Engineering',
    code: 'DMSE',
    faculty: 'FICT',
  },
  {
    id: 489,
    name: 'BA in Fashion & Retailing',
    code: 'BAFASH',
    faculty: 'FDI',
  },
  {
    id: 488,
    name: 'Diploma in Fashion & Apparel Design',
    code: 'DFAD',
    faculty: 'FDI',
  },
  {
    id: 492,
    name: 'BA in Broadcasting & Journalism',
    code: 'BBJ',
    faculty: 'FCMB',
  },
  {
    id: 510,
    name: 'BA in Digital Film Production',
    code: 'BDF',
    faculty: 'FCMB',
  },
  {
    id: 519,
    name: 'Certificate in Performing Arts',
    code: 'CPA',
    faculty: 'FCMB',
  },
  {
    id: 517,
    name: 'Certificate in Radio Broadcasting',
    code: 'CRB',
    faculty: 'FCMB',
  },
  {
    id: 504,
    name: 'Diploma in Broadcasting Radio & TV',
    code: 'DBRTV',
    faculty: 'FCMB',
  },
  {
    id: 508,
    name: 'Diploma in Film Production',
    code: 'DFP',
    faculty: 'FCMB',
  },
  {
    id: 484,
    name: 'BA in Tourism Management',
    code: 'BTM',
    faculty: 'FCTH',
  },
  {
    id: 514,
    name: 'Certificate in Innovative Travel & Tourism',
    code: 'CITM',
    faculty: 'FCTH',
  },
  {
    id: 485,
    name: 'Diploma in Events Management',
    code: 'DEM',
    faculty: 'FCTH',
  },
  {
    id: 483,
    name: 'Diploma in Hotel Management',
    code: 'DHM',
    faculty: 'FCTH',
  },
  {
    id: 482,
    name: 'Diploma in Tourism Management',
    code: 'DTM',
    faculty: 'FCTH',
  },
];
