import axios from "axios";

const is404 = res => {
  return res.response && res.response.status === 404;
};

// dataMxn.getData("./data/work.json").then(data => {
//   data = dataMxn.addMedia(data);
//   this.$store.dispatch("updateProjectsFeed", data);
// });
const getData = (endpoint, options) => {
  return axios
    .get(endpoint, {
      cancelToken: new axios.CancelToken(function executor(c) {
        window.cancelXHR = c;
      })
    })
    .then(res => {
      if (options && options.required && is404(res, options)) {
        this.$router.replace({
          name: "404"
        });
      } else if (res.status === 200) {
        if (typeof res.data === "string") {
          res.data = JSON.parse(res.data);
        }
        return res.data;
      } else {
        return options && options.status ? res : null;
      }
    })
    .catch(error => {
      console.error(error); //eslint-disable-line
      if (options && options.required && this.dataMxn.is404(error, options)) {
        this.$router.replace({
          name: "404"
        });
      }
    });
};
const addMedia = data => {
  const seedData = data;
  const arrayDump = Object.entries(seedData);
  arrayDump.map(obj => {
    seedData[obj[0]].map(a => {
      !a.about ? (a.about = a.des) : ``;
      a.id = a.name
        .split(` `)
        .join(`-`)
        .toLowerCase();
      const num = 15;
      const arr = [];
      for (let i = 0; i < num; i++) {
        try {
          const m = require(`@/assets/${a.id}/${a.id}_${i}.jpg`);
          arr.push(m);
        } catch (err) {
          continue;
        }
        a.imgs = arr;
      }
    });
  });
  return seedData;
};

export { is404, getData, addMedia };
