const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/auths')

router.post('/api/register', AuthController.register)
router.post('/api/login', AuthController.login)
router.get('/api/getUserById/:id', AuthController.getUserById)
router.patch('/api/editInfo/:id', AuthController.editInfo)

module.exports = router