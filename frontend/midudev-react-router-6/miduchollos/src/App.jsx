import {
  Link,
  Route,
  Routes,
  useParams,
  Outlet,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom"
import "./App.css"
import { useAuth } from "./context/useAuth"
import { NavLink } from "./NavLink"

// Un componente devuelve elementos. El componente es la función sin ejecutar.
// Es lo que fabrica los elementos. Podemos tener un componente con 80 elementos.
const Home = () => <h1>Home</h1>

const Login = () => {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { state } = useLocation()

  // Aquí obtenemos el estado que hayamos enviado en navigate. Así, después de
  // la redirección cuando el usuario inicie sesión, podemos ir a la ruta a la
  // que quería ir. Incluso podríamos enviar otra información como imágenes para
  // no ver un placeholder default, sino la imagen que hayamos enviado en el
  // state.
  /* location.state */

  const handleClick = () => {
    const nextPath = state?.location?.pathname ?? "/"
    login()
    navigate(nextPath)
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleClick}>Login</button>
    </div>
  )
}

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
      {/* Añadimos una ruta relativa a la actual. No le ponemos la diagonal
        al inicio por lo mismo. De esta manera, preservamos la ruta anterior.
       */}
      <Link to="details">Ir a detalles</Link>
      {/* Con Outlet indicamos en dónde se renderizarán las rutas anidadas. */}
      <Outlet />
    </div>
  )
}

const TacoIndex = () => {
  return <h1>Index Route de Tacos</h1>
}

const TacoDetails = () => {
  const { taco } = useParams()

  return <h1>Taco Details {taco}</h1>
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Antes Navigate era Redirect. Le podemos pasar la ruta en state, por
    // ejemplo. Así, una vez que inicie sesión, podría ir a la ruta correcta o
    // algo similar.
    return <Navigate to="/login" state={{ location }} />
  }

  return children
}

function App () {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="App">
      <header>
        <h1>miduchollo 💵</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/search-page">Search Page</NavLink>
            </li>
          </ul>
          {isAuthenticated && <button onClick={logout}>Logout</button>}
        </nav>
      </header>
      <Routes>
        {/* No hay que enviar el componente, sino el elemento. Si pasamos solo el componente como {Home}, no funcionará correctamente. */}
        <Route path="/" element={<Home />} />

        <Route
          path="/search-page"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />

        {/* Enviamos un segmento dinámico. */}
        <Route
          path="/tacos/:taco"
          element={
            <ProtectedRoute>
              <Tacos />
            </ProtectedRoute>
          }
        >
          <Route path="details" element={<TacoDetails />} />
        </Route>
        {/* <Route path="/tacos/:taco" element={<Tacos />}>
          <Route path="details" element={<TacoDetails />} />
        </Route> */}

        {/* Algo así sería si definieramos rutas anidadas y un index. Esto complicaría la estructura de las rutas. Habría que modificar detalles de implementación. */}
        {/* <Route path="/tacos/:taco" element={<Tacos />}>
          <Route index element={<TacoIndex />} />
          <Route path="details" element={<TacoDetails />} />
        </Route> */}

        <Route path="/login" element={<Login />} />

        {/* A pesar de que la ruta '/tacos/:taco' está definida antes, se sigue renderizando esta cuadno accedemos a la ruta. Antes no era así, sino que era por orden de definición. */}
        <Route
          path="/tacos/midutaco"
          element={<h1 style={{ color: "red" }}>Midutaco</h1>}
        />
        {/* Este es un 404 'soft', ya que está ocurriendo en el cliente. No
          e indicamos a Google Bot con un status code al navegador de que no
          existe la ruta. Esto lo haría el servidor. Es imposible que desde el cliente tengamos un status code 404.

          Lo que sí podríamos hacer es redireccionar a una ruta del servidor
          que realmente devuelva un código 404. En el cliente devuelve un
          código de error 200 siempre.
         */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
