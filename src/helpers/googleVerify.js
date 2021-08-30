const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

export const googleVerify = async (idToken) => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.OAUTH_CLIENT_ID 
    })
    const {name,email,picture: image} = ticket.getPayload()

    return {name,email,image}
}

