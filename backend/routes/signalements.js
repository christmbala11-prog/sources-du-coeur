const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// POST — Nouveau signalement (public)
router.post('/', async (req, res) => {
  const { province, bureau, type, contact, message } = req.body;
  try {
    const signalement = await prisma.signalement.create({
      data: { province, bureau, type, contact, message, statut: 'nouveau' }
    });
    res.status(201).json(signalement);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET — Tous les signalements (admin)
router.get('/', auth, async (req, res) => {
  try {
    const signalements = await prisma.signalement.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(signalements);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PATCH — Changer le statut (admin)
router.patch('/:id/statut', auth, async (req, res) => {
  const { statut } = req.body;
  try {
    const signalement = await prisma.signalement.update({
      where: { id: parseInt(req.params.id) },
      data: { statut }
    });
    res.json(signalement);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE — Supprimer (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.signalement.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
