import links from "@/assets/JSON/links.json";
import sketches from "@/assets/JSON/sketches.json";

const seedData = {
  work: [
    {
      name: "Ocean Loop",
      des:
        "An audio-visual experiment about ocean plastic pollution, randomly generated graphics, sound of plastic particles.",
      link: "https://apps.skyl.fr/plastic-ocean",
      img: "/img/covers/plastic-ocean1.jpg",
      year: 2019,
      credits: [
        {
          role: "Concept, Sound, Code",
          name: "Sikai Li",
          link: "https://skyl.fr"
        }
      ],
      show: false
    },
    {
      name: "Where's Jane",
      year: 2019,
      des:
        "30 days of geolocation data was extracted from Jane's Facebook JSON file, and here is the visualization of it.",
      about:
        "Aujourd’hui, la collecte des données personnelles fait partie intégrante de l’expérience utilisateur sur Internet. En relation avec la RGPD et dans un souci de transparence et de clarté, 'Where’s Jane’ présente un programme de data-visualisation des données Facebook de l’utilisateur. Il s’agit de faire prendre conscience et de sensibiliser l’utilisateur à la quantité importante d’informations disponibles sur lui et comment le croisement de ces données peut permettre de dresser un profil de l’utilisateur. (French)",
      link: "https://myss.skyl.fr",
      img: "/img/covers/where-is-joe.jpg",
      credits: [
        {
          role: "Concept, Development",
          name: "Sikai Li",
          link: "https://skyl.fr"
        },
        {
          role: "Ideas, Support",
          name: "Olaf Avenati",
          link: "https://olaf.avenati.net"
        },
        {
          role: "Communication",
          name: "Yasmine Ben Khaled, Solène Pyrizok, Mathilde Zajac"
        }
      ],
      show: false
    },
    {
      name: "Plastic Arcade",
      year: "2018",
      link: "http://thecamp.fr/projects/plastic-arcade",
      des:
        "A playfull arcade cabinet raising awareness about plastic pollution",
      about:
        "Plastic Arcade wants to raise awareness about plastic pollution by turning the systems that create the problem into easily understandable, high-impact video games. Using the arcade cabinet seemed like a natural way to touch the nostalgic fiber in each of us, parents and children alike. By creating several arcade games, each exploring a specific aspect of the plastic pollution problem, we aim to shake people into reflecting and connecting on a personal level to one of the largest issues concerning our civilization today.",
      img: "/img/covers/plastic-arcade.png",
      numberOfPhotos: 5,
      show: false,
      credits: [
        {
          role: "Code, Electronics, Sound",
          name: "Sikai Li",
          link: "https://skyl.fr"
        },
        {
          role: "Product, Game Design",
          name: "Theo Le Du",
          link: "https://cosmografik.fr/"
        },
        {
          role: "3D Graphics, Effects",
          name: "Nicolas Grossman",
          link: "https://epoqevisual.com/"
        },
        {
          role: "Host",
          name: "thecamp",
          link: "https://www.thecamp.fr"
        }
      ]
    },
    {
      name: "Eyes",
      year: 2018,
      des:
        "The 5000 most common Chinese characters sorted by frequency, displayed or hidden on the same page. Cute brother is watching you.",
      link: "https://eyes.skyl.fr",
      img: "/img/covers/eyes.png",
      show: false,
      credits: [
        {
          role: "Concept, Sound, Code",
          name: "Sikai Li",
          link: "https://skyl.fr"
        },
        {
          role: "Host",
          name: "thecamp",
          link: "https://thecamp.fr"
        }
      ]
    },
    {
      name: "Unsustainable",
      year: "2018",
      des:
        "Particles trying to get bigger and bigger, each collision triggers a random sequence of the poem.",
      link: "https://unsustainable.skyl.fr",
      img: "/img/covers/unsustainable.jpg",
      show: false,
      credits: [
        {
          role: "Concept, Sound, Code",
          name: "Sikai Li",
          link: "https://skyl.fr"
        },
        {
          role: "Poem",
          name: "Ryan Dzelzkalns",
          link: "https://www.ryandz.com"
        }
      ]
    },
    {
      name: "Noise Draw",
      year: 2017,
      des:
        "A tool I made, to draw perlin noise lines and make glichy sound at the same time.",
      link: "https://noise-draw.skyl.fr",
      credits: [
        {
          role: "Concept, Code",
          name: "Sikai Li",
          link: "https://skyl.fr"
        }
      ],
      img: "/img/covers/draw.png",
      show: false
    }
  ],
  music: [
    {
      name: "P",
      year: "2019",
      des:
        "Speed up a single sound object, move and compose your own combination",
      link: "https://skyl.fr/play/p/",
      img: "/img/covers/p.png",
      credits: [
        {
          role: "Code",
          name: "Sikai Li",
          link: "https://skyl.fr"
        }
      ],
      show: false
    },
    {
      name: "Saturation Chinoise",
      year: "2018",
      link: "https://apps.skyl.fr/saturation-chinoise/",
      des:
        "Music for the video game 'Plastic Arcade' I've been working on during my residency at thecamp, 80's style guitar riff & retro synth sound. There's a also chiptone remake done by 2080.",
      img: "/img/covers/saturation-chinoise.jpg",
      show: false,
      credits: [
        {
          role: "Composition & Production",
          name: "Sikai Li",
          link: "https://skyl.fr"
        },
        {
          role: "Game Designer",
          name: "Theo Le Du",
          link: "https://cosmografik.fr/"
        },
        {
          role: "3D Artist",
          name: "Nicolas Grossman",
          link: "https://epoqevisual.com/"
        },
        {
          role: "Host",
          name: "thecamp",
          link: "https://www.thecamp.fr"
        },
        {
          role: "Music for Game",
          name: "Plastic Arcade",
          link: "https://www.hivers.fr/hive-2/projects/plastic-arcade/"
        }
      ]
    },
    {
      name: "Flower",
      des: "A song.",
      year: 2016,
      link: "https://apps.skyl.fr/hua/",
      img: "/img/covers/hua.jpg",
      show: false,
      credits: [
        {
          role: "Composition & Production",
          name: "Sikai Li",
          link: "https://skyl.fr"
        },
        {
          role: "Post-Production",
          name: "AB Studio",
          link: ""
        }
      ]
    }
  ]
};

