const data = {
  work: [
    {
      name: "Ocean Loop",
      des:
        "An installation about ocean plastic pollution, randomly generated graphics with real sound of plastic particles.",
      link: "http://ocean.skylstudio.com",
      img: require("@/assets/plastic-ocean1.jpg"),
      year: 2019,
      credits: [
        {
          role: `Concept, Sound, Code`,
          name: `Sikai Li`,
          link: `http://skyl.fr`
        }
      ],
      show: false
    },
    {
      name: "Where's Jane",
      year: 2019,
      des: `30 days of geolocation data was extracted from Jane's Facebook JSON file, and here is the visualization of it.`,
      link: "http://myss.skyl.fr",
      img: require("@/assets/where-is-joe.jpg"),
      credits: [
        {
          role: `Concept, Development`,
          name: `Sikai Li`,
          link: `http://skyl.fr`
        },
        {
          role: `Ideas, Design`,
          name: `Olaf Avenati`,
          link: `http://olaf.avenati.net`
        },
        {
          role: `Communication`,
          name: `Yasmine Ben Khaled, Solène Pyrizok, Mathilde Zajac`
        }
      ],

      show: false
    },
    {
      name: "Eyes",
      year: 2018,
      des: `The 5000 most common Chinese characters sorted by frequency, displayed or hidden on the same page. Cute brother is watching you.`,
      link: "http://eyes.skyl.fr",
      img: require("@/assets/eyes.png"),
      show: false,
      credits: [
        {
          role: `Concept, Sound, Code`,
          name: `Sikai Li`,
          link: `http://skyl.fr`
        },
        {
          role: `Host`,
          name: `thecamp`,
          link: `http://thecamp.fr`
        }
      ]
    },
    {
      name: "Unsustainable",
      year: "2018",
      des: `10 million people sat for the Gaokao each year and only 10% of them enter a 'decent' school, this one is for them.`,
      link: "http://unsustainable.skyl.fr",
      img: require("@/assets/unsustainable.jpg"),
      show: false
    },

    {
      name: "Noise Draw",
      year: 2018,
      des: `A tool I made, to draw perlin noise lines and make glichy sound at the same time.`,
      link: "http://line.skyl.fr",
      credits: [
        {
          role: `Concept, Code`,
          name: `Sikai Li`,
          link: `http://skyl.fr`
        }
      ],
      img: require("@/assets/draw.png"),
      show: false
    }
    // {
    //   name: "Gravity",
    //   year: 2017,
    //   des: `The force that attracts a body toward any other physical body having mass.`,
    //   link: "http://forces.skyl.fr",
    //   credits: [
    //     {
    //       role: `Concept, Code`,
    //       name: `Sikai Li`,
    //       link: `http://skyl.fr`
    //     }
    //   ],
    //   img: require("@/assets/force.jpg"),
    //   show: false
    // }
  ],
  music: [
    {
      name: "Plastic Ocean",
      year: "2018",
      des: `A piece of electroacoustic music, sound recorded from plastic objects`,
      link: "",
      img: require("@/assets/plastic-ocean.png")
    },
    {
      name: "Dancers",
      year: "2018",
      des: `Music for 'The Ordinary Circus Girl', a VR short film by Fheel Concepts.`,
      link: "",
      img: require("@/assets/dancers.png"),
      credits: [
        {
          role: `Composition & Production`,
          name: `Sikai Li`,
          link: `http://skyl.fr`
        },
        {
          role: `Commission`,
          name: `Corinne Linder`,
          link: `https://www.fheelconcepts.com`
        },
        {
          role: `Samples`,
          name: `Fheel Concepts`,
          link: `https://www.fheelconcepts.com`
        },
        {
          role: `Music for VR Film`,
          name: `The Ordinary Circus Girl`
        }
      ],
      show: false
    },
    {
      name: "Saturation Chinoise",
      year: "2018",
      link: "https://thecamp.fr/projects/plastic-arcade",
      des: `Music for the video game 'Plastic Arcade' I've been working on during my residency at thecamp, 80's style guitar riff & retro synth sound. There's a also chiptone remake done by 2080.`,
      img: require("@/assets/saturation-chinoise.jpg"),
      show: false,
      credits: [
        {
          role: `Composition & Production`,
          name: `Sikai Li`,
          link: `http://skyl.fr`
        },
        {
          role: `Game Designer`,
          name: `Theo Le Du`,
          link: `https://cosmografik.fr/`
        },
        {
          role: `3D Artist`,
          name: `Nicolas Grossman`,
          link: `http://epoqevisual.com/`
        },
        {
          role: `Host`,
          name: `thecamp`,
          link: `https://www.thecamp.fr`
        },
        {
          role: `Music for Game`,
          name: `Plastic Arcade`,
          link: `https://www.hivers.fr/hive-2/projects/plastic-arcade/`
        }
      ]
    },
    {
      name: "Flower",
      year: 2017,
      link: "http://song.skyl.fr",
      img: require("@/assets/hua.jpg"),
      show: false
    },
    {
      name: "Rain Addiction",
      year: "2017",
      link: "",
      img: require("@/assets/eyes.png"),
      show: false
    }
  ]
};
const arrayDump = Object.entries(data);
arrayDump.map(obj => {
  data[obj[0]].map(a => {
    a["id"] = a.name
      .split(" ")
      .join("")
      .toLowerCase();
  });
});

export default {
  work: data.work,
  music: data.music
};
