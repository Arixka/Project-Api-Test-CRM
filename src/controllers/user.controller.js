import UserModel from '../models/user.model'
import RoleModel from '../models/role.model'
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
        res.status(201).send({ msg: 'New user registered', user: newUser })
    } catch (error) {
        console.log(error)
        res.status(401).send({ msg: error })
    }
}

/**
 * @route Get /users
 * @access Admin
 * @returns users
 */

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
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
        res.status(500).json(error)
    }
}

/**
 * @route Patch /users/id
 * @access Admin
 * @returns user
 */
export const updateUserById = async (req, res) => {
    try {

        const user = await UserModel.findOneAndUpdate(
            req.params.userId,
            req.body,
            { new: true }
        )
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}
/**
 * @route Delete /users/id
 * @access Admin
 * @returns user
 */
export const deleteUserById = async (req, res) => {
    try {
        const userExist = await UserModel.findById(req.params.userId)
        if (!userExist)
            return res.status(400).send({ msg: 'No user exists with that id' })
        const { user } = await UserModel.findByIdAndDelete(req.params.userId)

        res.status(200).json({ msg: 'User deleted', user: userExist })
    } catch (error) {
        res.status(500).json(error)
    }
}
