import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const {MONGO_URL_ATLAS, MONGO_URL_ATLAS_TEST,NODE_ENV }= process.env

const connectionUrl= NODE_ENV === 'test' ? MONGO_URL_ATLAS_TEST : MONGO_URL_ATLAS

mongoose
    .connect(connectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((db) => {
        if (NODE_ENV !== 'dev') {
            console.log('Connected to %s', db.connection.name)
        }
        
    })
    .catch((err) => {
        console.error('App starting error:', err.message)
        process.exit(1)
    })
