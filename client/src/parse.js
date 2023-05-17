const axios = require('axios');

let count = 0;
const parse = {
  get: (url) => {
    count += 1;
    console.log('GET ', count, 'triggered', url);
    return axios
      .get(url)
      .then((res) => {
        // console.log('axios get response, res.data: ', res.data);
        return res.data;
      })
      .catch((err) => {
        console.log('axios get error: ', err);
      });
  },

  post: (url, data) => {
    console.log('POST triggered');
    return axios
      .post(url, data)
      .then((res) => {
        // console.log('axios post res', res);
        return res;
      })
      .then((err) => {
        console.log('axios post err', err);
      });
  },

  put: (url, data) => {
    console.log('PUT triggered');
    return axios
      .put(url, data)
      .then((res) => {
        // console.log('axios put res', res);
        return res;
      })
      .catch((err) => {
        console.log('axios put err', err);
      });
  },
};

module.exports = parse;
