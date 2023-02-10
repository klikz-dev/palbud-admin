const nodemailer = require('nodemailer')
import NextCors from 'nextjs-cors'

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  const { from, to, subject, html, csv } = JSON.parse(req.body)

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: html,
      attachments: csv
        ? [
            {
              filename: `${new Date().getTime()}.csv`,
              content: csv,
            },
          ]
        : undefined,
    })
    res.status(200).send()
  } catch (error) {
    res.status(500).send(error)
  }
}
