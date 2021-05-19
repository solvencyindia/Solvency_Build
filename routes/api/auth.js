const express = require('express');
const router = express.Router();

const { register, login, contact, contactsplace, employees, employeeslist, contactdelete} = require('../../controllers/auth');


router.post('/signup', register);
router.post('/signin', login);
router.post('/contacts', contact);
router.post('/employees', employees);

router.get('/contactslist', contactsplace);
router.get('/employeeslist', employeeslist);

router.delete('/contactslist/:id', contactdelete);

module.exports = router;