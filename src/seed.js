import listProjects from '@/assets/JSON/projects.json';
import infosProjects from '@/assets/JSON/seed.json';
// const infosProjects = {
//   work: [{
//     name: 'Cave',
//     apps: ['cave', 'virus', 'reaction-diffusion', 'quadtree'],
//     year: '2020',
//     des: 'Experiments during the 2020 lockdown.',
//     // p des: 'Speed up a single sound object, move and compose your own',
//     link: 'http://skyl.fr/',
//     img: '/img/covers/cave.jpg',
//     credits: [{
//       role: 'Code, recording ',
//       name: 'Sikai Li',
//       link: 'https://skyl.fr',
//     }],
//     show: false,
//   },
//   // {
//   //   name: 'Ocean Loop',
//   //   des:
//   //     'An audio-visual experiment about ocean plastic pollution, randomly generated graphics, sound of plastic particles.',
//   //   link: 'https://apps.skyl.fr/plastic-ocean',
//   //   img: '/img/covers/plastic-ocean1.jpg',
//   //   year: 2019,
//   //   credits: [
//   //     {
//   //       role: 'Sound, code ',
//   //       name: 'Sikai Li',
//   //       link: 'https://skyl.fr',
//   //     },
//   //   ],
//   //   show: false,
//   // },
//   {
//     name: "Where's Jane",
//     year: 2019,
//     des: "30 days of geolocation data was extracted from Jane's Facebook JSON file, and here is the visualization of it.",
//     about: "Aujourd’hui, la collecte des données personnelles fait partie intégrante de l’expérience utilisateur sur Internet. En relation avec la RGPD et dans un souci de transparence et de clarté, 'Where’s Jane’ présente un programme de data-visualisation des données Facebook de l’utilisateur. Il s’agit de faire prendre conscience et de sensibiliser l’utilisateur à la quantité importante d’informations disponibles sur lui et comment le croisement de ces données peut permettre de dresser un profil de l’utilisateur. (French)",
//     link: 'https://myss.skyl.fr',
//     img: '/img/covers/where-is-joe.jpg',
//     credits: [{
//       role: 'Design, code ',
//       name: 'Sikai Li',
//       link: 'https://skyl.fr',
//     },
//     {
//       role: 'Ideas, support ',
//       name: 'Olaf Avenati',
//       link: 'https://olaf.avenati.net',
//     },
//     {
//       role: 'Communication ',
//       name: 'Yasmine Ben Khaled, Solène Pyrizok, Mathilde Zajac',
//     },
//     ],
//     show: false,
//   },
//   {
//     name: 'Eyes',
//     year: 2018,
//     des: 'The 5000 most common hanzi sorted by frequency. Cute brother is watching you.',
//     link: 'https://eyes.skyl.fr',
//     img: '/img/covers/eyes.png',
//     show: false,
//     credits: [{
//       role: 'Concept, sound, code ',
//       name: 'Sikai Li',
//       link: 'https://skyl.fr',
//     },
//     {
//       role: 'Host',
//       name: 'thecamp',
//       link: 'https://thecamp.fr',
//     },
//     ],
//   },
//   {
//     name: 'Plastic Arcade',
//     year: '2018',
//     link: 'http://thecamp.fr/projects/plastic-arcade',
//     des: 'A playfull arcade cabinet raising awareness about plastic pollution',
//     about: 'Plastic Arcade wants to raise awareness about plastic pollution by turning the systems that create the problem into easily understandable, high-impact video games. Using the arcade cabinet seemed like a natural way to touch the nostalgic fiber in each of us, parents and children alike. By creating several arcade games, each exploring a specific aspect of the plastic pollution problem, we aim to shake people into reflecting and connecting on a personal level to one of the largest issues concerning our civilization today.',
//     img: '/img/covers/plastic-arcade.jpg',
//     numberOfPhotos: 5,
//     show: false,
//     credits: [{
//       role: 'Code, electronics, sound ',
//       name: 'Sikai Li',
//       link: 'https://skyl.fr',
//     },
//     {
//       role: 'Product, game design ',
//       name: 'Theo Le Du',
//       link: 'https://cosmografik.fr/',
//     },
//     {
//       role: '3D graphics, effects ',
//       name: 'Nicolas Grossman',
//       link: 'https://epoqevisual.com/',
//     },
//     {
//       role: 'Host',
//       name: 'thecamp',
//       link: 'https://www.thecamp.fr',
//     },
//     ],
//   },
//   {
//     name: 'Unsustainable',
//     year: '2018',
//     des: 'Particles trying to get bigger and bigger, each collision triggers a random sequence of the poem.',
//     link: 'https://unsustainable.skyl.fr',
//     img: '/img/covers/unsustainable.jpg',
//     show: false,
//     credits: [{
//       role: 'Concept, sound, code ',
//       name: 'Sikai Li',
//       link: 'https://skyl.fr',
//     },
//     {
//       role: 'Poem ',
//       name: 'Ryan Dzelzkalns',
//       link: 'https://www.ryandz.com',
//     },
//     ],
//   },
//   {
//     name: 'Noise Draw',
//     year: 2017,
//     des: 'Draw perlin noise lines and make glichy sound at the same time.',
//     link: 'https://noise-draw.skyl.fr',
//     credits: [{
//       role: 'Concept, code ',
//       name: 'Sikai Li',
//       link: 'https://skyl.fr',
//     }],
//     img: '/img/covers/draw.png',
//     show: false,
//   },
//   ],
//   music: [{
//     name: 'Amarrage',
//     app: 'cave',
//     type: 'sketch',
//     year: '2020',
//     des: '禁足期间，远离了人的噪音，大自然对比强烈的声音给了我很多灵感：骤雨打在玻璃上的暴力，树叶摇在微风里的轻柔。我想探索电吉他这个纯电声乐器的动态，从在琴桥后拨弦的最小的微动，到六根空弦和拾音器碰撞，到失真开到极限的刺耳噪音。经过复杂而随机的后处理，我得到了想要的对比度和故事。虽然这听起来已不再是吉他。',
//     link: 'https://skyl.fr/music/amarrage',
//     img: '/img/covers/Amarrage.jpg',
//     list: [{
//       title: 'Amarrage',
//       artist: 'Sikai Li',
//       src: '/src/projects/player/sound/amarrage.m4a',
//       pic: '/img/covers/Amarrage.jpg',
//     },
//     {
//       title: 'Cripple',
//       artist: 'Sikai Li',
//       src: '/src/projects/player/sound/cripple.m4a',
//       pic: '/img/covers/Amarrage.jpg',
//     },
//     {
//       title: 'Rotation',
//       artist: 'Sikai Li',
//       src: '/src/projects/player/sound/rotation.m4a',
//       pic: '/img/covers/Amarrage.jpg',

