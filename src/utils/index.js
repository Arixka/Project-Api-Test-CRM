import cloudinary from '../config/cloudinary'

export const uploader(req) {
  return new Promise((resolve, reject) => {
      const dUri = new Datauri()
      let image = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

      cloudinary.uploader.upload(image.content, (err, url) => {
          if (err) return reject(err);
          return resolve(url);
      })
  })
}

