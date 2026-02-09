import { useEffect, useState } from 'react'
import './Landing.css'
import HeyMessage from '../components/HeyMessage'
import About from './About'
import ProviderInterest from './ProviderInterest'

function Landing() {
    const [apiMessage, setApiMessage] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/`)
      .then(res => res.text())
      .then(data => setApiMessage(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
    <div className="Landing-Container">
        <HeyMessage />
        <h1 className='Landing-Logo'>MAN*LY</h1>
        <button className='Api-Message'>
          {apiMessage}
        </button>
    </div>
    <div className="About-Section">
        <h2>What is Manly?</h2>
        <About />
    </div>
    <div className="Provider-Interest-Section">
        <ProviderInterest />
    </div>
    </>
  )
}

export default Landing
