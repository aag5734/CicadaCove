import React, {useState} from "react"

const Replies = () => {
    const {reply, setReply} = useState("")

    const handleReply = (e) => {
        e.preventDefault()
        console.log({reply})
        setReply("")
    }

    return (
        <main className='replies'>
            <form className='content' on onSubmit={handleReply}>
                <label htmlFor='reply'>Reply</label>
                <textarea
                    type="text"
                    name="reply"
                    className="modelInput"
                    rows={5}
                    value={reply}
                />
            </form>
            <button className="replyButton">Send</button>
        </main>
    )
}
export default Replies