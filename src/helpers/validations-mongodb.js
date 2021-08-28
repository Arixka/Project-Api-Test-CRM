import RoleModel from '../models/role.model'
import UserModel from '../models/user.model'

export const roleValidation = async (role)=>{
  const roleExists= await RoleModel.findOne({role})
  if(!roleExists){
      throw new Error(`This role not exist`)
  }
}

export const isEmail = async(email= '') =>{
  
  const isEmai = await UserModel.findOne({email})
  if(isEmai) throw new Error('E-mail already exists')
} 