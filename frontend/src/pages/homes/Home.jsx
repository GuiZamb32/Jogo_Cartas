import React from "react";
import "./Home.css";

function Home({ onPlay, onRules, onSettings }) {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Jogo de Cartas</h1>
        <p className="home-subtitle">
          Bem-vindo! Escolha uma opção para começar.
        </p>

        <div className="home-buttons">
          <button className="btn-primary" onClick={onPlay}>
            Jogar
          </button>

          <button className="btn-secondary" onClick={onRules}>
            Regras
          </button>

          <button className="btn-secondary" onClick={onSettings}>
            Configurações
          </button>
        </div>

        <div className="home-footer">
          <span>Versão 1.0</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
