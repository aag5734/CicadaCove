import React from "react"
import { useNavigate } from "react-router-dom"
// import banner from "./assets/banner.jpg"

const Nav = () => {
    const navigate = useNavigate()
    const signOut = () => {
        localStorage("_id")
        navigate("/")
    }
    return (
        <nav className='navBar'>
            <div classname='navBarCenter'>
                {/* <img src={banner} alt='Logo'></img> */}
                <h2>Cicada Cove</h2>
            </div>
            <div className='navBarRight'>
                {/* Change this to auto update later */}
                {/* <button onClick={SignIn}>Login</button> */}
                <button onClick={signOut}>Sign Out</button>
            </div>
        </nav>
    )
}
export default Nav