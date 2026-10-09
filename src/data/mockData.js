export const articles = [
  {
    id: 1,
    slug: 'cello',
    title: 'Cello',
    category: 'Music',
    author: 'Wikitoo Editors',
    lastVerified: '2026-10-09',
    content: [
      'The cello is a bowed string instrument in the violin family. It is larger than a viola and smaller than a double bass.',
      'It is commonly used in orchestras, chamber music, and solo performance because of its warm, rich tone.',
      'The cello is usually tuned to C, G, D, and A, and is played while seated with the instrument resting between the knees.',
    ],
    sources: ['Encyclopaedia Britannica — Cello', 'The Metropolitan Museum of Art', 'Smithsonian'],
  },
  {
    id: 2,
    slug: 'black-holes',
    title: 'Black Holes',
    category: 'Science',
    author: 'Wikitoo Editors',
    lastVerified: '2026-10-09',
    content: [
      'A black hole is a region in space where gravity is so strong that not even light can escape.',
      'They form when a massive star collapses under its own gravity, leaving behind an extremely dense remnant.',
      'Astronomers study black holes using X-ray observations, gravitational lensing, and changes in nearby matter.',
    ],
    sources: ['NASA', 'ESA', 'Space Telescope Science Institute'],
  },
  {
    id: 3,
    slug: 'global-warming',
    title: 'Global Warming',
    category: 'Earth & Environment',
    author: 'Wikitoo Editors',
    lastVerified: '2026-10-09',
    content: [
      'Global warming refers to the long-term rise in Earth’s average surface temperature due largely to human-caused greenhouse gas emissions.',
      'The main driver is the burning of fossil fuels, which releases carbon dioxide and other gases into the atmosphere.',
      'Scientists monitor this through temperature records, ocean heat content, ice loss, and atmospheric composition.',
    ],
    sources: ['IPCC', 'NASA Climate', 'NOAA'],
  },
  {
    id: 4,
    slug: 'okapi',
    title: 'Okapi',
    category: 'Animals',
    author: 'Wikitoo Editors',
    lastVerified: '2026-10-09',
    content: [
      'The okapi is a highly unusual African mammal that is closely related to the giraffe.',
      'It is native to the dense rainforests of the Democratic Republic of the Congo.',
      'Its striped legs and long neck help it stand out in the forest and may help with camouflage in dense vegetation.',
    ],
    sources: ['National Geographic', 'World Wildlife Fund', 'African forest conservation studies'],
  },
];

export const editors = [
  { id: 1, name: 'Ava', topics: ['Science', 'Space'] },
  { id: 2, name: 'Milo', topics: ['Music', 'Arts'] },
  { id: 3, name: 'Zoe', topics: ['Animals', 'Earth & Environment'] },
];

export const editorRequests = [
  { id: 1, name: 'Gene Bonney', topic: 'Science', status: 'Pending' },
  { id: 2, name: 'Lena Hart', topic: 'Music', status: 'Pending' },
  { id: 3, name: 'Samir Ali', topic: 'Animals', status: 'Approved' },
];

export const reviewQueue = [
  {
    id: 1,
    title: 'How cells divide',
    summary: 'A draft on mitosis and meiosis for science review.',
    status: 'Needs 2 reviewers',
  },
  {
    id: 2,
    title: 'History of guitars',
    summary: 'A draft covering stringed instruments and their development.',
    status: 'Waiting for reviewer',
  },
  {
    id: 3,
    title: 'Forest ecosystems',
    summary: 'Draft article focused on biodiversity and ecosystem balance.',
    status: 'Needs 2 reviewers',
  },
];
