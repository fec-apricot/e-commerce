require('dotenv').config();
const express = require('express');
const path = require('path');
// const cors = require('cors');
const api = require('./apiHelper');

const app = express();
// app.use(cors());

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

// routes
// poducts routes
app.get('/products/:product_id', (req, res) => {
  console.log('GET products/* triggered');

  api.get(req.url)
    .then((result) => {
      console.log('get /products/:product_id res', result.data);
      res.status(200).json(result.data);
    })
    .catch((err) => {
      console.log('get /products/:product_id err', err);
      res.sendStatus(404);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  console.log('GET products/*/styles triggered');

  api.get(req.url)
    .then((result) => {
      console.log('get /products/:product_id/styles res', result.data);
      res.status(200).json(result.data);
    })
    .catch((err) => {
      console.log('get /products/:product_id/styles err', err);
      res.sendStatus(404);
    });
});

app.get('/products/:product_id/related', (req, res) => {
  console.log('GET products/* triggered');

  api.get(req.url)
    .then((result) => {
      console.log('get /products/:product_id/related res', result.data);
      res.status(200).json(result.data);
    })
    .catch((err) => {
      console.log('get /products/:product_id/related err', err);
      res.sendStatus(404);
    });
});

// review routes

app.get('/reviews/', (req, res) => {
  console.log('GET reviews triggered');

  api.get(req.url)
    .then((result) => {
      console.log('get /reviews res', result.data);
      res.status(200).json(result.data);
    })
    .catch((err) => {
      console.log('get /reviews err', err.response.data);
      res.sendStatus(404);
    });
});

app.get('/reviews/meta', (req, res) => {
  console.log('GET reviews triggered');

  api.get(req.url)
    .then((result) => {
      console.log('get /reviews/meta res', result.data);
      res.status(200).json(result.data);
    })
    .catch((err) => {
      console.log('get /reviews/meta err', err);
      res.sendStatus(404);
    });
});

app.post('/reviews', (req, res) => {
  api.post(req.url, req.body)
    .then((result) => {
      console.log('post /reviews result', result.data);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('post /reviews err', err);
      res.sendStatus(404);
    });
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  api.put(req.url, req.body)
    .then((result) => {
      console.log('put /reviews/:review_id/helpful result', result.data);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('put /reviews/:review_id/helpful err', err);
      res.sendStatus(404);
    });
});

app.put('/reviews/:review_id/report', (req, res) => {
  api.put(req.url, req.body)
    .then((result) => {
      console.log('put /reviews/:review_id/report result', result.data);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('put /reviews/:review_id/report err', err);
      res.sendStatus(404);
    });
});

// questions routes

app.get('/qa/questions', (req, res) => {
  console.log('GET reviews triggered');

  api.get(req.url)
    .then((result) => {
      console.log('get /qa/questions res', result.data);
      res.status(200).json(result.data);
    })
    .catch((err) => {
      console.log('get /qa/questions err', err);
      res.sendStatus(404);
    });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  console.log('GET reviews triggered');

  api.get(req.url)
    .then((result) => {
      console.log('get /qa/questions/:question_id/answers res', result.data);
      res.status(200).json(result.data);
    })
    .catch((err) => {
      console.log('get /qa/questions/:question_id/answers err', err);
      res.sendStatus(404);
    });
});

app.post('/qa/questions', (req, res) => {
  console.log(req.body)
  api.post(req.url, req.body)
    .then((result) => {
      console.log('post /qa/questions result', result.data);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('post /qa/questions err', err);
      res.sendStatus(404);
    });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  api.post(req.url, req.body)
    .then((result) => {
      console.log('post /qa/questions/:question_id/answers result', result.data);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('post /qa/questions/:question_id/answers err', err);
      res.sendStatus(404);
    });
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  api.put(req.url, req.body)
    .then((result) => {
      console.log('put /qa/questions/:question_id/helpful result', result.data);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('put /qa/questions/:question_id/helpful err', err);
      res.sendStatus(404);
    });
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  api.put(req.url, req.body)
    .then((result) => {
      console.log('put /qa/questions/:question_id/report result', result.data);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('put /qa/questions/:question_id/report err', err);
      res.sendStatus(404);
    });
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  api.put(req.url, req.body)
    .then((result) => {
      console.log('put /qa/answers/:answer_id/helpful result', result.data);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(' put /qa/answers/:answer_id/helpful err', err);
      res.sendStatus(404);
    });
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  api.put(req.url, req.body)
    .then((result) => {
      console.log('put /qa/answers/:answer_id/report result', result.data);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('put /qa/answers/:answer_id/report err', err);
      res.sendStatus(404);
    });
});

// cart routes

app.get('/cart', (req, res) => {
  api.get(req.url)
    .then((result) => {
      console.log('get /cart res', result.data);
      res.status(200).json(result.data);
    })
    .catch((err) => {
      console.log('get /cart err', err);
      res.sendStatus(404);
    });
});

app.post('/cart', (req, res) => {
  api.post(req.url, req.body)
    .then((result) => {
      console.log('post /cart result', result.data);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('post /cart err', err);
      res.sendStatus(404);
    });
});

app.post('/interactions', (req, res) => {
  api.post(req.url, req.body)
    .then((result) => {
      console.log('post /interactions result', result.data);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('post /interactions err', err);
      res.sendStatus(404);
    });
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
