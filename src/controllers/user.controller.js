import UserModel from '../models/user.model'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'

export const createUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors)
        const { name, lastName, email, password } = req.body

        const userExist = await UserModel.findOne({ email })

        if (userExist)
            return res.status(400).send({ msg: 'E-mail already exists' })

        const salt = bcrypt.genSaltSync()
        const passHash = bcrypt.hashSync(password, salt)

        const user = new UserModel({
            name,
            lastName,
            email,
            password: passHash
        })

        const newUser = await user.save()

        res.status(201).send({ msg: 'New user registered' })
    } catch (error) {
        res.status(401).send({ msg: error })
    }
}

export const getAllUsers = async (req, res) => {
    const products = await User.find()
    res.json(products)
    res.send('get all user')
}

export const getUserById = async (req, res) => {
    //get
    res.send('get user by id')
}

export const updateUserById = async (req, res) => {
    //path put?
    res.send('update user by id')
}

export const deleteUserById = async (req, res) => {
    //delete
    res.send('delete user by id')
}

//update role?
