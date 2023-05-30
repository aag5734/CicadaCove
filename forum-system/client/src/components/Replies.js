import React, {useEffect, useState} from "react"
import { useNavigate, useParams } from "react-router-dom"

const Replies = () => {
    const {reply, setReply} = useState("")
    const {replies, setReplies} = useState("")
    const {title, setTitle} = useState("")
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchReplies = () => {
            fetch("http://localhost:3000/api/thread/replies", {
                method: "POST",
                body: JSON.stringify({
                    id
                }),
                headers: {

                    "Content-Type": "application/json",

                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setReplies(data.replies);
                    setTitle(data.title);
                })
                .catch((err) => console.error(err));
        }
        fetchReplies()
    }, [id])

    const addReply = () => {
        fetch("http://localhost:3000/api/create/reply", {
            method: "POST",
            body: JSON.stringify({
                id,
                userId: localStorage.getItem("_id"),
                reply
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                navigate("/dashboard");
            })
            .catch((err) => console.error(err));
    }

    const handleReply = (e) => {
        e.preventDefault()
        addReply()
        setReply("")
    }

    return (
        <main className='replies'>
            <h1 className="repliesTitle">{title}</h1>
            <form className='content' on onSubmit={handleReply}>
                <label htmlFor='reply'>Reply</label>
                <textarea
                    type="text"
                    name="reply"
                    className="modelInput"
                    rows={5}
                    value={reply}
                />
                <button className="replyButton">Send</button>
            </form>

            <div className="threads">
                {replies.map((reply) => (
                    <div className='thread__item'>
                        <p>{reply.text}</p>
                        <div className='react__container'>
                            <p style={{ opacity: "0.5" }}>by {reply.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
export default Replies