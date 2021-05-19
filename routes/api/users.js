const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateContactInput = require('../../validation/contact');
const Contact = require('../../models/Contact');

const User = require('../../models/User');


router.post("/register", (req, res) => {

    //Form vaildation
    const { errors, isValid } = validateRegisterInput(req.body)

    ///check vaildation

    if(!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email }).then(returnedStuff => {
        if(returnedStuff) {
            return res.status(400).json({email: "Email already exist!!!"})
        }
    });

    // saving user with request information to database
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then(user => res.json(user)).catch(err => console.log(err));
        });
    });

});


router.post("/login", (req, res) => {

    //what happens
    const {errors, isValid} = validateLoginInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(user => {

        //check if user exists
        if(!user){
            return res.status(404).json({emailnotfound: "Email not found"});
        }

        //check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                //user matched
                //create JWT payload

                const payload ={ id: user.id, name: user.name };

                //sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {expiresIn: 31556929},
                    (err, token) => {
                    res.json({ success: true, token: "Bearer" + token});
                });
            } else {
                return res
                .status(400)
                .json({ passwordincorrect: "Password Incorrect"})
            }
        });
    });
});

router.post("/contacts", (req, res) => {

    //Form vaildation
    const { errors, isValid } = validateContactInput(req.body)

    ///check vaildation

    if(!isValid) {
        return res.status(400).json(errors)
    }

   // saving user with request information to database
   const newContact = new Contact({
       name: req.body.name,
       email: req.body.email,
       message: req.body.message
   });
});

module.exports = router