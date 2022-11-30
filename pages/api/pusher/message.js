const Pusher = require('pusher')
import NextCors from 'nextjs-cors'

const pusherConfig = require('@/const/pusher.json')
const pusherClient = new Pusher(pusherConfig)

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  console.log(req.body)

  pusherClient.trigger('palbud-demo', 'message', req.body)

  res.status(200).send()
}
