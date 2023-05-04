const axios = require('axios');


const parse = {
  get: function (url) {
    // url parser
    axios.get(url)
      .then((res) => {
        console.log('axios get response, res.data: ', res.data);
      }).catch((err) => {
        console.log('axios get error: ', err);
      })
  },

  post: function (url, data) {
    axios.post(url, data)
      .then((res) => {
        console.log('axios post res', res);
      })
      .then((err) => {
        console.log('axios post err', err);
      })
  },

  put: function (url, data) {
    axios.put(url, data)
      .then((res) => {
        console.log('axios put res', res);
      })
      .catch((err) => {
        console.log('axios put err', err);
      })
  }

}

module.exports = parse;