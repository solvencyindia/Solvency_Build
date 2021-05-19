const express = require('express');
const router = express.Router();

const validateContactInput = require('../../validation/contact');
const Contact = require('../../models/Contact');


router.post("/contacts", (req, res) => {

     //Form vaildation
     const { errors, isValid } = validateContactInput(req.body)

     ///check vaildation
 
     if(!isValid) {
         return res.status(400).json(errors)
     }

    // saving user with request information to database
    const newContact = new Contact({
        order_id: req.body.order_id,
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
});

module.exports = router;
