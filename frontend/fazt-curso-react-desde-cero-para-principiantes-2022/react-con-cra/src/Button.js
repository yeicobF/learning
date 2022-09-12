import PropTypes from "prop-types";

export function Button({ text, name = "" }) {
  if (!text) {
    console.error("El textp es requerido");
  }

  return (
    <button>
      {text} - {name}
    </button>
  );
}

// Con PropTypes determinamos los tipos de datos aceptados y condiciones de los
// props.
Button.propTypes = {
  text: PropTypes.string.isRequired,
};

// Una forma para establecer props por default.
Button.defaultProps = {
  name: "Some User",
};
