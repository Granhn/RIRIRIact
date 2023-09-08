import './App.css'
import { useState, useEffect } from 'react';
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("EUR")
  const [result, setResult] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchInfo = async () => {
      try {
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`, { signal })
        const data = await res.json()
        setResult(data.rates[`${to}`])
      } catch (error) {
        console.log(error);
      }
    }
    
    if(from !== to) fetchInfo()
    else setResult(amount)
    return () => controller.abort()
  },[amount, from, to])


  return (
    <div>
      <input type="number"  value={amount} onChange={(e) => setAmount(e.target.value)}/>
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{result}</p>
    </div>
  );
}