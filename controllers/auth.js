const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateContactInput = require('../validation/contact');

const Contact = require('../models/Contact');
const User = require('../models/User');
const Employees = require('../models/Employees');


/// Inserting SignUp 
exports.register =(req, res) => {

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

};


exports.login =(req, res) => {

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
            return res.status(404).json({message: "Email not found"});
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
                    {expiresIn: 3600},
                    (err, token) => {
                    res.json({ success: true, token: "Bearer" + token});
                });

                
            } else {
                return res
                .status(400)
                .json({ message: "Password Incorrect"})
            }
        });
    });
};

///Inserting Contacts
exports.contact=(req, res) => {

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
   });newContact.save().then(contact => res.json(contact)).catch(err => console.log(err));
};

exports.contactsplace=(req, res) => {
    Contact.find({}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
    });
}

//Contact Delete
exports.contactdelete=(req, res) => {
    const id = req.params.id;

    Contact.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: `Cannot Delete with id ${id}.Maybe id is wrong`});
            }else {
                res.send({
                    message:"User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
    
}

///Inserting Employees
exports.employees=(req, res) => {

   // saving user with request information to database
   const newEmployees = new Employees({
    Emp_Id: req.body.Emp_Id,
    Emp_Name: req.body.Emp_Name,
    Designation: req.body.Designation,
    Emp_Phone: req.body.Emp_Phone,
    Emp_Email: req.body.Emp_Email,
    Emp_Address: req.body.Emp_Address
   });newEmployees.save().then(employees => res.json(employees)).catch(err => console.log(err));
};


exports.employeeslist=(req, res) => {
    Employees.find({}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
    });
}

