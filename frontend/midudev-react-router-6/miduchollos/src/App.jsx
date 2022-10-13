import { Link, Route, Routes } from "react-router-dom"
import "./App.css"

// Un componente devuelve elementos. El componente es la función sin ejecutar.
// Es lo que fabrica los elementos. Podemos tener un componente con 80 elementos.
const Home = () => <h1>Home</h1>

const SearchPage = () => <h1>Search Page</h1>

function App() {
  return (
    <div className="App">
      <header>
        <h1>miduchollo 💵</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search-page">Search Page</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        {/* No hay que enviar el componente, sino el elemento. Si pasamos solo el componente como {Home}, no funcionará correctamente. */}
        <Route path="/" element={<Home />} />
        <Route path="/search-page" element={<SearchPage />} />
      </Routes>
    </div>
  )
}

export default App
