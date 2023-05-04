const axios = require('axios');


const parse = {
  get: function () {
    // url parser
    axios.get('/')
      .then((res) => {
        console.log('axios get response, res.data: ', res.data);
      }).catch((err) => {
        console.log('axios get error: ', err);
      })
  }
}

module.exports = parse;