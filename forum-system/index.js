const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 4000
const users = []
const randomID = () => Math.random().toString(36).substring(2,10)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get("/api", (req, res) => {
    res.json({
        message: "testing 123"
    })
})

/*
Checks to see if a user already exists given credentials. Otherwise pushes onto the array
of exisiting users.
*/
app.post("/api/register", async(req, res) => {
    const {username, email, password} = req.body
    const id = randomID()
    const result = users.filter(
        (user) => user.email == email && user.username == username && user.password == password
    )
    if (result.length == 0) {
        const newUser = {id, username, email, password}
        users.push(newUser)
    } else {
        return res.join({
            error_message: "User already exists"
        })
    }
})

/*
Checks to see if a user's credentials already exists, then logs that user into the site
*/
app.post("/api/login", async(req, res) => {
    const {username, password} = req.body
    const result = users.filter(
        (user) => user.username == username && user.password == password
    )
    if (result.length != 1) {
        return res.join({
            error_message: "That user doesn't exist"
        })
    } else {
        return res.join({
            message: "Login successful",
            id: result[0].id
        })
    }
})



app.listen(PORT, () => {
    console.log('Server listening on ${PORT}')
})