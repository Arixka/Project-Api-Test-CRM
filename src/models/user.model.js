import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
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
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
})

export default mongoose.model('user', userSchema)
