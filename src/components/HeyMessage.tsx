import { useState, useEffect } from 'react';
import './HeyMessage.css';

function HeyMessage() {
  const messages = [
    "Hey Handsome,",
    "You're so kind",
    "You're a great problem solver",
    "You are so loved",
    "You are enough",
    "You are strong",
    "You are capable of amazing things",
    "You make a difference in the world",
    "You are appreciated",
    "You are worthy of all good things",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <section className='Hey-Message'>
      <p>{messages[currentIndex]}</p>
    </section>
  );
}

export default HeyMessage;