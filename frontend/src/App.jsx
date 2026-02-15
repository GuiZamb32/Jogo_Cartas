import { useState } from "react";
import Home from "./pages/homes/Home";
import Mesa from "./components/Mesa";
import { BARALHO_BASE, VERSO_CARTA } from "./data/Cartas";
import "./App.css";

function App() {
  const [tela, setTela] = useState("home");
  const [modo, setModo] = useState(null); // "truco" ou "poker"

  function iniciarTruco() {
    setModo("truco");
    setTela("jogo");
  }

  function iniciarPoker() {
    setModo("poker");
    setTela("jogo");
  }

  function voltarHome() {
    setTela("home");
    setModo(null);
  }

  // TELA HOME
  if (tela === "home") {
    return (
      <Home
        onPlayTruco={iniciarTruco}
        onPlayPoker={iniciarPoker}
      />
    );
  }

  // TELA JOGO (agora controlada pela Mesa + BOT)
  return (
    <Mesa
      modo={modo}
      onVoltar={voltarHome}
      baralhoBase={BARALHO_BASE}
      verso={VERSO_CARTA}
    />
  );
}

export default App;
