const crypto = require('crypto');

const HMAC_SECRET = process.env.HMAC_SECRET; 

// Verifica la integridad de los datos, que no hayan sido modificados en el camino
//E: X-Data-Signature: 5f4dcc3b5aa765d61d8327deb882cf99
//S: 400 Error: Firma HMAC faltante
//S: 401 Error: Datos modificados o firma inválida
//Continua con la ejecución si los datos son válidos.
const verifyHMAC = (req, res, next) => {
  const receivedSignature = req.headers['x-data-signature'];
  if (!receivedSignature) {
    return res.status(400).json({ error: 'Firma HMAC faltante' });
  }

  // Genera la firma esperada a partir del body de la solicitud
  const rawBody = JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac('sha256', HMAC_SECRET)
    .update(rawBody)
    .digest('hex');

    if (receivedSignature !== expectedSignature) {
      return res.status(401).json({ error: 'Datos modificados o firma inválida' });
    }

  next();
};

module.exports = verifyHMAC;