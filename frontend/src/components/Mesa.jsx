import React, { useEffect, useState, useCallback, useRef } from "react";
import Carta from "./Carta";
import './Mesa.css';

const FORCA_TRUCO = {
  "4": 1, "5": 2, "6": 3, "7": 4, "Q": 5, "J": 6, "K": 7, "A": 8, "2": 9, "3": 10
};

const obterValorCarta = (nome) => {
  if (nome.includes("Ás")) return "A";
  if (nome.includes("Rei")) return "K";
  if (nome.includes("Dama")) return "Q";
  if (nome.includes("Valete")) return "J";
  return nome.split(" ")[0];
};

function Mesa({ modo, onVoltar, baralhoBase, verso }) {
  const [maoJogador, setMaoJogador] = useState([]);
  const [maoBot, setMaoBot] = useState([]);
  const [mesaCartas, setMesaCartas] = useState({ voce: null, bot: null });
  const [historico, setHistorico] = useState([null, null, null]);
  const [rodadaAtual, setRodadaAtual] = useState(0);
  const [resultadoFinal, setResultadoFinal] = useState(null);
  const [turno, setTurno] = useState("jogador");
  
  // Ref para evitar que o clique funcione enquanto a mesa está processando o resultado
  const processandoRodada = useRef(false);

  const iniciarPartida = useCallback(() => {
    const baseFiltrada = baralhoBase.filter(c => 
      ["4","5","6","7","Q","J","K","A","2","3"].includes(obterValorCarta(c.nome))
    );
    const embaralhado = [...baseFiltrada].sort(() => Math.random() - 0.5);
    
    setMaoJogador(embaralhado.slice(0, 3).map(c => ({ ...c, uid: crypto.randomUUID() })));
    setMaoBot(embaralhado.slice(3, 6).map(c => ({ ...c, uid: crypto.randomUUID() })));
    setMesaCartas({ voce: null, bot: null });
    setHistorico([null, null, null]);
    setRodadaAtual(0);
    setResultadoFinal(null);
    setTurno("jogador");
    processandoRodada.current = false;
  }, [baralhoBase]);

  useEffect(() => { iniciarPartida(); }, [iniciarPartida]);

  function jogarCartaJogador(carta) {
    // Bloqueia se não for o turno, se já jogou na mesa OU se a rodada está sendo processada
    if (turno !== "jogador" || mesaCartas.voce !== null || resultadoFinal || processandoRodada.current) return;

    setMaoJogador(prev => prev.filter(c => c.uid !== carta.uid));
    setMesaCartas(prev => ({ ...prev, voce: carta }));
    
    if (mesaCartas.bot === null) {
      setTurno("bot");
    }
  }

  useEffect(() => {
    if (turno === "bot" && maoBot.length > 0 && !mesaCartas.bot && !resultadoFinal && !processandoRodada.current) {
      const timer = setTimeout(() => {
        const index = Math.floor(Math.random() * maoBot.length);
        const escolhida = maoBot[index];
        setMaoBot(prev => prev.filter(c => c.uid !== escolhida.uid));
        setMesaCartas(prev => ({ ...prev, bot: escolhida }));

        if (mesaCartas.voce === null) {
          setTurno("jogador");
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [turno, maoBot.length, mesaCartas.bot, mesaCartas.voce, resultadoFinal]);

 useEffect(() => {
  if (mesaCartas.voce && mesaCartas.bot) {
    processandoRodada.current = true;

    const timer = setTimeout(() => {
      const vJ = FORCA_TRUCO[obterValorCarta(mesaCartas.voce.nome)];
      const vB = FORCA_TRUCO[obterValorCarta(mesaCartas.bot.nome)];

      let vencedorRodada;
      if (vJ > vB) vencedorRodada = "voce";
      else if (vB > vJ) vencedorRodada = "bot";
      else vencedorRodada = "empate";

      // Atualiza histórico corretamente
      const novoHistorico = [...historico];
      novoHistorico[rodadaAtual] = vencedorRodada;
      setHistorico(novoHistorico);

      const r1 = novoHistorico[0];
      const r2 = novoHistorico[1];
      const r3 = novoHistorico[2];

      let fimDeJogo = false;
      let vencedorFinal = null;
      let proximoTurno = turno;

      // =========================
      // REGRAS OFICIAIS DO TRUCO
      // =========================

      // Regra 1: 2 vitórias ganha o jogo
      const vitoriasJogador = novoHistorico.filter(r => r === "voce").length;
      const vitoriasBot = novoHistorico.filter(r => r === "bot").length;

      if (vitoriasJogador >= 2) {
        vencedorFinal = "vitoria";
        fimDeJogo = true;
      } 
      else if (vitoriasBot >= 2) {
        vencedorFinal = "derrota";
        fimDeJogo = true;
      }

      // Regra 2: empate na 1ª, quem ganhar a 2ª vence
      else if (rodadaAtual === 1 && r1 === "empate" && r2 !== "empate") {
        vencedorFinal = r2 === "voce" ? "vitoria" : "derrota";
        fimDeJogo = true;
      }

      // Regra 3: ganhou a 1ª e empatou a 2ª = venceu o jogo
      else if (rodadaAtual === 1 && r2 === "empate" && r1 !== "empate") {
        vencedorFinal = r1 === "voce" ? "vitoria" : "derrota";
        fimDeJogo = true;
      }

      // Regra 4: terceira rodada decide
      else if (rodadaAtual === 2) {
        if (r3 === "voce") vencedorFinal = "vitoria";
        else if (r3 === "bot") vencedorFinal = "derrota";
        else {
          // 3 empates = ninguém ganha
          vencedorFinal = "empate";
        }
        fimDeJogo = true;
      }

      // Define quem começa a próxima rodada
      if (!fimDeJogo) {
        if (vencedorRodada === "voce") proximoTurno = "jogador";
        else if (vencedorRodada === "bot") proximoTurno = "bot";
        else {
          // Empate = mantém quem começou a rodada
          proximoTurno = turno;
        }
      }

      // Se o jogo acabou
      if (fimDeJogo) {
        setResultadoFinal(vencedorFinal);
        processandoRodada.current = false; // 🔥 CORREÇÃO CRÍTICA DO BUG
        return;
      }

      // Continua para próxima rodada
      setMesaCartas({ voce: null, bot: null });
      setRodadaAtual(prev => prev + 1);
      setTurno(proximoTurno);
      processandoRodada.current = false; // libera clique

    }, 1500);

    return () => clearTimeout(timer);
  }
}, [mesaCartas, rodadaAtual, historico, turno]);


  return (
    // ... Seu JSX permanece exatamente o mesmo
    <div className="mesa-container">
       {/* ... Copie o return do seu código anterior aqui ... */}
       <div className="mesa-header">
         <button className="btn-voltar-red" onClick={onVoltar}>← Voltar</button>
         <span className="info-modo">Truco VS Bot</span>
         <button className="btn-embaralhar-blue" onClick={iniciarPartida}>Embaralhar</button>
       </div>

       <div className="secao-bot">
         <div className={`moldura-mao ${turno === 'bot' ? 'ativo' : ''}`}>
           <span className="label-identificador">Bot</span>
           <div className="cartas-fileira">
             {maoBot.map(c => <Carta key={c.uid} carta={c} verso={verso} />)}
           </div>
         </div>
       </div>

       <div className="secao-central">
         <div className="tapete-mesa">
           <div className="slot-mesa">
             <span className="label-slot">Você</span>
             {mesaCartas.voce && <Carta carta={mesaCartas.voce} forcedOpen={true} />}
           </div>
           <div className="slot-resultado">
              <span className="vitoria-texto">Rodada {rodadaAtual + 1}</span>
           </div>
           <div className="slot-mesa">
             <span className="label-slot">Bot</span>
             {mesaCartas.bot && <Carta carta={mesaCartas.bot} forcedOpen={true} />}
           </div>
         </div>
       </div>

       <div className="secao-jogador">
         <div className={`moldura-mao ${turno === 'jogador' ? 'ativo' : ''}`}>
           <span className="label-identificador">Sua Mão</span>
           <div className="cartas-fileira">
             {maoJogador.map((c, i) => (
               <Carta key={c.uid} carta={c} verso={verso} delay={i * 100} onClick={() => jogarCartaJogador(c)} />
             ))}
           </div>
         </div>

         <div className="mini-placar">
           <div className="placar-header">
             <span>Pri</span><span>Seg</span><span>Ter</span>
           </div>
           <div className="placar-corpo">
             {historico.map((h, i) => (
               <div key={i} className={`celula ${h || ''}`}>{h ? (h === 'voce' ? 'Voce' : h === 'bot' ? 'Bot' : 'Tie') : ''}</div>
             ))}
           </div>
         </div>
       </div>

       {resultadoFinal && (
         <div className={`modal-overlay ${resultadoFinal}`}>
           <div className="modal-content">
             <h1>{resultadoFinal === 'vitoria' ? 'VITÓRIA' : 'DERROTA'}</h1>
             <div className="modal-buttons">
               <button className="btn-jogar" onClick={iniciarPartida}>Jogar Novamente</button>
               <button className="btn-sair" onClick={onVoltar}>Sair</button>
             </div>
           </div>
         </div>
       )}
    </div>
  );
}

export default Mesa;