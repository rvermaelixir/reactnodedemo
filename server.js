const express = require('express')
const connectDB = require('./config/db')
const app = express()
const PORT = process.env.port || 8001
connectDB()

// init middlewares
app.use(express.json({extended: false}))

app.get("/", (req, res) => {
    res.send("Welcome to home page")
})

// define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/comments', require('./routes/api/comments'))
app.use('/api/auth', require('./routes/api/auth'))


app.listen(PORT, () => {
    console.log(`Server Started On Port ${PORT}`)
})