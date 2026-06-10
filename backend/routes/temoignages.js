const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET — Tous les témoignages
router.get('/', async (req, res) => {
  try {
    const temoignages = await prisma.temoignage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(temoignages);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST — Nouveau témoignage
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

// PATCH — Changer le statut
router.patch('/:id/statut', async (req, res) => {
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

// DELETE — Supprimer un témoignage
router.delete('/:id', async (req, res) => {
  try {
    await prisma.temoignage.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
