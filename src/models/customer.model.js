import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
        trim: true,
        required:[true, 'Last name is required']
    },
    image: {
        type: String
        default: 'https://res.cloudinary.com/dikram/image/upload/v1629986183/api-test/uqwtuiwhuzwuhehkmeua.png',
        required: [true, 'Image url is required']
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
