import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const signUp = () => {
		fetch("localhost:3000/register", {
			method: "POST",
            mode: "no-cors",
			body: JSON.stringify({
				email,
				password,
				username,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error_message) {
					alert(data.error_message);
				} else {
					alert("Account created successfully!");
					navigate("/");
				}
			})
			.catch((err) => console.error(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault()
        console.log({email, username, password})
		signUp()
		setEmail("")
		setUsername("")
		setPassword("")
	};

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
                    onChange={(e) => setUsername(e.target.value)}
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