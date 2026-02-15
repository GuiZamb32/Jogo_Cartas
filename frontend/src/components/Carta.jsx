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

function Carta({ carta, verso, delay = 0, onClick, forcedOpen = false }) {
  // Se forcedOpen for true, ela já começa revelada
  const [isRevelada, setIsRevelada] = useState(forcedOpen); 
  const [visivel, setVisivel] = useState(false);

  // Sincroniza o estado caso a prop forcedOpen mude ou a carta mude
  useEffect(() => {
    setIsRevelada(forcedOpen);
  }, [carta.uid, forcedOpen]);

  // ... resto do seu código (useEffect de visivel, handlers, etc)

  // Animação de entrada (distribuição na mesa)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisivel(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClique = (e) => {
    // Se a carta estiver de verso, apenas vira ela
    if (!isRevelada) {
      setIsRevelada(true);
    } else {
      // Se já estiver aberta, executa a ação de jogar a carta (passada pelo App.js)
      if (onClick) onClick(carta);
    }
  };

  const simbolo = getSimboloNaipe(carta.nome);
  const valor = getValor(carta.nome);
  const corClasse = getCor(carta.nome);

  return (
    <div
      className={`carta-container ${visivel ? "entrando" : ""}`}
      onClick={handleClique}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* A classe CSS "virada" aplica o rotateY(180deg).
          Se isRevelada for true, aplicamos a classe para mostrar a FRENTE.
      */}
      <div className={`carta ${isRevelada ? "virada" : ""}`}>
        
        {/* FRENTE: Fica escondida atrás (180deg) por padrão no CSS */}
        <div className="face frente">
          <img src={carta.img} alt={carta.nome} />
        </div>

        {/* VERSO: Fica visível (0deg) por padrão */}
        <div className="face verso">
          <img src={verso} alt="Verso da carta" />
        </div>
      </div>

      {/* Hover info: Só aparece quando a carta está revelada */}
      {isRevelada && (
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