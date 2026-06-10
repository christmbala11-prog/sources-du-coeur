const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createAdmin() {
  const email = 'admin@lessourcesducoeur.ga';
  const password = 'SourcesAdmin2026!';

  // Vérifie si l'admin existe déjà
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('✅ Admin existe déjà :', email);
    process.exit(0);
  }

  // Chiffre le mot de passe
  const hashed = await bcrypt.hash(password, 12);

  // Crée l'admin
  const user = await prisma.user.create({
    data: { email, password: hashed, role: 'admin' }
  });

  console.log('🎉 Admin créé avec succès !');
  console.log('📧 Email :', email);
  console.log('🔑 Mot de passe :', password);
  console.log('⚠️  Changez ce mot de passe après la première connexion !');
  process.exit(0);
}

createAdmin().catch(console.error);