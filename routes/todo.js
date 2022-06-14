const express = require('express')
const {Todo,validate} = require('../model/todo')
const auth = require('../middleware/auth')
const route = express.Router()
const _ = require('lodash')

route.get('/homepage',async(req,res) => {
    res.send('this is homepage')
})

route.get('/',async(req,res) => {
    const todo = await Todo.find().sort('task')
    res.send(todo)
})

route.post('/',auth,async(req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const todo = new Todo(_.pick(req.body,['task','dueDate']))
    await todo.save()
    res.send(todo)
})

route.put('/:id',async(req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const todo = await Todo.findByIdAndUpdate(req.params.id,{
        task:req.body.task,
        dueDate:req.body.dueDate
    },{new:true})
    if(!todo) return res.status(404).send('no task found')
    res.send(todo)
})

route.delete('/:id',auth,async(req,res) => {
    const todo = await Todo.findByIdAndRemove(req.params.id)
    if(!todo) return res.status(404).send('please select task to delete')
    res.send(todo)
})

route.get('/:id',async(req,res) => {
    const todo = await Todo.findById(req.params.id)
    if(!todo) return res.status(404).send('no task found ')
    res.send(todo)
})


module.exports = route
