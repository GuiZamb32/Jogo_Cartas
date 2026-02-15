import { useState } from "react";
import Carta from "./components/Carta";
import { BARALHO_BASE } from "./data/Cartas";
import Home from "./pages/homes/Home";
import "./App.css";

// Embaralhar sem repetir cartas (Fisher-Yates)
function embaralhar(baralho) {
  const copia = [...baralho];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

// Extrai o valor da carta a partir do nome
function obterValorCarta(nome) {
  if (nome.includes("Ás")) return "A";
  if (nome.includes("Rei")) return "K";
  if (nome.includes("Dama")) return "Q";
  if (nome.includes("Valete")) return "J";
  if (nome.includes("10")) return "10";
  if (nome.includes("9")) return "9";
  if (nome.includes("8")) return "8";
  if (nome.includes("7")) return "7";
  if (nome.includes("6")) return "6";
  if (nome.includes("5")) return "5";
  if (nome.includes("4")) return "4";
  if (nome.includes("3")) return "3";
  if (nome.includes("2")) return "2";
  return null;
}

// Baralho do TRUCO (SEM 8, 9 e 10)
function baralhoTruco(baralho) {
  const valoresPermitidos = ["4", "5", "6", "7", "Q", "J", "K", "A", "2", "3"];

  return baralho.filter((carta) => {
    const valor = obterValorCarta(carta.nome);
    return valoresPermitidos.includes(valor);
  });
}

// Baralho do POKER (COM 8, 9 e 10)
function baralhoPoker(baralho) {
  const valoresPermitidos = [
    "4", "5", "6", "7", "8", "9", "10",
    "Q", "J", "K", "A", "2", "3"
  ];

  return baralho.filter((carta) => {
    const valor = obterValorCarta(carta.nome);
    return valoresPermitidos.includes(valor);
  });
}

// 🔥 FUNÇÃO IMPORTANTE: cria cartas com chave única (reset do verso)
function criarMaoUnica(cartas) {
  return cartas.map((carta) => ({
    ...carta,
    uid: crypto.randomUUID(), // força recriar componente
  }));
}

function App() {
  const [tela, setTela] = useState("home");
  const [mao, setMao] = useState([]);
  const [modo, setModo] = useState(null); // truco ou poker

  function iniciarTruco() {
    const baralhoFiltrado = baralhoTruco(BARALHO_BASE);
    const baralhoEmbaralhado = embaralhar(baralhoFiltrado);

    const maoInicial = criarMaoUnica(
      baralhoEmbaralhado.slice(0, 3) // 3 cartas truco
    );

    setModo("truco");
    setMao(maoInicial);
    setTela("jogo");
  }

  function iniciarPoker() {
    const baralhoFiltrado = baralhoPoker(BARALHO_BASE);
    const baralhoEmbaralhado = embaralhar(baralhoFiltrado);

    const maoInicial = criarMaoUnica(
      baralhoEmbaralhado.slice(0, 2) // 2 cartas poker
    );

    setModo("poker");
    setMao(maoInicial);
    setTela("jogo");
  }

  function embaralharNovamente() {
    if (!modo) return;

    const base =
      modo === "truco"
        ? baralhoTruco(BARALHO_BASE)
        : baralhoPoker(BARALHO_BASE);

    const novoBaralho = embaralhar(base);
    const quantidade = modo === "truco" ? 3 : 2;

    // 🔥 Aqui garantimos:
    // - novas cartas
    // - verso para cima
    // - sem repetir
    const novaMao = criarMaoUnica(
      novoBaralho.slice(0, quantidade)
    );

    setMao(novaMao);
  }

  function voltarHome() {
    setTela("home");
    setModo(null);
    setMao([]);
  }

  function jogarCarta(cartaSelecionada) {
    alert(`Você jogou: ${cartaSelecionada.nome}`);
    setMao((prev) => prev.filter((c) => c.uid !== cartaSelecionada.uid));
  }

  if (tela === "home") {
    return (
      <Home 
        onPlayTruco={iniciarTruco}
        onPlayPoker={iniciarPoker}
      />
    );
  }

  return (
    <div className="app">
      <div className="app-header">
        <button className="btn-voltar" onClick={voltarHome}>
          ⬅ Voltar
        </button>

        <h1 className="titulo-jogo">
          {modo === "truco"
            ? "Modo Truco (3 cartas)"
            : "Modo Poker (2 cartas)"}
        </h1>

        <button className="btn-embaralhar" onClick={embaralharNovamente}>
          🔀 Embaralhar
        </button>
      </div>

      <div className="mesa">
        <h2 className="titulo-mao">Sua Mão</h2>

        <div className="mao">
          {mao.length === 0 ? (
            <p className="sem-cartas">Nenhuma carta na mão</p>
          ) : (
            mao.map((carta) => (
              <Carta
                key={carta.uid} // ⚠️ CORREÇÃO CRÍTICA (antes era carta.id)
                carta={carta}
                onClick={jogarCarta}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
