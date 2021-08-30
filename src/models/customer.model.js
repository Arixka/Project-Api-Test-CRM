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
    image: {
        type: String,
        default:
            'https://res.cloudinary.com/dikram/image/upload/v1629986183/api-test/uqwtuiwhuzwuhehkmeua.png',
        required: true
    },
    created: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    modified: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
customerSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.uid = ret._id
        delete ret._id
        delete ret.__v
    }
})

export default mongoose.model('customer', customerSchema)
