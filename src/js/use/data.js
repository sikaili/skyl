import axios from 'axios';
// import { useRouter } from 'vue-router';

export default () => {
  // const { push } = useRouter();
  const is404 = (res) => (res.response && res.response.status === 404);
  const getData = (endpoint, options) => axios.get(endpoint, {
    cancelToken: new axios.CancelToken(((c) => {
      window.cancelXHR = c;
    })),
  }).then((res) => {
    if (options && options.required && is404(res, options)) {
      // push('/404');
      return;
    }
    if (res.status === 200) {
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      return res.data;
    }
    return options && options.status ? res : null;
  })
    .catch((error) => {
      console.error(error); //eslint-disable-line
      if (options && options.required && is404(error, options)) {
        push('/404');
      }
    });
  return { getData };
};
// export default () => {
//   const getData = (endpoint) => fetch(endpoint)
//     .then((res) => res.json());
//   return { getData };
// };
