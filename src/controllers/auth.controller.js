import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generateJWT } from '../helpers/generateJWT'
import { googleVerify } from '../helpers/googleVerify'

import UserModel from '../models/user.model'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })

        if (!bcrypt.compareSync(password, user.password))
            return res.status(401).json({ msg: 'Wrong password' })

        const token = await generateJWT(user._id)

        res.status(200).json({ user, token })
    } catch (error) {
        res.status(401).send({ msg: `User does not exist ${error}` })
    }
}

export const googleLogin = async (req, res, next) => {
    try {
        const { id_token } = req.body
        const { name, email, image } = await googleVerify(id_token)

        let user = await UserModel.findOne({ email })
        if (!user) throw new Error('Unauthorized user')

        const data = {
            image,
            google: true
        }
        const userUpdate = await UserModel.findByIdAndUpdate(user._id, data, {
            new: true
        })
        res.status(201).json({ msg: 'Login with google corrected', userUpdate })
    } catch (error) {
        res.status(401).send({ msg: `Token not valid ${error}` })
    }
}
