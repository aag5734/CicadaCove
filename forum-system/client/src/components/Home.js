import React, {useEffect, useState} from "react"
import Nav from "./Nav"
import Likes from "../utils/Likes"
import Comments from "../utils/Comments"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    const [thread, setThread] = useState("")
    const [threads, setThreads] = useState([])

    useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem("_id")) {
                navigate("/")
            } else {
                fetch("http://localhost:3000/api/all/threads")
                    .then((res) => res.json())
                    .then((data) => setThreads(data.threads))
                    .catch((err) => console.error(err));
            }
        }
        checkUser()
    }, [navigate])

    const createThread = () => {
        fetch("http://localhost:3000/api/create/thread", {
            method: "POST",
            body: JSON.stringify({
                thread,
                userID: localStorage.getItem("_id")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.error(err));
    }

    const createThreads = () => {
        fetch("http://localhost:3000/api/create/thread", {
            method:"POST",
            body: JSON.stringify({
                thread,
                userID: localStorage.getItem("_id")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                setThreads(data.threads);
            })
            .catch((err) => console.error(err));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createThread()
        setThread("")
    }
    
    return (
        <>
            <Nav/>
            <main className='home'>
                <h2>Start a thread</h2>
                <form className='threadCreate' onSubmit={handleSubmit}>
                    <div className="homeThreads">
                        <label htmlFor='thread'> Title | Description </label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={thread}
                            onChange={(e) => setThread(e.target.value)}
                        />
                    </div>
                    <button className='threadButton'>Submit</button>
                </form>

                <div className='threadList'>
                    {threads.map((thread) => (
                        <div className="threadItem" key={thread.id}>
                            <p>{thread.title}</p>
                            <div className="reactions">
                                <Likes numOfLikes={thread.likes.length} threadId={thread.id}/>
                                <Comments
                                    numOfComments ={ thread.replies.length}
                                    threadId = {thread.id}
                                    title = {thread.title}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}
export default Home