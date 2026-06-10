const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET — Tous les signalements
router.get('/', async (req, res) => {
  try {
    const signalements = await prisma.signalement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(signalements);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST — Nouveau signalement
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

module.exports = router;
// PATCH — Changer le statut d'un signalement
router.patch('/:id/statut', async (req, res) => {
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
