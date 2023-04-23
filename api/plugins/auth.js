const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; // replace with your own secret key

function authPlugin(fastify, opts, next) {
  fastify.register(require('@fastify/jwt'), {
    secret: secretKey,
  });

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.decorate('generateToken', function (user) {
    const payload = {
      username: user.username,
      // add additional user data as needed
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  });

  next();
}

module.exports = fp(authPlugin);
