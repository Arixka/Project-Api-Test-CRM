import RoleModel from '../models/role.model'
import UserModel from '../models/user.model'

export const roleValid = async (role) => {
    const roleExists = await RoleModel.findOne({ role })
    if (!roleExists) {
        throw new Error(`This role not exist`)
    }
}

export const emailExist = async (email) => {
    const emailExist = await UserModel.findOne({ email })
    if (emailExist) throw new Error('E-mail already exists')
}

export const idExist = async (id)=>{
    const userExist = await UserModel.findById(id)
    if (!userExist)
    throw new Error('No user exists with that id')
}