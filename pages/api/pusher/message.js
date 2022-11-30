import NextCors from 'nextjs-cors'
import pusher from '@/lib/pusher'

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  pusher.trigger('palbud-demo', 'message', req.body)
  res.status(200).send()
}
