const db = require('../models')
const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

const test = (req, res) => {
    res.json({ message: 'User endpoint OK' })
}

const register = (req, res) => {
    console.log('Inside of register')
    console.log(req.body)

    const { email, name, password } = req.body

    db.user.findOne({
        email
    }).then(user => {
        // if email exists user returns send 400 res
        if(user) {
            return res.status(400).json({
                message: 'Email already exists'
            })
        } else {
            const newUser = new User({
                email, 
                name, 
                password
            })

            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw Error

                bcrypt.hash(newUser.password, sale, (err, hash) => {
                    if (err) throw Error

                    // has the password
                    newUser.password = hash
                })
            })
            newUser.save()
            .then(createdUser => res.json(createdUser))
            .catch(err => console.log(err))
        }
    }).catch(err => console.log(err))
}

module.exports = {
    test,
    register
}