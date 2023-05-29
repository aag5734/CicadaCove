import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
    const [username, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    /*
    Handles form submissions
    */
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({username, email, password})
        setUser("")
        setEmail("")
        setPassword("")
    }

    return (
        <main className='singup'>
            <h1 className='signupTitle'>Join the Cicada army</h1>
            <form className='signupTitle' onSubmit={handleSubmit}>
                <label htmlFor='Username'>Username</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    required
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
                />
                <label htmlFor='Email'>Email</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='Password'>Password</label>
                <input
                    type='text'
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='signupButton'>SIGN UP</button>
                <Link to='/'>Click here to sign in to an exisiting account</Link>
            </form>
        </main>
    )
}
export default Register