import links from '@/assets/JSON/links.json';
import sketches from '@/assets/JSON/sketches.json';

const seedData = {
  work: [
    {
      name: 'p',
      year: '2020',
      des:
        'Speed up a single sound object, move and compose your own',
      link: 'https://skyl.fr/play/p/',
      img: '/img/covers/p.png',
      credits: [
        {
          role: 'Code, recording ',
          name: 'Sikai Li',
          link: 'https://skyl.fr',
        },
      ],
      show: false,
    },
    // {
    //   name: 'Ocean Loop',
    //   des:
    //     'An audio-visual experiment about ocean plastic pollution, randomly generated graphics, sound of plastic particles.',
    //   link: 'https://apps.skyl.fr/plastic-ocean',
    //   img: '/img/covers/plastic-ocean1.jpg',
    //   year: 2019,
    //   credits: [
    //     {
    //       role: 'Sound, code ',
    //       name: 'Sikai Li',
    //       link: 'https://skyl.fr',
    //     },
    //   ],
    //   show: false,
    // },
    {
      name: "Where's Jane",
      year: 2019,
      des:
        "30 days of geolocation data was extracted from Jane's Facebook JSON file, and here is the visualization of it.",
      about:
        "Aujourd’hui, la collecte des données personnelles fait partie intégrante de l’expérience utilisateur sur Internet. En relation avec la RGPD et dans un souci de transparence et de clarté, 'Where’s Jane’ présente un programme de data-visualisation des données Facebook de l’utilisateur. Il s’agit de faire prendre conscience et de sensibiliser l’utilisateur à la quantité importante d’informations disponibles sur lui et comment le croisement de ces données peut permettre de dresser un profil de l’utilisateur. (French)",
      link: 'https://myss.skyl.fr',
      img: '/img/covers/where-is-joe.jpg',
      credits: [
        {
          role: 'Design, code ',
          name: 'Sikai Li',
          link: 'https://skyl.fr',
        },
        {
          role: 'Ideas, support ',
          name: 'Olaf Avenati',
          link: 'https://olaf.avenati.net',
        },
        {
          role: 'Communication ',
          name: 'Yasmine Ben Khaled, Solène Pyrizok, Mathilde Zajac',
        },
      ],
      show: false,
    },
    {
      name: 'Eyes',
      year: 2018,
      des:
        'The 5000 most common hanzi sorted by frequency. Cute brother is watching you.',
      link: 'https://eyes.skyl.fr',
      img: '/img/covers/eyes.png',
      show: false,
      credits: [
        {
          role: 'Concept, sound, code ',
          name: 'Sikai Li',
          link: 'https://skyl.fr',
        },
        {
          role: 'Host',
          name: 'thecamp',
          link: 'https://thecamp.fr',
        },
      ],
    },
    {
      name: 'Plastic Arcade',
      year: '2018',
      link: 'http://thecamp.fr/projects/plastic-arcade',
      des:
        'A playfull arcade cabinet raising awareness about plastic pollution',
      about:
        'Plastic Arcade wants to raise awareness about plastic pollution by turning the systems that create the problem into easily understandable, high-impact video games. Using the arcade cabinet seemed like a natural way to touch the nostalgic fiber in each of us, parents and children alike. By creating several arcade games, each exploring a specific aspect of the plastic pollution problem, we aim to shake people into reflecting and connecting on a personal level to one of the largest issues concerning our civilization today.',
      img: '/img/covers/plastic-arcade.jpg',
      numberOfPhotos: 5,
      show: false,
      credits: [
        {
          role: 'Code, electronics, sound ',
          name: 'Sikai Li',
          link: 'https://skyl.fr',
        },
        {
          role: 'Product, game design ',
          name: 'Theo Le Du',
          link: 'https://cosmografik.fr/',
        },
        {
          role: '3D graphics, effects ',
          name: 'Nicolas Grossman',
          link: 'https://epoqevisual.com/',
        },
        {
          role: 'Host',
          name: 'thecamp',
          link: 'https://www.thecamp.fr',
        },
      ],
    },
    {
      name: 'Unsustainable',
      year: '2018',
      des:
        'Particles trying to get bigger and bigger, each collision triggers a random sequence of the poem.',
      link: 'https://unsustainable.skyl.fr',
      img: '/img/covers/unsustainable.jpg',
      show: false,
      credits: [
        {
          role: 'Concept, sound, code ',
          name: 'Sikai Li',
          link: 'https://skyl.fr',
        },
        {
          role: 'Poem ',
          name: 'Ryan Dzelzkalns',
          link: 'https://www.ryandz.com',
        },
      ],
    },
    {
      name: 'Noise Draw',
      year: 2017,
      des:
        'Draw perlin noise lines and make glichy sound at the same time.',
      link: 'https://noise-draw.skyl.fr',
      credits: [
        {
          role: 'Concept, code ',
          name: 'Sikai Li',
          link: 'https://skyl.fr',
        },
      ],
      img: '/img/covers/draw.png',
      show: false,
    },
  ],
  music: [
    {
      name: 'Amarrage',
      app: 'cave',
      type: 'sketch',
      year: '2020',
      des:
        '慢慢移动到岸边',
      link: 'https://skyl.fr/play/player?id=Amarrage',
      img: '/img/covers/Amarrage.jpg',
      credits: [
        {
          role: 'Music ',
          name: 'Sikai Li',
          link: 'https://skyl.fr',
        },
      ],
      show: false,
    },
    // {
    //   name: 'Rotation',
    //   app: 'cave',
    //   type: 'sketch',
    //   year: '2020',
    //   des:
    //     '锋利的碎片在旋转',
    //   link: 'https://skyl.fr/play/player?id=Rotation',
    //   img: '/img/covers/Rotation.jpg',
    //   credits: [
    //     {
    //       role: 'Music ',
    //       name: 'Sikai Li',
    //       link: 'https://skyl.fr',
    //     },
    //   ],
    //   show: false,
    // },
    {
      name: 'Ocean Loop',
      des:
        'An audio-visual experiment about ocean plastic pollution, randomly generated graphics, sound of plastic particles.',
      link: 'https://apps.skyl.fr/plastic-ocean',
      img: '/img/covers/plastic-ocean1.jpg',
      year: 2019,
      credits: [
        {
          role: 'Sound, code ',
          name: 'Sikai Li',
          link: 'https://skyl.fr',
        },
      ],
      show: false,
    },
    {
      name: 'Saturation Chinoise',
      type: 'musicIframe',
      year: '2018',
      link: 'https://apps.skyl.fr/saturation-chinoise/',
      des:
        "Music for the video game 'Plastic Arcade' I've been working on during my residency at thecamp, 80's style guitar riff & retro synth sound.",
      img: '/img/covers/saturation-chinoise.jpg',
      show: false,
      credits: [
        {
          role: 'Music ',
          name: 'Sikai Li',
          link: 'https://skyl.fr',
        },
        {
          role: 'For game ',
          name: 'Plastic Arcade',
          link: 'https://www.hivers.fr/hive-2/projects/plastic-arcade/',
        },
      ],
    },
    {
      name: 'Flower',
      des: '花',
      type: 'musicIframe',
      year: 2016,
      link: 'https://apps.skyl.fr/hua/',
      img: '/img/covers/hua.jpg',
      show: false,
      credits: [
        {
          role: 'Music ',
          name: 'Sikai Li',
          link: 'https://skyl.fr',
        },
        {
          role: 'Post-Production ',
          name: 'AB Studio',
          link: '',
        },
      ],
    },
  ],
};

