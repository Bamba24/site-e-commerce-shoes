import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail', // ou autre service comme 'mailtrap', 'sendinblue', etc.
  auth: {
    user: process.env.EMAIL_USER,     // ton email
    pass: process.env.EMAIL_PASS      // mot de passe (ou app password)
  },
});

export const sendOrderConfirmation = async ({
  to,
  name,
  produits,
  total,
}: {
  to: string;
  name: string;
  produits: string;
  total: number;
}) => {
  await transporter.sendMail({
    from: `"Boutique Chaussures" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Confirmation de votre commande',
    html: `
      <h2>Bonjour ${name},</h2>
      <p>Merci pour votre commande sur notre boutique !</p>
      <p><strong>Détails :</strong></p>
      <p>${produits}</p>
      <p><strong>Total :</strong> ${total} FCFA</p>
      <p>Nous vous livrerons dans les plus brefs délais.</p>
      <br/>
      <p>Merci pour votre confiance 🙏</p>
    `,
  });
};
