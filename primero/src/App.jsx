import "./index.css"
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "../public/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "../public/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "../public/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "../public/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "../public/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "../public/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return(
    <div className="container">
      <Header/>
      <Menu/>
      <Footer/>
    </div>
  )
}

const Pizza = ({pizzaObj}) => {
  return(
    <li className={`pizza ${ pizzaObj.soldOut? "sold-out": "" }`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h2>{pizzaObj.name}</h2>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.price}</span>
      </div>
    </li>
  )
}
const Header = () =>{
  return(
    <header className="header">
      <h1>Fast React pizza company</h1>
    </header>
  )
}
const Menu = () =>{
  const pizzas = pizzaData;
  const pizzasExists = pizzas.length > 0
  return(
    <section className="menu">
      <h2>Our pizza menu</h2>
      { pizzasExists && 
        <ul className="pizzas">
          {pizzaData.map(pizzaData => <Pizza pizzaObj={ pizzaData } key={pizzaData.name}/>)}
        </ul>
       }
      
    </section>
  )
}
const Order  =() => {
  return (
    <div className="order">
      <p>We're open!</p>
      <button className="btn">Order</button>
    </div>
  )
}
const Footer = () =>{
  const hour = new Date().getHours()
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour
  return(
    <footer className="footer">
      { isOpen && <Order /> }

        
    </footer>
  )
}
export default App
