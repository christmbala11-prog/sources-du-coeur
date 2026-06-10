const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendDossierConfirmation } = require('../email');
// GET — Tous les dossiers
router.get('/', async (req, res) => {
  try {
    const dossiers = await prisma.dossier.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(dossiers);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST — Créer un dossier
router.post('/', async (req, res) => {
  const { nom, telephone, province, bureau, type, description } = req.body;
  try {
    const dossier = await prisma.dossier.create({
      data: { nom, telephone, province, bureau, type, description, statut: 'en_attente' }
    });
    res.status(201).json(dossier);
    sendDossierConfirmation(dossier.nom, dossier.telephone);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PATCH — Changer le statut d'un dossier
router.patch('/:id/statut', async (req, res) => {
  const { statut } = req.body;
  try {
    const dossier = await prisma.dossier.update({
      where: { id: parseInt(req.params.id) },
      data: { statut }
    });
    res.json(dossier);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;