import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generateJWT } from '../helpers/generateJWT'
import { googleVerify } from '../helpers/googleVerify'
import UserModel from '../models/user.model'

/**
 * @route post /auth/login
 * @access User
 * @returns User Token
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })

        if (!bcrypt.compareSync(password, user.password))
            return res.status(401).json({ msg: 'Wrong password' })
//TODO 400 o 401?
        const token = await generateJWT(user._id)

        res.status(200).json({ user, token })
    } catch (error) {
        res.status(401).send({ msg: `User does not exist ${error}` })
    }
}

/**
 * @route post /auth/google
 * @access User
 * @returns userUpdate Token
 */
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
        const token = await generateJWT(user._id)
        res.status(201).json({
            msg: 'Login with google corrected',
            userUpdate,
            token
        })
    } catch (error) {
        res.status(401).send({ msg: `Token not valid ${error}` })
    }
}
