import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generateToken } from '../midelwares/generateToken'

import UserModel from '../models/user.model'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })
        if (!user) return res.status(404).json({ msg: 'Email not found' })

        if (!bcrypt.compareSync(password, user.password))
            return res.status(401).json({ msg: 'Wrong password' })

        const token = await generateToken({ _id: user._id })

        res.status(200).json({ user, token })
    } catch (error) {
        res.status(401).send({ msg: `User does not exist ${error}` })
    }
}
