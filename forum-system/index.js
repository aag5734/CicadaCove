const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 4000
const users = []
const threads = []
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

/*
Handles thread creation
*/
app.post("/api/create/thread", async(req, res) =>{
    const {thread, userId} = req.body
    const threadID = randomID()
    threads.unshift({
        id: threadID,
        title: thread,
        userId,
        replies: [],
        likes: []
    })
    res.json({
        message: "Thread made successfully",
        threads: threads
    })
})

app.get("/api/all/threads", (req, res) => {
    res.json({
        threads: threads
    })
})



app.listen(PORT, () => {
    console.log('Server listening on ${PORT}')
})