const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');
const { sendBenevoleConfirmation } = require('../email');

// POST — Nouveau bénévole (public)
router.post('/', async (req, res) => {
  const { nom, type, email, telephone, ville, specialite, motivation } = req.body;
  try {
    const benevole = await prisma.benevole.create({
      data: { nom, type, email, telephone, ville, specialite, motivation, statut: 'en_attente' }
    });
    res.status(201).json(benevole);
    sendBenevoleConfirmation(benevole.nom, benevole.email);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET — Tous les bénévoles (admin)
router.get('/', auth, async (req, res) => {
  try {
    const benevoles = await prisma.benevole.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(benevoles);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PATCH — Valider ou rejeter (admin)
router.patch('/:id/statut', auth, async (req, res) => {
  const { statut } = req.body;
  try {
    const benevole = await prisma.benevole.update({
      where: { id: parseInt(req.params.id) },
      data: { statut }
    });
    res.json(benevole);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE — Supprimer (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.benevole.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;