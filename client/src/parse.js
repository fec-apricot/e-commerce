const axios = require("axios");

const parse = {
  get: function (url) {
    // url parser
    return axios
      .get(url)
      .then((res) => {
        console.log("axios get response, res.data: ", res.data);
        return res.data;
      })
      .catch((err) => {
        console.log("axios get error: ", err);
      });
  },

  post: function (url, data) {
    return axios
      .post(url, data)
      .then((res) => {
        console.log("axios post res", res);
        return res;
      })
      .then((err) => {
        console.log("axios post err", err);
      });
  },

  put: function (url, data) {
    return axios
      .put(url, data)
      .then((res) => {
        console.log("axios put res", res);
        return res;
      })
      .catch((err) => {
        console.log("axios put err", err);
      });
  },
};

module.exports = parse;
