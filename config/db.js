require('dotenv').config()
const mongoose = require('mongoose')

CONNECTION_URL = "mongodb+srv://admin:admin@vidly1.smvy1.mongodb.net/Todo?retryWrites=true&w=majority"

const connectionParams = {
    useUnifiedTopology:true,
}
function connectDB(){
    mongoose.connect(CONNECTION_URL,connectionParams)
    .then(() => console.log('connected to mongodb....'))
}

module.exports = connectDB