const data = {
  work: [
    {
      name: "Plastic Ocean",
      des:
        "Immersive experience about ocean plastic pollution, using sound of plastic particles & randomly generated organic graphics",
      link: "http://ocean.skylstudio.com",
      img: require("@/assets/plastic-ocean1.jpg"),
      year: 2019,
      show: false
    },
    {
      name: "Where's Jane",
      year: 2019,
      des: `From Jane's facebook JSON file, we extracted over 30 days of geolocation data, from the visualisation we can conclude her residence, her school, and more...  `,
      link: "http://myss.skyl.fr",
      img: require("@/assets/where-is-joe.png"),
      show: false
    },
    {
      name: "Eyes",
      year: 2018,
      des: `An interactive installation questionning about the survillance & privacy. More than 5000 hanzi sorted by usage frequency, displayed (hided) on the same page.`,
      link: "http://eyes.skyl.fr",
      img: require("@/assets/eyes.png"),
      show: false
    },
    {
      name: "Unsustainable",
      year: "2018",
      des:
        "10 million people sat for the Gaokao each year and only 10% of them enter a 'decent' school, this one is for them.",
      link: "http://unsustainable.skyl.fr",
      img: require("@/assets/unsustainable.jpg"),
      show: false
    },

    {
      name: "Noise Draw",
      year: 2018,
      link: "http://line.skyl.fr",
      img: require("@/assets/draw.png"),
      show: false
    },
    {
      name: "Gravity",
      year: 2017,
      link: "http://forces.skyl.fr",
      img: require("@/assets/force.jpg"),
      show: false
    }
  ],
  music: [
    {
      name: "Rain Addiction",
      link: "",
      img: require("@/assets/eyes.png"),
      show: false
    },
    {
      name: "Dancers",
      link: "",
      img: require("@/assets/eyes.png"),
      show: false
    },
    {
      name: "Saturation Noich",
      link: "",
      img: require("@/assets/eyes.png"),
      show: false
    },
    {
      name: "Flower",
      link: "http://song.skyl.fr",
      img: require("@/assets/hua.jpg"),
      show: false
    },
    {
      name: "Forces",
      link: "http://forces.skyl.fr",
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
