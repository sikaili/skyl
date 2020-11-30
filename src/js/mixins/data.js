import axios from 'axios';

const is404 = (res) => res.response && res.response.status === 404;

// dataMxn.getData("./data/work.json").then(data => {
//   data = dataMxn.addMedia(data);
//   this.$store.dispatch("updateProjectsFeed", data);
// });
const getData = (endpoint, options) => axios
  .get(endpoint, {
    cancelToken: new axios.CancelToken(((c) => {
      window.cancelXHR = c;
    })),
  })
  .then((res) => {
    if (options && options.required && is404(res, options)) {
      this.$router.replace({
        name: '404',
      });
    } else if (res.status === 200) {
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      return res.data;
    } else {
      return options && options.status ? res : null;
    }
  })
  .catch((error) => {
      console.error(error); //eslint-disable-line
    if (options && options.required && this.dataMxn.is404(error, options)) {
      this.$router.replace({
        name: '404',
      });
    }
  });

export { is404, getData };
