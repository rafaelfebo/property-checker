import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Content from './components/Content'
import Footer from './components/Footer'
import SearchBox from './components/SearchBox'

function App() {
  return (
    <>
      <Nav/>
      <SearchBox/>
      <Content/>
      <Footer/>
    </>
  )
}

export default App
