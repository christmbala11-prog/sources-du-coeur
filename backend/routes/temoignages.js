const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// GET — Témoignages approuvés (public, pour le site)
router.get('/publics', async (req, res) => {
  try {
    const temoignages = await prisma.temoignage.findMany({
      where: { statut: 'approuve' },
      orderBy: { createdAt: 'desc' }
    });
    res.json(temoignages);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST — Nouveau témoignage (public)
router.post('/', async (req, res) => {
  const { auteur, province, role, note, texte } = req.body;
  try {
    const temoignage = await prisma.temoignage.create({
      data: { auteur, province, role, note, texte, statut: 'en_attente' }
    });
    res.status(201).json(temoignage);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET — Tous les témoignages (admin)
router.get('/', auth, async (req, res) => {
  try {
    const temoignages = await prisma.temoignage.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(temoignages);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PATCH — Changer le statut (admin)
router.patch('/:id/statut', auth, async (req, res) => {
  const { statut } = req.body;
  try {
    const temoignage = await prisma.temoignage.update({
      where: { id: parseInt(req.params.id) },
      data: { statut }
    });
    res.json(temoignage);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE — Supprimer (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.temoignage.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;