const express = require('express')
const config = require('config')
const connectDB = require('./config/db')
const app = express()
const todo = require('./routes/todo')
const user = require('./routes/user')
const auth = require('./routes/auth')

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not define')
    process.exit(1)
}

connectDB()
app.use(express.json())
app.use('/api/todo',todo)
app.use('/api/user',user)
app.use('/api/auth',auth)


const port = process.env.PORT || 3000
app.listen(port,() => console.log(`listening on port${port}`))
