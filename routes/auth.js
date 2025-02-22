var express = require('express');
var router = express.Router();
const { loginUser, registerUser } = require("../controllers/auth");

router.post('/login', loginUser);

// router.get('/access', accessContent)

// router.post('/login', loginWithPassword)
router.post('/register', registerUser)



module.exports = router;
