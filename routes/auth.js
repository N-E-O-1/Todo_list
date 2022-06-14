const express = require('express')
const {User} = require('../model/user')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const Joi = require('joi')
const router = express.Router()

router.post('/',async(req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('invalid user or password')

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send('invalid email or password')

    const token = user.generateAuthToken()
    res.send(token)
})

function validate(req){
    const schema = Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().required()
    })
    return schema.validate(req)
}

module.exports = router