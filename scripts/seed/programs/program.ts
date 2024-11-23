import { Module } from './module';
import { BAAS, CAT, DAT } from './data/FABE';

interface Program {
  id: number;
  name: string;
  programCode: string;
  faculty: string;
  modules?: Module[];
}

const programs: Program[] = [
  {
    id: 518,
    name: 'BA in Architectural Studies',
    programCode: 'BAAS',
    faculty: 'FABE',
    modules: BAAS.modules,
  },
  {
    id: 509,
    name: 'Certificate in Architectural Technology',
    programCode: 'CAT',
    faculty: 'FABE',
    modules: CAT.modules,
  },
  {
    id: 493,
    name: 'Diploma in Architecture Technology',
    programCode: 'DAT',
    faculty: 'FABE',
    modules: DAT.modules,
  },
  {
    id: 512,
    name: 'Certificate in Graphic Design',
    programCode: 'CGD',
    faculty: 'FDI',
  },
  {
    id: 486,
    name: 'Diploma in Creative Advertising',
    programCode: 'DCAV',
    faculty: 'FDI',
  },
  {
    id: 487,
    name: 'Diploma in Graphic Design',
    programCode: 'DGD',
    faculty: 'FDI',
  },
  {
    id: 503,
    name: 'B Bus in Entrepreneurship',
    programCode: 'BEN',
    faculty: 'FBMG',
  },
  {
    id: 528,
    name: 'BA in Human Resource Management',
    programCode: 'BHR',
    faculty: 'FBMG',
  },
  {
    id: 505,
    name: 'B Bus in International Business',
    programCode: 'BIB',
    faculty: 'FBMG',
  },
  {
    id: 513,
    name: 'Certificate in Marketing',
    programCode: 'CMK',
    faculty: 'FBMG',
  },
  {
    id: 499,
    name: 'Diploma in Business Management',
    programCode: 'DBM',
    faculty: 'FBMG',
  },
  {
    id: 500,
    name: 'Diploma in Marketing',
    programCode: 'DMK',
    faculty: 'FBMG',
  },
  {
    id: 498,
    name: 'Diploma in Retail Management',
    programCode: 'DRM',
    faculty: 'FBMG',
  },
  {
    id: 530,
    name: 'BA in Professional Communication',
    programCode: 'BPC',
    faculty: 'FCMB',
  },
  {
    id: 506,
    name: 'Diploma in Journalism & Media',
    programCode: 'DJM',
    faculty: 'FCMB',
  },
  {
    id: 490,
    name: 'Diploma in Public Relations',
    programCode: 'DPR',
    faculty: 'FCMB',
  },
  {
    id: 521,
    name: 'BSc in Business Information Technology',
    programCode: 'BSCBIT',
    faculty: 'FICT',
  },
  {
    id: 520,
    name: 'BSc in Information Technology',
    programCode: 'BSCIT',
    faculty: 'FICT',
  },
  {
    id: 522,
    name: 'BSc in Software Engineering with Multimedia',
    programCode: 'BSCSM',
    faculty: 'FICT',
  },
  {
    id: 526,
    name: 'Certificate in Business Information Technology',
    programCode: 'CBIT',
    faculty: 'FICT',
  },
  {
    id: 524,
    name: 'Diploma in Business Information Technology',
    programCode: 'DBIT',
    faculty: 'FICT',
  },
  {
    id: 523,
    name: 'Diploma in Information Technology',
    programCode: 'DIT',
    faculty: 'FICT',
  },
  {
    id: 525,
    name: 'Diploma in Multimedia & Software Engineering',
    programCode: 'DMSE',
    faculty: 'FICT',
  },
  {
    id: 489,
    name: 'BA in Fashion & Retailing',
    programCode: 'BAFASH',
    faculty: 'FDI',
  },
  {
    id: 488,
    name: 'Diploma in Fashion & Apparel Design',
    programCode: 'DFAD',
    faculty: 'FDI',
  },
  {
    id: 492,
    name: 'BA in Broadcasting & Journalism',
    programCode: 'BBJ',
    faculty: 'FCMB',
  },
  {
    id: 510,
    name: 'BA in Digital Film Production',
    programCode: 'BDF',
    faculty: 'FCMB',
  },
  {
    id: 519,
    name: 'Certificate in Performing Arts',
    programCode: 'CPA',
    faculty: 'FCMB',
  },
  {
    id: 517,
    name: 'Certificate in Radio Broadcasting',
    programCode: 'CRB',
    faculty: 'FCMB',
  },
  {
    id: 504,
    name: 'Diploma in Broadcasting Radio & TV',
    programCode: 'DBRTV',
    faculty: 'FCMB',
  },
  {
    id: 508,
    name: 'Diploma in Film Production',
    programCode: 'DFP',
    faculty: 'FCMB',
  },
  {
    id: 484,
    name: 'BA in Tourism Management',
    programCode: 'BTM',
    faculty: 'FCTH',
  },
  {
    id: 514,
    name: 'Certificate in Innovative Travel & Tourism',
    programCode: 'CITM',
    faculty: 'FCTH',
  },
  {
    id: 485,
    name: 'Diploma in Events Management',
    programCode: 'DEM',
    faculty: 'FCTH',
  },
  {
    id: 483,
    name: 'Diploma in Hotel Management',
    programCode: 'DHM',
    faculty: 'FCTH',
  },
  {
    id: 482,
    name: 'Diploma in Tourism Management',
    programCode: 'DTM',
    faculty: 'FCTH',
  },
];

export default programs;
