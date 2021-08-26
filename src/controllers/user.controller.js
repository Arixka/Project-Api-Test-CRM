import User from '../models/user.model'

export const createUser = async (req, res) => {
    res.send(req.body)
    // const newUser = new User({ name: 'admin', lastName: 'Admin', email: 'admin@gmail.com', password: '215421', admin: true
    // })
    // const userSave = await newUser.save()

    //   res.status(201).json(userSave)
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
