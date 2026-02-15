import React, { useState, useEffect } from "react";
import "./Carta.css";

const getSimboloNaipe = (nome) => {
  if (nome.includes("Copas")) return "♥";
  if (nome.includes("Ouros")) return "♦";
  if (nome.includes("Paus")) return "♣";
  if (nome.includes("Espadas")) return "♠";
  return "";
};

const getValor = (nome) => {
  if (nome.includes("Valete")) return "J";
  if (nome.includes("Dama")) return "Q";
  if (nome.includes("Rei")) return "K";
  if (nome.includes("Ás")) return "A";
  return nome.split(" ")[0];
};

const getCor = (nome) => {
  if (nome.includes("Copas") || nome.includes("Ouros")) {
    return "naipe-vermelho";
  }
  return "naipe-preto";
};

function Carta({ carta, verso, delay = 0 }) {
  const [virada, setVirada] = useState(true); // começa com verso
  const [visivel, setVisivel] = useState(false); // animação de entrada

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisivel(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const simbolo = getSimboloNaipe(carta.nome);
  const valor = getValor(carta.nome);
  const corClasse = getCor(carta.nome);

  return (
    <div
      className={`carta-container ${visivel ? "entrando" : ""}`}
      onClick={() => setVirada(!virada)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`carta ${!virada ? "virada" : ""}`}>
        
        {/* FRENTE */}
        <div className="face frente">
          <img src={carta.img} alt={carta.nome} />
        </div>

        {/* VERSO */}
        <div className="face verso">
          <img src={verso} alt="Verso da carta" />
        </div>
      </div>

      {/* Tooltip profissional */}
      {!virada && (
        <div className={`hover-info ${corClasse}`}>
          <div className="hover-simbolo">
            {valor} {simbolo}
          </div>
          <div className="hover-nome">
            {carta.nome}
          </div>
        </div>
      )}
    </div>
  );
}

export default Carta;
