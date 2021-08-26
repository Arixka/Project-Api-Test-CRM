import jwt from 'jsonwebtoken'

export const generateToken = (uid) => {
    jwt.sign(
        uid,
        process.env.SECRET_JWT,
        {
            expiresIn: '6h'
        },
        (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }
        }
    )
}
