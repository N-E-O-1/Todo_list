const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        email:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},config.get('jwtPrivateKey'))
    return token
}
const User = mongoose.model('user',userSchema)

function validateUser(user){
    const schema = Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().required()
    })
    return schema.validate(user)
}

module.exports.User = User
module.exports.validate = validateUser
