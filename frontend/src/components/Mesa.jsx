import React, { useEffect, useState, useCallback, useRef } from "react";
import Carta from "./Carta";
import "./Mesa.css";

const FORCA_TRUCO = {
  "4": 1,
  "5": 2,
  "6": 3,
  "7": 4,
  "Q": 5,
  "J": 6,
  "K": 7,
  "A": 8,
  "2": 9,
  "3": 10,
};

const ORDEM_TRUCO = ["4", "5", "6", "7", "Q", "J", "K", "A", "2", "3"];

// Hierarquia do Truco Paulista (manilhas)
const FORCA_NAIPE = {
  Paus: 4,
  Copas: 3,
  Espadas: 2,
  Ouros: 1,
};

const obterValorCarta = (nome) => {
  if (nome.includes("Ás")) return "A";
  if (nome.includes("Rei")) return "K";
  if (nome.includes("Dama")) return "Q";
  if (nome.includes("Valete")) return "J";
  return nome.split(" ")[0];
};

const obterNaipe = (nome) => {
  if (nome.includes("Paus")) return "Paus";
  if (nome.includes("Copas")) return "Copas";
  if (nome.includes("Espadas")) return "Espadas";
  if (nome.includes("Ouros")) return "Ouros";
  return null;
};

const obterProximaCarta = (valor) => {
  const index = ORDEM_TRUCO.indexOf(valor);
  return ORDEM_TRUCO[(index + 1) % ORDEM_TRUCO.length];
};

