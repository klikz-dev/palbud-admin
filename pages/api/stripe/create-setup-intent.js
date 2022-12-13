import NextCors from 'nextjs-cors'
const Stripe = require('stripe')

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  const { email, payment_method_types = [] } = req.body

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    typescript: true,
  })
  const customer = await stripe.customers.create({ email })
  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types,
  })

  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    clientSecret: setupIntent.client_secret,
  })
}
