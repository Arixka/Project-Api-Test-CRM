import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    uppercase: true,
    required: true
  }

})


export default mongoose.model('role', roleSchema)