function Mesa({ modo, onVoltar, baralhoBase, verso }) {
  const [maoJogador, setMaoJogador] = useState([]);
  const [maoBot, setMaoBot] = useState([]);
  const [mesaCartas, setMesaCartas] = useState({ voce: null, bot: null });
  const [historico, setHistorico] = useState([null, null, null]);
  const [rodadaAtual, setRodadaAtual] = useState(0);
  const [resultadoFinal, setResultadoFinal] = useState(null);
  const [turno, setTurno] = useState("jogador");

  // Sistema de manilha
  const [vira, setVira] = useState(null);
  const [manilha, setManilha] = useState(null);
  const [cartaManilhaVisual, setCartaManilhaVisual] = useState(null);


  const processandoRodada = useRef(false);

  const iniciarPartida = useCallback(() => {
    const baseFiltrada = baralhoBase.filter((c) =>
      ORDEM_TRUCO.includes(obterValorCarta(c.nome))
    );

    const embaralhado = [...baseFiltrada].sort(() => Math.random() - 0.5);

    // Define vira e manilha
    const cartaVira = embaralhado[6];
    const valorVira = obterValorCarta(cartaVira.nome);
    const valorManilha = obterProximaCarta(valorVira);

   setVira(cartaVira);
setManilha(valorManilha);

// Encontrar uma carta do baralho que represente a manilha
const cartaVisual = baseFiltrada.find(
  (c) => obterValorCarta(c.nome) === valorManilha
);

if (cartaVisual) {
  setCartaManilhaVisual({
    ...cartaVisual,
    uid: "manilha-visual",
  });
}

    // Distribui cartas
    setMaoJogador(
      embaralhado.slice(0, 3).map((c) => ({
        ...c,
        uid: crypto.randomUUID(),
      }))
    );

    setMaoBot(
      embaralhado.slice(3, 6).map((c) => ({
        ...c,
        uid: crypto.randomUUID(),
      }))
    );

    setMesaCartas({ voce: null, bot: null });
    setHistorico([null, null, null]);
    setRodadaAtual(0);
    setResultadoFinal(null);
    setTurno("jogador");
    processandoRodada.current = false;
  }, [baralhoBase]);

  useEffect(() => {
    iniciarPartida();
  }, [iniciarPartida]);

  function jogarCartaJogador(carta) {
    if (
      turno !== "jogador" ||
      mesaCartas.voce !== null ||
      resultadoFinal ||
      processandoRodada.current
    )
      return;

    setMaoJogador((prev) => prev.filter((c) => c.uid !== carta.uid));
    setMesaCartas((prev) => ({ ...prev, voce: carta }));

    if (mesaCartas.bot === null) {
      setTurno("bot");
    }
  }

  // Jogada do BOT
  useEffect(() => {
    if (
      turno === "bot" &&
      maoBot.length > 0 &&
      !mesaCartas.bot &&
      !resultadoFinal &&
      !processandoRodada.current
    ) {
      const timer = setTimeout(() => {
        const index = Math.floor(Math.random() * maoBot.length);
        const escolhida = maoBot[index];

        setMaoBot((prev) => prev.filter((c) => c.uid !== escolhida.uid));
        setMesaCartas((prev) => ({ ...prev, bot: escolhida }));

        if (mesaCartas.voce === null) {
          setTurno("jogador");
        }
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [turno, maoBot, mesaCartas, resultadoFinal]);

  // Lógica da rodada com MANILHA REAL
  useEffect(() => {
    if (mesaCartas.voce && mesaCartas.bot) {
      processandoRodada.current = true;

      const timer = setTimeout(() => {
        const valorJogador = obterValorCarta(mesaCartas.voce.nome);
        const valorBot = obterValorCarta(mesaCartas.bot.nome);

        const naipeJogador = obterNaipe(mesaCartas.voce.nome);
        const naipeBot = obterNaipe(mesaCartas.bot.nome);

        const jogadorEhManilha = valorJogador === manilha;
        const botEhManilha = valorBot === manilha;

        let vencedorRodada;

        if (jogadorEhManilha && botEhManilha) {
          const fJ = FORCA_NAIPE[naipeJogador];
          const fB = FORCA_NAIPE[naipeBot];

          if (fJ > fB) vencedorRodada = "voce";
          else if (fB > fJ) vencedorRodada = "bot";
          else vencedorRodada = "empate";
        } else if (jogadorEhManilha) {
          vencedorRodada = "voce";
        } else if (botEhManilha) {
          vencedorRodada = "bot";
        } else {
          const vJ = FORCA_TRUCO[valorJogador];
          const vB = FORCA_TRUCO[valorBot];

          if (vJ > vB) vencedorRodada = "voce";
          else if (vB > vJ) vencedorRodada = "bot";
          else vencedorRodada = "empate";
        }

        const novoHistorico = [...historico];
        novoHistorico[rodadaAtual] = vencedorRodada;
        setHistorico(novoHistorico);

        const vitoriasJogador = novoHistorico.filter((r) => r === "voce").length;
        const vitoriasBot = novoHistorico.filter((r) => r === "bot").length;

        let fimDeJogo = false;
        let vencedorFinal = null;
        let proximoTurno = turno;

        if (vitoriasJogador >= 2) {
          vencedorFinal = "vitoria";
          fimDeJogo = true;
        } else if (vitoriasBot >= 2) {
          vencedorFinal = "derrota";
          fimDeJogo = true;
        } else if (rodadaAtual === 2) {
          vencedorFinal =
            vencedorRodada === "voce"
              ? "vitoria"
              : vencedorRodada === "bot"
              ? "derrota"
              : "empate";
          fimDeJogo = true;
        }

        if (!fimDeJogo) {
          if (vencedorRodada === "voce") proximoTurno = "jogador";
          else if (vencedorRodada === "bot") proximoTurno = "bot";
        }

        if (fimDeJogo) {
          setResultadoFinal(vencedorFinal);
          processandoRodada.current = false;
          return;
        }

        setMesaCartas({ voce: null, bot: null });
        setRodadaAtual((prev) => prev + 1);
        setTurno(proximoTurno);
        processandoRodada.current = false;
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [mesaCartas, rodadaAtual, historico, turno, manilha]);

  return (
    <div className="mesa-container">
      {/* Header */}
      <div className="mesa-header">
        <button className="btn-voltar-red" onClick={onVoltar}>
          ← Voltar
        </button>
        <span className="info-modo">Truco VS Bot</span>
        <button className="btn-embaralhar-blue" onClick={iniciarPartida}>
          Embaralhar
        </button>
      </div>

      {/* Placar Superior */}
      <div className="placar-pontos">
        <div className="placar-col">
          <span className="placar-label">Você</span>
          <div className="placar-valor">
            {historico.filter((h) => h === "voce").length}
          </div>
        </div>
        <div className="placar-col">
          <span className="placar-label">Bot</span>
          <div className="placar-valor">
            {historico.filter((h) => h === "bot").length}
          </div>
        </div>
      </div>

      {/* Mão do Bot */}
      <div className="area-bot">
        <div className={`moldura-mao ${turno === "bot" ? "ativo" : ""}`}>
          <span className="label-identificador">Bot</span>
          <div className="cartas-fileira">
            {maoBot.map((c) => (
              <Carta key={c.uid} carta={c} verso={verso} />
            ))}
          </div>
        </div>
      </div>

      {/* Centro da Mesa */}
      <div className="area-central">
        <div className="tapete-mesa">
          <div className="cartas-jogadas">
            {mesaCartas.voce && (
              <Carta carta={mesaCartas.voce} forcedOpen={true} />
            )}
            {mesaCartas.bot && (
              <Carta carta={mesaCartas.bot} forcedOpen={true} />
            )}
          </div>
          <span className="label-mesa">Rodada {rodadaAtual + 1}</span>
        </div>
      </div>

      {/* Footer: Vira + Mão + Histórico */}
      <div className="mesa-footer">
        <div className="secao-vira">
          <div className="vira-item">
          <span className="label-mini">Manilha</span>
          {cartaManilhaVisual && (
            <Carta
              carta={cartaManilhaVisual}
              forcedOpen={true}
              size="small"
            />
          )}
        </div>

        </div>

        <div className="area-jogador">
          <div className={`moldura-mao ${turno === "jogador" ? "ativo" : ""}`}>
            <span className="label-identificador">Sua Mão</span>
            <div className="cartas-fileira">
              {maoJogador.map((c, i) => (
                <Carta
                  key={c.uid}
                  carta={c}
                  verso={verso}
                  delay={i * 100}
                  onClick={() => jogarCartaJogador(c)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mini-placar-rodadas">
          <div className="placar-header-mini">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <div className="placar-corpo-mini">
            {historico.map((h, i) => (
              <div key={i} className={`celula ${h || ""}`}>
                {h === "voce" ? "✓" : h === "bot" ? "X" : ""}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal fim de jogo */}
      {resultadoFinal && (
        <div className={`modal-overlay ${resultadoFinal}`}>
          <div className="modal-content">
            <h1>
              {resultadoFinal === "vitoria"
                ? "VITÓRIA"
                : resultadoFinal === "derrota"
                ? "DERROTA"
                : "EMPATE"}
            </h1>
            <div className="modal-buttons">
              <button className="btn-jogar" onClick={iniciarPartida}>
                Jogar Novamente
              </button>
              <button className="btn-sair" onClick={onVoltar}>
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mesa;
