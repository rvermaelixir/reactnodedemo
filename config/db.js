const config = require('config')
const mongo = require('mongoose')

const mongoUri = config.get('mongoURI')

const connectDB = async () => {
   try{
    await mongo.connect(mongoUri)
    console.log("Database connected")
   } catch(err){
    console.log(err.message)
    // exits process on failure of db connection
    process.exit(1)
   }
}
module.exports = connectDB