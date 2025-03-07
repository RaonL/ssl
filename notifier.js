const nodemailer = require('nodemailer');

async function sendExpirationNotification(certPath, expirationDate) {
  const transporter = nodemailer.createTransport({
    host: 'your_email_host',
    port: 587,
    secure: false,
    auth: {
      user: 'your_email@example.com',
      pass: 'your_email_password'
    },
  });

  const mailOptions = {
    from: 'your_email@example.com',
    to: 'recipient_email@example.com',
    subject: 'SSL Certificate Expiration Warning',
    text: `The SSL certificate at ${certPath} will expire on ${expirationDate.toDateString()}. Please renew it as soon as possible.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Expiration notification email sent.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendExpirationNotification };
