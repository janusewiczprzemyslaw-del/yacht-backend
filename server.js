const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.CALDIS_API_KEY;

// TEST
app.get('/', (req, res) => {
  res.send('Backend działa 🚀');
});

// Jachty
app.get('/api/yachts', async (req, res) => {
  const response = await fetch('https://caldis.pl/api/yachts', {
    headers: { Authorization: 'Bearer ' + API_KEY }
  });
  const data = await response.json();
  res.json(data);
});

// Dostępność
app.get('/api/availability', async (req, res) => {
  const { yacht_id } = req.query;

  const response = await fetch(`https://caldis.pl/api/availability?yacht_id=${yacht_id}`, {
    headers: { Authorization: 'Bearer ' + API_KEY }
  });

  const data = await response.json();
  res.json(data);
});

app.listen(10000, () => console.log('Server działa'));
