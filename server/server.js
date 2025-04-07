require('dotenv').config();
const express = require('express');
const cors = require('cors');
const etudiantRoutes = require('./routes/etudiants.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/etudiants', etudiantRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Quelque chose a mal tourné!' });
});
// Après la configuration des routes
process.on('unhandledRejection', (err) => {
  console.error('Erreur non gérée:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Exception non capturée:', err);
  process.exit(1);
});
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});