//     },
//     ],
//     credits: [{
//       role: 'Music ',
//       name: 'Sikai Li',
//       link: 'https://skyl.fr',
//     }],
//     played: false,
//     show: false,
//   },
//   {
//     name: 'Little Garden',
//     app: 'p',
//     type: 'sketch',
//     year: '2020',
//     des: '一九年十一月，我去到南法的 Mâcon 去买一把绿色 Jazzmaster，试完琴离回巴黎的火车出发还有两个小时，卖家便带我去登了 Roche de Solutré。虽然只待了短短几个小时，那里宁静的气氛还是感染了我，现在想起来还是很清晰。 回到巴黎，嘈杂的地铁和工作，让我没有什么精力去好好弄一首歌，但这把绿色的 Jazzmaster 还是经常会弹，时不时想起 Roche de Solutré 的草，马，阳光，云。不想费脑筋，随便录下一些碎片，然后不再去管他。这些练琴的‘记录’有意义吗？',
//     link: 'https://skyl.fr/music/little-garden',
//     img: '/img/covers/little-garden.png',
//     list: [{
//       title: '7 am 1 pm',
//       artist: 'Sikai Li',
//       src: '/src/projects/player/sound/7am.-0pm.m4a',
//       pic: '/img/covers/little-garden.png',
//     },
//     {
//       title: 'Again',
//       artist: 'Sikai Li',
//       src: '/src/projects/player/sound/again.m4a',
//       pic: '/img/covers/little-garden.png',
//     },
//     {
//       title: 'Phasmids',
//       artist: 'Sikai Li',
//       src: '/src/projects/player/sound/phasmids.m4a',
//       pic: '/img/covers/little-garden.png',

