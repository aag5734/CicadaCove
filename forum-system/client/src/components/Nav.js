import React from "react"
import banner from "./assets/banner.jpg"

const Nav = () => {
    const signOut = () => {
        localStorage("_id")
        navigate("/")
    }
    return (
        <nav className='navBar'>
            <div classname='navBarCenter'>
                <img src={banner} alt='Logo'></img>
                <h2>Cicada Cove</h2>
            </div>
            <div className='navBarRight'>
                {/* Change this to auto update later */}
                <button onClick={SignIn}>Login</button>
                <button onClick={SignOut}>Sign Out</button>
            </div>
        </nav>
    )
}