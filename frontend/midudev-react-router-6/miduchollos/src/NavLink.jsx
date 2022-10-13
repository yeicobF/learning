import { NavLink as NavLinkReactRouter } from "react-router-dom"

// Composición.
export const NavLink = ({ to, children, ...props }) => {
  const activeClassName = "is-active"

  /* De esta manera podemos determinar si el link está activo o no. */

  return (
    <NavLinkReactRouter
      {...props}
      className={({ isActive }) => (isActive ? activeClassName : undefined)}
      to={to}
    >
      {children}
    </NavLinkReactRouter>
  )
}
