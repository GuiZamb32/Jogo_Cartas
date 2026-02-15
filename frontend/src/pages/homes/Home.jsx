import "./Home.css";

function Home({ onPlayTruco, onPlayPoker }) {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Jogo de Cartas</h1>
        <p className="home-subtitle">
          Escolha o modo de jogo
        </p>

        <div className="home-buttons">
          <button className="btn-jogar-truco" onClick={onPlayTruco}>
            🃏 Jogar Truco
          </button>

          <button className="btn-jogar-poker" onClick={onPlayPoker}>
            ♠️ Jogar Poker
          </button>
        </div>

        <div className="home-footer">
          Desenvolvido em React • Cartas feitas no Figma
        </div>
      </div>
    </div>
  );
}

export default Home;
