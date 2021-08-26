import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     lowercase: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    image: {
        type: String
        default: 'https://res.cloudinary.com/dikram/image/upload/v1629986183/api-test/uqwtuiwhuzwuhehkmeua.png'
    },
    Created: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Modified: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('customer', customerSchema)
