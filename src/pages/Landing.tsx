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
    <main className="landing-page">
      <section className="landing-container">
        <HeyMessage />
        <h1 className='Landing-Logo'>MAN*LY</h1>
        <button className='Api-Message'>
          {apiMessage}
        </button>
      </section>

      <section className="about-section">
        {/* <h2>What is Manly?</h2> */}
        <About />
      </section>

      <section className="provider-interest-section">
        <ProviderInterest />
      </section>
    </main>
  )
}

export default Landing
