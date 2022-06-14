const mongoose = require('mongoose')
const Joi = require('joi')


const Todo = mongoose.model('todo',new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date
    }
}))

function validateTode(todo){
    const schema = Joi.object({
        task:Joi.string().required(),
        dueDate:Joi.date()
    })
    return schema.validate(todo)
}

module.exports.Todo = Todo
module.exports.validate = validateTode

