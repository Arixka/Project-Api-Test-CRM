import UserModel from '../models/user.model'
import bcrypt from 'bcryptjs'

/**
 * @route Post /users/{id}
 * @access Admin
 * @returns user
 */
export const createUser = async (req, res) => {
    try {
        const { name, lastName, email, password, role } = req.body

        const salt = bcrypt.genSaltSync()
        const passHash = bcrypt.hashSync(password, salt)

        const user = new UserModel({
            name,
            lastName,
            email,
            password: passHash,
            role
        })

        const newUser = await user.save()
        res.status(201).send({ msg: 'New user registered', newUser })
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}

/**
 * @route Get /users
 * @access Admin
 * @returns users
 */

export const getAllUsers = async (req, res) => {

    try {
        const { page, limit } = req.query
        const options = {
          page: parseInt(page, 10) || 1,
          limit: parseInt(limit, 10) || 10,
        }
        const users = await UserModel.paginate({}, options)

        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}

/**
 * @route Get /users/id
 * @access Admin
 * @returns user
 */

export const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).send({ msg: error })
    }
}

/**
 * @route PUT /users/id
 * @access Admin
 * @returns user
 */
export const updateUserById = async (req, res) => {
    try {
        const { role, ...restUser } = req.body
        if (req.body.password) {
            const salt = bcrypt.genSaltSync()
            restUser.password = bcrypt.hashSync(req.body.password, salt)
        }

        const user = await UserModel.findByIdAndUpdate(
            req.params.userId,
            restUser,
            { new: true }
        )
        res.status(201).send({ msg: 'User updated', user })
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}

/**
 * @route Delete /users/id
 * @access Admin
 * @returns user
 */
export const deleteUserById = async (req, res) => {
    try {
        const  user  = await UserModel.findByIdAndDelete(req.params.userId)
        res.status(200).json({ msg: 'User deleted', user })
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}
