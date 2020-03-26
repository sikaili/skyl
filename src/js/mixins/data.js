import axios from "axios";
const is404 = res => {
  return res.response && res.response.status === 404;
};
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

        return;
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

export { is404, getData };