//     },
//     {
//       title: 'Embolism',
//       artist: 'Sikai Li',
//       src: '/src/projects/player/sound/embolism.m4a',
//       pic: '/img/covers/little-garden.png',
//     },
//     {
//       title: 'Carriage Return',
//       artist: 'Sikai Li',
//       src: '/src/projects/player/sound/carriage-return.m4a',
//       pic: '/img/covers/little-garden.png',
//     },
//     ],
//     credits: [{
//       role: 'Music ',
//       name: 'Sikai Li',
//       link: 'https://skyl.fr',
//     }],
//     played: false,

//     show: false,
//   },
//   {
//     name: 'Ocean Loop',
//     des: 'An audio-visual experiment about ocean plastic pollution, randomly generated graphics, sound of plastic particles.',
//     link: 'https://apps.skyl.fr/plastic-ocean',
//     img: '/img/covers/plastic-ocean1.jpg',
//     year: 2018,
//     list: [{
//       title: 'Ocean Loop',
//       artist: 'Sikai Li',
//       src: '/src/projects/player/sound/ocean-loop.m4a',
//       pic: '/img/covers/plastic-ocean1.jpg',
//     }],
//     credits: [{
//       role: 'Sound, code ',
//       name: 'Sikai Li',
//       link: 'https://skyl.fr',
//     }],
//     played: false,

//     show: false,
//   },
//   {
//     name: 'Saturation Chinoise',
//     type: 'iframe-music',
//     year: '2018',
//     link: 'https://apps.skyl.fr/saturation-chinoise/',
//     des: "Music for the video game 'Plastic Arcade' I've been working on during my residency at thecamp, 80's style guitar riff & retro synth sound.",
//     img: '/img/covers/saturation-chinoise.jpg',
//     show: false,
//     played: false,

//     list: [{
//       title: 'Saturation Chinoise',
//       artist: 'Sikai Li',
//       src: '/src/projects/player/sound/saturation-chinoise.m4a',
//       pic: '/img/covers/saturation-chinoise.jpg',
//     }],
//     credits: [{
//       role: 'Music ',
//       name: 'Sikai Li',
//       link: 'https://skyl.fr',
//     },
//     {
//       role: 'For game ',
//       name: 'Plastic Arcade',
//       link: 'https://www.hivers.fr/hive-2/projects/plastic-arcade/',
//     },
//     ],
//   },
//   {
//     name: 'Flower',
//     des: '花',
//     type: 'iframe-music',
//     year: 2016,
//     link: 'https://apps.skyl.fr/hua/',
//     img: '/img/covers/hua.jpg',
//     played: false,

//     show: false,
//     list: [{
//       title: 'Flower',
//       artist: 'Sikai Li',
//       src: '/src/projects/player/sound/flower.m4a',
//       pic: '/img/covers/hua.jpg',
//     }],
//     credits: [{
//       role: 'Music ',
//       name: 'Sikai Li',
//       link: 'https://skyl.fr',
//     },
//     {
//       role: 'Post-Production ',
//       name: 'AB Studio',
//       link: '',
//     },
//     ],
//   },
//   ],
// };

// const work = infosProjects.work.map((item) => ({
//   ...item,
//   type: 'work',
// }));

// const music = infosProjects.music.map((item) => ({
//   ...item,
//   type: 'music',
// }));
// console.log(JSON.stringify([...work, ...music]));
// auto add photos to project
// Object.entries(infosProjects).forEach((obj) => {
//   infosProjects[obj[0]].forEach((a) => {
//     if (!a.about) a.about = a.des;
//     a.id = a.name
//       .split(' ')
//       .join('-')
//       .toLowerCase();
//     const num = 15;
//     const arr = [];
//     for (let i = 0; i < num; i += 1) {
//       try {
//         const m = require(`@/assets/${a.id}/${a.id}_${i}.jpg`);
//         arr.push(m);
//       } catch (err) {
//         //
//       }
//       a.imgs = arr;
//     }
//   });
// });

infosProjects.forEach((a) => {
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

export {
  infosProjects,
  listProjects,
};
