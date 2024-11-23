import { Module } from './module';
import BAAS from './data/BAAS';

interface Program {
  id: number;
  name: string;
  programCode: string;
  modules?: Module[];
}

const programs: Program[] = [
  {
    id: 518,
    name: 'BA in Architectural Studies',
    programCode: 'BAAS',
    modules: BAAS.modules,
  },
  {
    id: 509,
    name: 'Certificate in Architectural Technology',
    programCode: 'CAT',
  },
  {
    id: 493,
    name: 'Diploma in Architecture Technology',
    programCode: 'DAT',
  },
  {
    id: 512,
    name: 'Certificate in Graphic Design',
    programCode: 'CGD',
  },
  {
    id: 486,
    name: 'Diploma in Creative Advertising',
    programCode: 'DCAV',
  },
  {
    id: 487,
    name: 'Diploma in Graphic Design',
    programCode: 'DGD',
  },
  {
    id: 503,
    name: 'B Bus in Entrepreneurship',
    programCode: 'BEN',
  },
  {
    id: 528,
    name: 'BA in Human Resource Management',
    programCode: 'BHR',
  },
  {
    id: 505,
    name: 'B Bus in International Business',
    programCode: 'BIB',
  },
  {
    id: 513,
    name: 'Certificate in Marketing',
    programCode: 'CMK',
  },
  {
    id: 499,
    name: 'Diploma in Business Management',
    programCode: 'DBM',
  },
  {
    id: 500,
    name: 'Diploma in Marketing',
    programCode: 'DMK',
  },
  {
    id: 498,
    name: 'Diploma in Retail Management',
    programCode: 'DRM',
  },
  {
    id: 530,
    name: 'BA in Professional Communication',
    programCode: 'BPC',
  },
  {
    id: 506,
    name: 'Diploma in Journalism & Media',
    programCode: 'DJM',
  },
  {
    id: 490,
    name: 'Diploma in Public Relations',
    programCode: 'DPR',
  },
  {
    id: 521,
    name: 'BSc in Business Information Technology',
    programCode: 'BSCBIT',
  },
  {
    id: 520,
    name: 'BSc in Information Technology',
    programCode: 'BSCIT',
  },
  {
    id: 522,
    name: 'BSc in Software Engineering with Multimedia',
    programCode: 'BSCSM',
  },
  {
    id: 526,
    name: 'Certificate in Business Information Technology',
    programCode: 'CBIT',
  },
  {
    id: 524,
    name: 'Diploma in Business Information Technology',
    programCode: 'DBIT',
  },
  {
    id: 523,
    name: 'Diploma in Information Technology',
    programCode: 'DIT',
  },
  {
    id: 525,
    name: 'Diploma in Multimedia & Software Engineering',
    programCode: 'DMSE',
  },
  {
    id: 489,
    name: 'BA in Fashion & Retailing',
    programCode: 'BAFASH',
  },
  {
    id: 488,
    name: 'Diploma in Fashion & Apparel Design',
    programCode: 'DFAD',
  },
  {
    id: 492,
    name: 'BA in Broadcasting & Journalism',
    programCode: 'BBJ',
  },
  {
    id: 510,
    name: 'BA in Digital Film Production',
    programCode: 'BDF',
  },
  {
    id: 519,
    name: 'Certificate in Performing Arts',
    programCode: 'CPA',
  },
  {
    id: 517,
    name: 'Certificate in Radio Broadcasting',
    programCode: 'CRB',
  },
  {
    id: 504,
    name: 'Diploma in Broadcasting Radio & TV',
    programCode: 'DBRTV',
  },
  {
    id: 508,
    name: 'Diploma in Film Production',
    programCode: 'DFP',
  },
  {
    id: 484,
    name: 'BA in Tourism Management',
    programCode: 'BTM',
  },
  {
    id: 514,
    name: 'Certificate in Innovative Travel & Tourism',
    programCode: 'CITM',
  },
  {
    id: 485,
    name: 'Diploma in Events Management',
    programCode: 'DEM',
  },
  {
    id: 483,
    name: 'Diploma in Hotel Management',
    programCode: 'DHM',
  },
  {
    id: 482,
    name: 'Diploma in Tourism Management',
    programCode: 'DTM',
  },
];
