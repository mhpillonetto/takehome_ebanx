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
    //placeholder
    const existing_accounts = ['1','2','3'];

    const account = await request.query;

    existing_accounts.includes(account.account_id) ? (
        reply
            .code(200)
            .send(account)
    ) : 
    reply
        .code(404)
        .send('account not found.')
})

fastify.post('/event', async (request, reply) => {
    //placeholder
    const existing_accounts = [
        {account_id:'1',balance:0},
        {account_id:'2',balance:0},
        {account_id:'3',balance:0}
    ];
    
    const type = request.body.type;
    const account_id = request.body.destination;
    const amount = request.body.amount;

    switch (type) {
        case 'deposit':
             existing_accounts.includes(account_id) ?
                // deposit(destination, amount)
                reply
                    .code(201)
                    .send({"destination":{"id":account_id,"balance":amount}}) 
                :
                reply
                //createAccount(account_id)
                //deposit(destination, amount)
                    .code(201)
                    .send({"destination":{"id":account_id,"balance":amount}})
        
        case 'withdrawal':
             existing_accounts.includes(account_id) ?
                // deposit(destination, amount)
                reply
                    .code(201)
                    .send({"destination":{"id":account_id,"balance":amount}}) 
                :
                reply
                //createAccount(account_id)
                //deposit(destination, amount)
                    .code(404)
                    .send("Account not found")

        default:
                reply
                    .code(201)
                    .send({"destination":{"id":1,"balance":10}})
    }
   
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