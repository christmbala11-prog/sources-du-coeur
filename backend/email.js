const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// Email de confirmation dossier
async function sendDossierConfirmation(nom, telephone) {
  try {
    await resend.emails.send({
      from: 'Les Sources du Cœur <onboarding@resend.dev>',
      to: 'christmbala11@gmail.com',
      subject: '📋 Nouveau dossier reçu — Les Sources du Cœur',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #009e60; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Les Sources du Cœur</h1>
          </div>
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #009e60;">Nouveau dossier reçu !</h2>
            <p>Un nouveau dossier vient d'être soumis sur la plateforme.</p>
            <div style="background: white; padding: 20px; border-radius: 10px; border-left: 4px solid #009e60;">
              <p><strong>Nom :</strong> ${nom}</p>
              <p><strong>Téléphone :</strong> ${telephone}</p>
            </div>
            <p style="margin-top: 20px;">
              <a href="http://localhost:8080/admin.html" style="background: #009e60; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                Voir dans l'admin
              </a>
            </p>
          </div>
          <div style="background: #003d20; padding: 15px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 Les Sources du Cœur — République Gabonaise</p>
          </div>
        </div>
      `
    });
    console.log('✅ Email envoyé pour nouveau dossier');
  } catch (err) {
    console.error('❌ Erreur email:', err);
  }
}

// Email de confirmation bénévole
async function sendBenevoleConfirmation(nom, email) {
  try {
    await resend.emails.send({
      from: 'Les Sources du Cœur <onboarding@resend.dev>',
      to: 'christmbala11@gmail.com',
      subject: '🤝 Nouveau aidant inscrit — Les Sources du Cœur',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #009e60; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Les Sources du Cœur</h1>
          </div>
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #fcd116;">Nouveau aidant inscrit !</h2>
            <div style="background: white; padding: 20px; border-radius: 10px; border-left: 4px solid #fcd116;">
              <p><strong>Nom :</strong> ${nom}</p>
              <p><strong>Email :</strong> ${email}</p>
            </div>
            <p style="margin-top: 20px;">
              <a href="http://localhost:8080/admin.html" style="background: #009e60; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                Voir dans l'admin
              </a>
            </p>
          </div>
          <div style="background: #003d20; padding: 15px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 Les Sources du Cœur — République Gabonaise</p>
          </div>
        </div>
      `
    });
    console.log('✅ Email envoyé pour nouveau aidant');
  } catch (err) {
    console.error('❌ Erreur email:', err);
  }
}

module.exports = { sendDossierConfirmation, sendBenevoleConfirmation };
