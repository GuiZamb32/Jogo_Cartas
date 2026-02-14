import React from "react";

function Carta({ carta, onClick }) {
  return (
    <img
      src={carta.img} // <- AQUI estava o erro antes
      alt={carta.nome}
      onClick={() => onClick && onClick(carta)}
      style={{
        width: "120px",
        height: "auto",
        cursor: onClick ? "pointer" : "default",
      }}
    />
  );
}

export default Carta;
