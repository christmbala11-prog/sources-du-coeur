const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dossiers', require('./routes/dossiers'));
app.use('/api/benevoles', require('./routes/benevoles'));
app.use('/api/temoignages', require('./routes/temoignages'));
app.use('/api/signalements', require('./routes/signalements'));

// Route test
app.get('/', (req, res) => {
  res.json({ message: '✅ Les Sources du Cœur API fonctionne !' });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
