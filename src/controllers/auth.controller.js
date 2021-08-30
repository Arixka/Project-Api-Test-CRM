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
        const userGoogle = await googleVerify(id_token)
        res.status(200).json({ msg: 'Login with google corrected', id_token })
    } catch (error) {
        res.status(401).send({ msg: `E-mail not valid ${error}` })
    }
}
