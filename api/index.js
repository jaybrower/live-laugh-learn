const fastify = require('fastify')({ logger: true });
const authPlugin = require('./plugins/auth');

fastify.register(authPlugin);

// public route
fastify.get('/', async (request, reply) => {
  return { message: 'Hello world!' };
});

// protected route
fastify.get('/protected', { preHandler: fastify.authenticate }, async (request, reply) => {
  return { message: `Hello ${request.user.username}!` };
});

// login route
fastify.post('/login', async (request, reply) => {
  // replace with your own authentication logic
  const user = { username: 'john.doe' };
  const token = fastify.generateToken(user);
  return { token };
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});