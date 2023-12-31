const express = require('express');
const Datastore = require('nedb');

const app = express();
app.use(express.static('public'));
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('drawings.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});