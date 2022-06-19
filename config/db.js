require('dotenv').config()
const mongoose = require('mongoose')

const connectionParams = {
    useUnifiedTopology:true,
}
function connectDB(){
    mongoose.connect(process.env.CONNECTION_URL,connectionParams)
    .then(() => console.log('connected to mongodb....'))
}

module.exports = connectDB