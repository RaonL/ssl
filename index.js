const cron = require('node-cron');
const { checkCertExpiration } = require('./cert-checker');
const { sendExpirationNotification } = require('./notifier');

const certPaths = [
  '/path/to/your/certificate1.crt',
  '/path/to/your/certificate2.crt'
];

const expirationThresholdDays = 30;

cron.schedule('0 0 * * *', () => {
  console.log('Checking SSL certificate expirations...');
  certPaths.forEach(certPath => {
    const expirationDate = checkCertExpiration(certPath);
    if (expirationDate) {
      const timeDiff = expirationDate.getTime() - Date.now();
      const daysUntilExpiration = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysUntilExpiration <= expirationThresholdDays) {
        sendExpirationNotification(certPath, expirationDate);
      } else {
        console.log(`Certificate ${certPath} is valid for ${daysUntilExpiration} more days.`);
      }
    }
  });
}, {
  scheduled: true,
  timezone: 'UTC'
});

console.log('SSL certificate expiration checker started.');
