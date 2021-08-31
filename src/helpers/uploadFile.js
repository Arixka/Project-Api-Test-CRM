import path from 'path'
const { v4: uuidv4 } = require('uuid')


export const uploadFile = (files, validExtensions= ['png', 'jpg', 'gif', 'jpeg'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { image } = files
        const extension = image.mimetype.split('/')[1]

        if (!validExtensions.includes(extension)) {
            return reject(`Only ${validExtensions.join(', ')} are accepted`)
        }

        const nameTemp = `${uuidv4()}.${extension}`
        const uploadPath = path.join(__dirname, '../uploads', folder, nameTemp)

        image.mv(uploadPath, (err) => {
            if (err) {
                console.log(err)
                reject('Error saving image')
            }
            resolve(nameTemp)
        })
    })
}