const arrayDump = Object.entries(seedData);
arrayDump.map(obj => {
  seedData[obj[0]].map(a => {
    !a.about ? (a.about = a.des) : ``;
    a[`id`] = a.name
      .split(` `)
      .join(`-`)
      .toLowerCase();
    const num = 15;
    const arr = [];
    for (let i = 0; i < num; i++) {
      try {
        let m = require(`@/assets/${a.id}/${a.id}_${i}.jpg`);
        arr.push(m);
      } catch (err) {
        continue;
      }
      a[`imgs`] = arr;
    }
  });
});

const getNameFromLink = link => {
  let nameStr = link.split("//");
  if (!nameStr[0].includes("https")) {
    return "";
  }
  // links from apps github host
  if (nameStr[1].includes(`apps`)) {
    nameStr = link.split("/");
    nameStr = nameStr[nameStr.length - 2];
    // links from subdomain
  } else {
    nameStr = nameStr[1].split(".")[0];
  }
  return nameStr;
};

let extraIframeLinks = links;
// get all links
const data = JSON.parse(JSON.stringify(seedData));
const linksFromProjects = [...data.work].concat([...data.music]);
let allIframeLinks = linksFromProjects.concat(extraIframeLinks);
allIframeLinks.forEach(item => {
  item.id ? "" : (item.id = getNameFromLink(item.link));
});
allIframeLinks = allIframeLinks.map(iframeObject => {
  return { id: iframeObject.id, link: iframeObject.link };
});
allIframeLinks.filter(iframeObject => iframeObject.id);
for (let i = 0; i < allIframeLinks.length; i++) {
  for (let t = 0; t < sketches.length; t++) {
    if (sketches[t].id == allIframeLinks[i].id) {
      allIframeLinks[i].type = "sketch";
      sketches.splice(t, 1);
    }
  }
}
if (sketches.length > 0) {
  allIframeLinks = allIframeLinks.concat(sketches);
}
// sort items by name using localeCompare
allIframeLinks.sort((a, b) => a.id.localeCompare(b.id));

if (!navigator.onLine) {
  console.log("OFFLINE");
  allIframeLinks = allIframeLinks.filter(a => a.type === "sketch");
}

export { seedData, allIframeLinks };
