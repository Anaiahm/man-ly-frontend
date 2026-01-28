// import { useState } from 'react'
import './App.css'
import HeyMessage from './components/HeyMessage'
import NavBar from './components/NavBar'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <body className="app">
      <NavBar />
      <section className='Hey-Message'>
        <HeyMessage />
      </section>
      <section className='Landing-Section'>
        <h1 className='Landing-Logo'>MAN*LY</h1>
        <button>
          Redefining Masculinity through Mental Health, Mentorship, and More
        </button>
      </section>
      <footer className='App-Footer'>
        <p>Dear Men, We love you. -Love, Women</p>
      </footer>
    </body>
  )
}

export default App
