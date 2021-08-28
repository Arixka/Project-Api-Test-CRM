import jwt from 'jsonwebtoken'

export const generateJWT = (uid) => {

    return new Promise((resolve, reject)=>{

        const payload = {uid}
        jwt.sign(
            payload,
            process.env.SECRET_JWT,
            {
                expiresIn: '6h'
            },
            (err, token) => {
                if (err) {
                    console.log(err)
                    reject('Failed to generate token')
                } else {
                    resolve(token)
                }
            }
        )

    })
   
}
