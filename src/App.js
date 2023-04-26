import React from 'react'
import { Routes, Route } from "react-router-dom"
import "./App.css"
import Home from "./component/Home.jsx"
import Create from './component/Create'
import Update from './component/Update'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Create" element={<Create/>}></Route>
        <Route path="/Update/:id" element={<Update/>}></Route>
      </Routes>
    </div>
  )
}

export default App