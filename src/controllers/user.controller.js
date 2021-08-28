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
    //TODO paginado
    try {
        const users = await UserModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
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
        console.log(error)
        res.status(500).send({ msg: error })
    }
}

/**
 * @route PUT /users/id
 * @access Admin
 * @returns user
 */
export const updateUserById = async (req, res) => {
    try {

        const {role, ...restUser } = req.body
        if(req.body.password){
            const salt = bcrypt.genSaltSync()
            restUser.password = bcrypt.hashSync(req.body.password, salt)
        }

        const user = await UserModel.findOneAndUpdate(
            req.params.userId,
            restUser,
            { new: true }
        )
        res.status(201).send({ msg: 'User updated', user: user })
    } catch (error) {
        console.log(error)
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

        const { user } = await UserModel.findByIdAndDelete(req.params.userId)

        res.status(200).json({ msg: 'User deleted', user: user })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error })
    }
}
