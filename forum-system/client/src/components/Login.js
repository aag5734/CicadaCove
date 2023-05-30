import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const signIn = () => {
        fetch("http://localhost:3000/api/login", {
            method:"POST",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error_message) {
                    alert(data.error_message)
                } else {
                    alert(data.message)
                    navigate("/dashboard")
                    localStorage.setItem("_id", data.id)
                }
            })
            .catch((err) => console.error(err))
    }

    /*
    Handles form submissions
    */
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({username, password})
        signIn()
        setUsername("")
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
                    onChange={(e) => setUsername(e.target.value)}
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