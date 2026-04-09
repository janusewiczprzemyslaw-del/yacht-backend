const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 🛥️ Jachty
let yachts = [
  { id: 1, name: "Jacht 1" },
  { id: 2, name: "Jacht 2" },
  { id: 3, name: "Jacht 3" },
  { id: 4, name: "Jacht 4" }
];

// 📅 Sezony
let seasons = [
  { from: "2026-04-01", to: "2026-05-31", price: 3000 },
  { from: "2026-06-01", to: "2026-08-31", price: 7000 },
  { from: "2026-09-01", to: "2026-10-31", price: 4000 }
];

// 📌 Rezerwacje
let bookings = [];

// 🔹 Jachty
app.get('/api/yachts', (req, res) => {
  res.json(yachts);
});

// 🔹 Dostępność
app.get('/api/availability', (req, res) => {
  const { yacht_id } = req.query;

  const events = bookings
    .filter(b => b.yacht_id == yacht_id)
    .map(b => ({
      start: b.from,
      end: b.to,
      title: "Zajęty",
      color: "red"
    }));

  res.json(events);
});

// 🔹 Oblicz cenę
app.post('/api/price', (req, res) => {
  const { from } = req.body;

  const season = seasons.find(s => from >= s.from && from <= s.to);

  res.json({ price: season ? season.price : 0 });
});

// 🔹 Rezerwacja
app.post('/api/book', (req, res) => {
  const { yacht_id, from, to, customer } = req.body;

  bookings.push({ yacht_id, from, to, customer });

  res.json({ success: true });
});

app.listen(10000, () => console.log('Backend działa 🚀'));
