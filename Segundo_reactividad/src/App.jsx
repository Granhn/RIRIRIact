import './App.css'
import { useState } from 'react';
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true)
  const handlePrevious = () =>{
    if(step === 1) return
    setStep((s) => s - 1)
  }
  const handleNext = () =>{
    if(step === 3) return
    setStep(s => s + 1)
  }
  const handleCard = () => setIsOpen((isO) => !isO)
  return (
    <>
      <button className='close' onClick={handleCard}>&times;</button>
      {isOpen && 
      <div className='steps'>
        <div className="numbers">
          <div className={`${step === (1) ? "active" : ""}`}>1</div>
          <div className={ `${step === 2 ? "active" : ""}` }>2</div>
          <div className={`${step === 3 ? "active" : ""}`}>3</div>
        </div>
        <p className='message'>Step {step}: { messages[step - 1] }  </p>
        <div className="buttons">
          <Button  textColor="#fff"bgColor="#7950f2" onClickButton={handlePrevious}text="Previous" />
          <Button  textColor="#fff"bgColor="#7950f2" onClickButton={handleNext} text="Next"/>
        </div>
      </div>}
    </>
  )
}
const Button = ({text, textColor , bgColor, onClickButton}) => {
  return(
    <button style={{backgroundColor:{bgColor}, color:{textColor}}} onClick={onClickButton}>{text}</button>
  )
}

export default App

