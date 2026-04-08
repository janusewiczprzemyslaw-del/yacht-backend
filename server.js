const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.CALDIS_API_KEY;
const BASE_URL = 'https://caldis.pl/api'; // może być inny – łatwo zmienimy

// TEST
app.get('/', (req, res) => {
  res.send('Backend działa 🚀');
});

// 🔹 uniwersalny proxy endpoint (NAJWAŻNIEJSZE)
app.get('/api/proxy', async (req, res) => {
  const { endpoint } = req.query;

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const text = await response.text();

    // jeśli JSON → zwróć JSON
    try {
      const json = JSON.parse(text);
      res.json(json);
    } catch {
      res.send(text); // fallback
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(10000, () => console.log('Server działa'));
