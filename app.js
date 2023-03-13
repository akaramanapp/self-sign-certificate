const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')

const app = express()

app.use('/', (req, res, next) => {
    res.send('hello server')
})

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'server-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'server-cert.pem')),
    requestCert: true,
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, 'cert', 'ca-cert.pem')),
}, app)

sslServer.listen(3443, () => console.log('success'))