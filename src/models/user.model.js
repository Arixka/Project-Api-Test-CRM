import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

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
            'https://res.cloudinary.com/dikram/image/upload/v1630412483/sm0aemzrvvrvakcjvktg.png'
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

userSchema.plugin(paginate)

export default mongoose.model('user', userSchema)
