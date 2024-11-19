export const faculties = [
  { id: 'FABE', name: 'Faculty of Architecture and Built Environment' },
  { id: 'FBMG', name: 'Faculty of Business and Globalization' },
  { id: 'FCTH', name: 'Faculty of Creative Tourism and Hospitality' },
  { id: 'FCMB', name: 'Faculty of Communication, Media and Broadcasting' },
  { id: 'FDI', name: 'Faculty of Design and Innovation' },
  { id: 'FICT', name: 'Faculty of Information and Communication Technology' },
] as const;

export type Faculty = (typeof faculties)[number]['id'];
export const facultyKeys = faculties.map((it) => it.id) as [
  Faculty,
  ...Faculty[]
];
