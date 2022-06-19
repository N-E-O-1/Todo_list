const express = require('express')
const config = require('config')
const connectDB = require('./config/db')
const user = require('./routes/user')
const auth = require('./routes/auth')
const todo = require('./routes/todo')
const app = express()

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not define')
    process.exit(1)
}

connectDB()
app.use(express.json())
app.use('/api/user',user)
app.use('/api/auth',auth)
app.use('/api/todo',todo)


const port = process.env.PORT || 3000
app.listen(port,() => console.log(`listening on port${port}`))
