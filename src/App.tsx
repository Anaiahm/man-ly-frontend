// import { useState } from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import HeyMessage from './components/HeyMessage'
import NavBar from './components/NavBar'

function App() {
  // const [count, setCount] = useState(0)
    const [apiMessage, setApiMessage] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/`)
      .then(res => res.text())
      .then(data => setApiMessage(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="app">
      <NavBar />
      <section className='Hey-Message'>
        <HeyMessage />
      </section>
      <section className='Landing-Section'>
        <h1 className='Landing-Logo'>MAN*LY</h1>
        <button className='Api-Message'>
          {apiMessage}
        </button>
      </section>
      <footer className='App-Footer'>
        <p>Dear Men, We love you. -Love, Women</p>
      </footer>
    </div>
  )
}

export default App
