import UserModel from '../models/user.model'

exports.authAdmin = (req, res, next) => {
    if (res.locals.user.role === 'admin') {
        next()
    } else {
        res.status(403).send('Access denied')
    }
}
