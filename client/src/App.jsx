import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import './App.css'
import MainPage from './pages/mainpage/MainPage'
import Navbar from './components/navbar/Navbar'
import Carousel from './components/carousel/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
    
      <MainPage/>

      


    </>
  )
}

export default App
