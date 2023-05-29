import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
    const [username, setUser] = useState("")
    const [password, setPassword] = useState("")

    /*
    Handles form submissions
    */
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({username, password})
        setUser("")
        setPassword("")
    }

    return (
        <main className='login'>
            <h1 className='loginTitle'>Login</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
                <label htmlFor='Username'>Username</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    required
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
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
                <button className='LoginButton'>SIGN IN</button>
                <Link to='/register'>Click here to create an account</Link>
            </form>
        </main>
    )
}
export default Login