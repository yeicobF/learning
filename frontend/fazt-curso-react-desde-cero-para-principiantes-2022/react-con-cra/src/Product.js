function Product() {
  return (
    <>
      <h1>Producto</h1>
    </>
  );
}

// También puedo exportar algo individualmente.
export function Navbar() {
  return <nav>Navigation</nav>;
}

// Exportar un elemento por defecto.
export default Product;
