const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

let scores = [];

app.use(cors());
app.use(express.json());

app.post('/submit', (req, res) => {
  console.log('🔥 Incoming body:', req.body); // Add this line

  const { name, score } = req.body;
  if (typeof name === 'string' && typeof score === 'number') {
    scores.push({ name, score });
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});
app.get('/leaderboard', (req, res) => {
  const topScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
  res.json(topScores);
});

app.listen(PORT, () => console.log(`Leaderboard API running on port ${PORT}`));
