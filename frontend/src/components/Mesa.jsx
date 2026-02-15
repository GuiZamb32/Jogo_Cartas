import React from "react";
import Carta from "./Carta";
import { VERSO_CARTA } from "../data/Cartas";

function Mesa({ cartasJogador }) {
  return (
    <div className="mesa-cartas">
      {cartasJogador.map((carta, index) => (
        <Carta
          key={carta.id}
          carta={carta}
          verso={VERSO_CARTA}
          delay={index * 250} // 🔥 distribuição uma por uma
        />
      ))}
    </div>
  );
}

export default Mesa;
