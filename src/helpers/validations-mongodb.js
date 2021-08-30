import RoleModel from '../models/role.model'
import UserModel from '../models/user.model'
import CustModel from '../models/customer.model'

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
export const customerExist = async (phone) => {
    const customerExist = await CustModel.findOne({ phone })
    if (customerExist) throw new Error('Customer already exists')
}

export const idUserExist = async (id)=>{
    const userExist = await UserModel.findById(id)
    if (!userExist)
    throw new Error('No user exists with that id')
}

export const idCustomerExist = async (id)=>{
    const custExist = await CustModel.findById(id)
    if (!custExist)
    throw new Error('No customer exists with that id')
}