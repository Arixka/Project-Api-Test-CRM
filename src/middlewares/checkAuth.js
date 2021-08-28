import UserModel from '../models/user.model'
import jwt from 'jsonwebtoken'

export const checkToken = async (req, res, next) => {
    const token = req.header('token')
    if (!token) {
        return res.status(401).json({ msg: 'You have no permissions' })
    } else {
        try {
            const { uid } = jwt.verify(token, process.env.SECRET_JWT)

            const user = await UserModel.findById({ _id: uid })

            if (!user) return res.status(401).json({ msg: 'User not exist' })

            req.userAuth = user
            next()
        } catch (error) {
            res.status(400).json({ msg: 'Error checkToken ' + error })
        }
    }
}

export const isAdmin = (req, res, next) => {
console.log(req.userAuth)
    if (!req.userAuth) {
        return res.status(401).json({ msg: 'This token not valid' })
    }
    const { role } = req.userAuth

    if (role !== 'ADMIN') {
        return res.status(401).json({ msg: 'Should be admin' })
    }
    next()
}
