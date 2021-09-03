import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'

dotenv.config()
require('./config/db')
const app = express()
    .use(cors())
    .use(morgan(process.env.NODE_ENV))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(
        fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        })
    )
    .use(require('./routes/index.routes'))
    .use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        throw new Error(err)
    }
    console.info('>'.repeat(40))
    console.info('💻 \x1b[35m   Project Test Api CRM \x1b[0m')
    console.info(`📡 Server is running on PORT:`, process.env.PORT)
    console.info('>'.repeat(40) + '\n')
})

export default app
