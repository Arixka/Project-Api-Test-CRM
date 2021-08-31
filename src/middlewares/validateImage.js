export const validateImage = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        return res.status(400).json({ msg: 'Must upload an image' })
    }
    next()
}
