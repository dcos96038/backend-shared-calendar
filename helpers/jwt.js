const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          const error = new Error('Cant generate token');
          reject(error);
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
