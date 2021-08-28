

export const isAdmin = (req, res,next) =>{

  if(!req.userAuth){
    return res.status(500).json({msg:'necesitas token valido'})
  }
  const { role }= req.userAuth

  if(role !== 'Admin'){
    return res.status(500).json({msg:'nno es Admin'})
  }
  next()
}

export const tieneRol = (...roles) =>{
  // cuando queremos pasar parametro
  return (req, res, next)=>{
    if(req.userAuth.rol){
      return res.status(500).json({msg:'vuelva intentarlo'})
    }

    if(roles.includes(req.userAuth.rol)){
      return res.status(500).json({msg:'nno es Admin'})
    }

    next()
  }
}
