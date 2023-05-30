const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3000
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
app.post("/register", async (req, res) => {
	const { email, password, username } = req.body
	const id = randomID()
	const result = users.filter(
		(user) => user.email === email && user.password === password
	)

	if (result.length === 0) {
		const newUser = { id, email, password, username }

		users.push(newUser)
		return res.json({
			message: "Account created successfully!",
		})
	}
	res.json({
		error_message: "User already exists",
	})
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
        return res.json({
            error_message: "That user doesn't exist"
        })
    } else {
        return res.json({
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

/*
Gets all likes
*/
app.post("/api/thread/like", (req, res) => {
    const {threadId, userId} = req.body
    const result = threads.filter((thread) => thread.id === threadId)
    const threadLikes = result[0].likes
    const authenticate = threadLikes.filter((user) => user === userId)

    if (authenticate.length === 0) {
        threadsLikes.push(userId)
        return res.json({
            message: "You liked the post"
        })
    }

    return res.json({
        error_message: "You can only react once"
    })
})

/*
Displays all replies to a given thread
*/
app.post("/api/thread/replies", (req, res) => {
    const {id} = req.body
    const result = threads.filter((thread) => threadId === id)

    return res.json({
        replies: result[0].replies,
        title: result[0].title
    })
})

/*
Creates a reply to a post
*/
app.post("/api/create/reply", async(req, res) => {
    const {id, userId, reply} = req.body
    const result = threads.filter((thread) => threadId === id)
    const user = users.filter((user) => user.id === userId)

    result[0].replies.unshift({
        userId: user[0].id,
        name: user[0].username,
        text: reply
    })

    return res.json({
        message: "Response added successfully"
    })
})

/*
Gets all exisiting threads
*/
app.get("/api/all/threads", (req, res) => {
    res.json({
        threads: threads
    })
})

app.listen(PORT, () => {
    console.log('Server listening on ${PORT}')
})