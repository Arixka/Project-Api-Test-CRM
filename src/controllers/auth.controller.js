import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generateJWT } from '../helpers/generateJWT'

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

export const auth0 = async (req, res) => {
    const { id_token } = req.body
    try {
        const googleUser = await googleVerify(id_token)
        res.json({ msg: 'Login with google corrected', id_token })
    } catch (error) {
        res.json({ msg: 'E-mail not valid' })
    }
}
