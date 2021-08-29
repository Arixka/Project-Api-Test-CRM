const express = require('express')
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()
const app = express()
    .use(cors())
    .use(morgan(process.env.NODE_ENV))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(require('./routes/index.routes'))

require('./server')

app.listen(process.env.PORT, (err) => {
    if (err) {
        throw new Error(err)
    }
    console.info('>'.repeat(40))
    console.info('💻  Project Test Api CRM')
    console.info(`📡 Server is running on PORT:`, process.env.PORT)
    console.info('>'.repeat(40) + '\n')
})

export default app

