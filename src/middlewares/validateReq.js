import { validationResult } from 'express-validator'

export const validateReq = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).send(errors)
    next()
}
