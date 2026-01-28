// import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <body className="app">
      <NavBar />
      <div>
        <p>Hey, Handsome</p>
      </div>
      <h1>MAN*LY</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}> */}
        <button>
          Redefining Masculinity through Mental Health, Mentorship, and More
        </button>
      </div>
    </body>
  )
}

export default App
