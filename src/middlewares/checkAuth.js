import UserModel from '../models/user.model'

import passport from 'passport'

const export tokenValid = (req, res, next) => {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) return next(err)

        if (!user)
            return res
                .status(401)
                .json({ message: 'Unauthorized Access - No Token Provided!' })
        req.user = user
        next()
    })(req, res, next)
}


const export authAdmin = (req, res, next) => {
    if (res.locals.user.role === 'admin') {
        next()
    } else {
        res.status(403).send('Access denied')
    }
}


export const isAdmin = (req, res,next) =>{

    if(!req.userAuth){
      return res.status(500).json({msg:'This token not valid'})
    }
    const { role }= req.userAuth
  
    if(role !== 'Admin'){
      return res.status(500).json({msg:'Should be admin'})
    }
    next()
  }
  