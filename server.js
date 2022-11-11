const fastify = require('fastify')({ logger: true })

// routes
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.post('/reset', async (request, reply) => {

    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send('OK')
  })


fastify.get('/balance', async (request, reply) => {    
    const account = await request.query;
    const existing_accounts = ['1','2','3'];

    existing_accounts.includes(account.account_id) ? (
        reply
            .code(200)
            .send(account)
    ) : 
    reply
        .code(404)
        .send('account not found.')
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()