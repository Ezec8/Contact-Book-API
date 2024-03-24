const express = require('express');
const router = express.Router();
const { registerUser, loginUser, userCurrent } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current', validateToken, userCurrent);


module.exports = router; 