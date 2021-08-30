import { Router } from 'express'
import { check } from 'express-validator'
import { validateReq } from '../middlewares/validateReq'
import { checkToken, isAdmin, authorizedRole } from '../middlewares/checkAuth'
import { emailExist, idCustomerExist, roleValid } from '../helpers/validations-mongodb'
import {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById
} from '../controllers/customer.controller'

const router = Router()

router.get('/', checkToken, getAllCustomers)
//TODO añadir phone required .isMobilePhone()
router.get(
  '/:userId',
  [
      checkToken,
      authorizedRole('ADMIN', 'USER'),
      check('userId', 'Id not valid').isMongoId(),
      check('userId').custom(idCustomerExist),
      validateReq
  ],
  getCustomerById
)

router.post(
    '/',
    [
        checkToken,
        authorizedRole('ADMIN', 'USER'),
        check('name', 'Name is required').not().isEmpty(),
        check('lastName', 'LastName is required').not().isEmpty(),
        check('image', 'Must upload an image').not().isEmpty(),
        validateReq
    ],
    createCustomer
)


router.put(
  '/:userId',
  [
      checkToken,
      authorizedRole('ADMIN', 'USER'),
      check('userId', 'Id not valid').isMongoId(),
      check('userId').custom(idCustomerExist),
      validateReq
  ],
  updateCustomerById
)

router.delete(
  '/:userId',
  [
      checkToken,
      authorizedRole('ADMIN', 'USER'),
      check('userId', 'Id not valid').isMongoId(),
      check('userId').custom(idCustomerExist),
      validateReq
  ],
  deleteCustomerById
)
module.exports = router