const arrayDump = Object.entries(seedData);
arrayDump.map((obj) => {
  seedData[obj[0]].map((a) => {
    if (!a.about) a.about = a.des;
    a.id = a.name
      .split(' ')
      .join('-')
      .toLowerCase();
    const num = 15;
    const arr = [];
    for (let i = 0; i < num; i += 1) {
      try {
        const m = require(`@/assets/${a.id}/${a.id}_${i}.jpg`);
        arr.push(m);
      } catch (err) {
        //
      }
      a.imgs = arr;
    }
  });
});

const getNameFromLink = (link) => {
  let nameStr = link.split('//');
  if (!nameStr[0].includes('https')) {
    return '';
  }
  // links from apps github host
  if (nameStr[1].includes('apps')) {
    nameStr = link.split('/');
    nameStr = nameStr[nameStr.length - 2];
    // links from subdomain
  } else {
    nameStr = nameStr[1].split('.')[0];
  }
  return nameStr;
};

const extraIframeLinks = links;
// get all links
const data = JSON.parse(JSON.stringify(seedData));
const linksFromProjects = [...data.work].concat([...data.music]);
let allIframeLinks = linksFromProjects.concat(extraIframeLinks);
allIframeLinks.forEach((item) => {
  if (!item.id) item.id = getNameFromLink(item.link);
});
allIframeLinks = allIframeLinks.map((iframeObject) => ({
  id: iframeObject.id, link: iframeObject.link, type: iframeObject.type, app: iframeObject.app,
}));
allIframeLinks.filter((iframeObject) => iframeObject.id);

for (let i = 0; i < allIframeLinks.length; i += 1) {
  if (!allIframeLinks[i].link.includes('https') || allIframeLinks[i].link.includes('/play')) {
    allIframeLinks.splice(i, 1);
  }
  for (let t = 0; t < sketches.length; t += 1) {
    if (sketches[t].id === allIframeLinks[i].id) {
      allIframeLinks[i].type = 'sketch';
      sketches.splice(t, 1);
    }
  }
}

// sort items by name using localeCompare
if (sketches.length > 0) {
  allIframeLinks = allIframeLinks.concat(sketches);
}
allIframeLinks.sort((a, b) => a.id.localeCompare(b.id));
allIframeLinks.sort((a, b) => {
  if (a.type === 'sketch') {
    return -1;
  }
  return 0;
});

if (!navigator.onLine) {
  console.log('OFFLINE');
  allIframeLinks = allIframeLinks.filter((a) => a.type === 'sketch');
}

// console.log(JSON.stringify(allIframeLinks));


export { seedData, allIframeLinks };
