import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((db) => {
        if (process.env.NODE_ENV !== 'dev') {
            console.log('App is running ... \n')
            console.log('Connected to %s', db.connection.host)
            console.log('\nPress CTRL + C to stop the process. \n')
        }
    })
    .catch((err) => {
        console.error('App starting error:', err.message)
        process.exit(1)
    })
