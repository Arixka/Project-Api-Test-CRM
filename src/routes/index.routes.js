// const router = require('express').Router()
import { Router } from "express"

const router = Router()

router.get('/', (req, res)=>{
  res.send('Empezando a hacer cositas')
})

module.exports = router
