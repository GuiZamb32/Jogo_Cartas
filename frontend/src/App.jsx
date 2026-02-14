import { useState } from "react";
import Carta from "./components/Carta";
import { BARALHO_BASE } from "./data/Cartas";
import Home from "./pages/homes/Home";
import "./App.css";

// Função para embaralhar o baralho (sem repetir cartas)
function embaralhar(baralho) {
  const copia = [...baralho];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

function App() {
  const [tela, setTela] = useState("home");
  const [mao, setMao] = useState([]);

  // Puxa 3 cartas aleatórias
  function distribuirCartas() {
    const baralhoEmbaralhado = embaralhar(BARALHO_BASE);
    const maoNova = baralhoEmbaralhado.slice(0, 3);
    setMao(maoNova);
  }

  function iniciarJogo() {
    distribuirCartas();
    setTela("jogo");
  }

  function embaralharNovamente() {
    distribuirCartas();
  }

  function voltarHome() {
    setTela("home");
  }

  function jogarCarta(cartaSelecionada) {
    alert(`Você jogou: ${cartaSelecionada.nome}`);
    
    // Remove só a carta jogada
    setMao((prev) => prev.filter(c => c.id !== cartaSelecionada.id));
  }

  if (tela === "home") {
    return (
      <Home 
        onPlay={iniciarJogo}
        onRules={() => alert("Regras em breve")}
        onSettings={() => alert("Configurações em breve")}
      />
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <button className="btn-voltar" onClick={voltarHome}>
          ⬅ Voltar
        </button>

        <h1 className="titulo-jogo">Jogo de Cartas</h1>

        {/* NOVO BOTÃO EMBARALHAR */}
        <button className="btn-embaralhar" onClick={embaralharNovamente}>
          🔀 Embaralhar Cartas
        </button>
      </header>

      <main className="mesa">
        <h2 className="titulo-mao">Sua Mão (3 cartas)</h2>

        <div className="mao">
          {mao.length === 0 ? (
            <p className="sem-cartas">Clique em embaralhar para receber cartas</p>
          ) : (
            mao.map((carta) => (
              <Carta 
                key={carta.id} 
                carta={carta} 
                onClick={jogarCarta}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
