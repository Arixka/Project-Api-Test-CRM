import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
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
            'https://res.cloudinary.com/dikram/image/upload/v1629986183/api-test/uqwtuiwhuzwuhehkmeua.png'
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
        required: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.uid = ret._id
        delete ret._id
        delete ret.__v
        delete ret.password
    }
})

export default mongoose.model('user', userSchema)
