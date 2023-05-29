import React, {useState} from "react"
import Nav from "./Nav"

const Home = () => {
    const [thread, setThread] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({thread})
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
            </main>
        </>
    )
}
export default Home