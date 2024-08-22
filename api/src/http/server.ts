import fastify from 'fastify'

const app = fastify()

const port = 3333

app.get('/hello', () => {
  return 'Hello World!!!'
})

app.listen({ port }).then(() => {
  console.log(`Server rodando na porta: ${port}`)
})