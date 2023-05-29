import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import Replies from "./components/Replies"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/dashboard' element={<Home/>}></Route>
            <Route path='/:id/replies' element={<Replies/>}></Route>
          </Routes>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;