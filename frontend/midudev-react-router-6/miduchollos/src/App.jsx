import { Link, Route, Routes, useParams } from "react-router-dom"
import "./App.css"

// Un componente devuelve elementos. El componente es la función sin ejecutar.
// Es lo que fabrica los elementos. Podemos tener un componente con 80 elementos.
const Home = () => <h1>Home</h1>

const SearchPage = () => {
  const tacos = [
    "Al Pastor",
    "Carnitas",
    "Pastor",
    "Suadero",
    "Lengua",
    "Tripa",
    "Cabeza",
    "Bistec",
    "Chorizo",
  ]

  return (
    <div>
      <h1>Search Page</h1>
      <ul>
        {tacos.map((taco) => (
          <li key={taco}>
            <Link to={`/tacos/${taco}`}>{taco}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Tacos = () => {
  // Obtenemos las keys del segmento dinámico del path. Depende de cómo hayamos
  // declarado nuestra ruta.
  const { taco } = useParams()

  return (
    <div>
      <h1>Tacos</h1>
      <h2>{taco}</h2>
    </div>
  )
}

function App () {
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
        <Route path="/tacos/:taco" element={<Tacos />} />
      </Routes>
    </div>
  )
}

export default App
