import cluster from 'cluster'
import os from 'os'
import express from 'express'
import config from 'config'
import { Repository } from './domain/product.js'
import { FetchPaginated } from './application/product.js'

const repository = new Repository()
const fetchPaginated = new FetchPaginated(repository)

const server = express()
server.get('/status', (_, res) => {
  res.status(200)
  res.setHeader('Content-Type', 'application/json')
  res.json({ data: 'hello wolrd', errors: [] })
})

server.get('/:page', (req, res) => {
  try {
    res.json({
      data: fetchPaginated.exec(req.params.page),
      errors: []
    })
  } catch (e) {
    res.json({ data: null, errors: [e] })
  }
})

const cpus = os.cpus().length
if (cluster.isMaster) {
  console.info(`master ${process.pid}`)
  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.info(`worker ${worker.process.pid} died`)
  })
} else {
  server.listen(config.get('server.port'), config.get('server.host'), () => {
    console.info(`server running at http://${config.get('server.host')}:${config.get('server.port')}`)
  })
}
