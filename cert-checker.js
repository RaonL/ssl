const fs = require('fs');
const x509 = require('@fidm/x509');

function checkCertExpiration(certPath) {
  try {
    const certData = fs.readFileSync(certPath, 'utf8');
    const cert = x509.parseCert(certData);
    
    if (cert && cert.validTo) {
      return cert.validTo;
    } else {
      console.error(`Could not parse expiration date from certificate at ${certPath}`);
      return null;
    }
  } catch (error) {
    console.error(`Error reading or parsing certificate at ${certPath}: ${error.message}`);
    return null;
  }
}

module.exports = { checkCertExpiration };
