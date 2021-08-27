import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        max: 100,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
        max: 100,
        trim: true,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: [true, 'E-mail is required']
    },
    password: {
        type: String,
        min: 6,
        max: 100,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
})

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.password
    }
})

export default mongoose.model('user', userSchema)
