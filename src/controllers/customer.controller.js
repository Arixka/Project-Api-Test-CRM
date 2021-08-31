import CustModel from '../models/customer.model'
import { uploadFile } from '../helpers/uploadFile'
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
/**
 * @route Post /customers/{id}
 * @access Admin User
 * @returns customer
 */

export const createCustomer = async (req, res) => {
    try {

        const { name, lastName, phone } = req.body

        // const image = await uploadFile(req.files)

        const { tempFilePath } = req.files.image
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
        const image = secure_url
        const customer = await CustModel({
            name,
            lastName,
            phone,
            image
        })

        const userAuth = req.userAuth
        customer.created = userAuth.id

        const newCustomer = await customer.save()
        res.status(201).send({
            msg: 'New customer registered',
            newCustomer
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error })
    }
}

/**
 * @route Get /customers
 * @access Admin User
 * @returns customers
 */

export const getAllCustomers = async (req, res) => {
    //TODO paginado
    try {
        const customers = await CustModel.find()
        res.status(200).json(customers)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error })
    }
}

/**
 * @route Get /customers/id
 * @access Admin USER
 * @returns customer
 */

export const getCustomerById = async (req, res) => {
    try {
        const customer = await CustModel.findById(req.params.userId)
        res.status(200).json(customer)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error })
    }
}

/**
 * @route PUT /customers/id
 * @access Admin User
 * @returns customer
 */
export const updateCustomerById = async (req, res) => {
    try {
        const { created, modified, ...restCustomer } = req.body

        const customer = await CustModel.findByIdAndUpdate(
            req.params.userId,
            restCustomer,
            { new: true }
        )
        if (req.files.image && customer.image) {
            const nombreArr = customer.image.split('/')
            const nombre = nombreArr[nombreArr.length - 1]
            const [public_id] = nombre.split('.')
            cloudinary.uploader.destroy(public_id)
            const { tempFilePath } = req.files.image
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
            customer.image = secure_url
        }

        customer.modified = req.userAuth.id

        const customerUpdate = await customer.save()
        res.status(201).send({ msg: 'Customer updated', customerUpdate })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error })
    }
}

/**
 * @route Delete /customers/id
 * @access Admin User
 * @returns customer
 */
export const deleteCustomerById = async (req, res) => {
    try {
        const customer = await CustModel.findByIdAndDelete(req.params.userId)
        res.status(200).json({ msg: 'Customer deleted', customer })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error })
    }
}
