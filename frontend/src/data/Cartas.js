// src/data/Cartas.js

import copa2 from "../assets/cartas/2-copa.png";
import espada2 from "../assets/cartas/2-espada.png";
import ouro2 from "../assets/cartas/2-ouro.png";
import paus2 from "../assets/cartas/2-paus.png";

import copa3 from "../assets/cartas/3-copa.png";
import espada3 from "../assets/cartas/3-espada.png";
import ouro3 from "../assets/cartas/3-ouro.png";
import paus3 from "../assets/cartas/3-paus.png";

import copa4 from "../assets/cartas/4-copa.png";
import espada4 from "../assets/cartas/4-espada.png";
import ouro4 from "../assets/cartas/4-ouro.png";
import paus4 from "../assets/cartas/4-paus.png";

import copa5 from "../assets/cartas/5-copa.png";
import espada5 from "../assets/cartas/5-espada.png";
import ouro5 from "../assets/cartas/5-ouro.png";
import paus5 from "../assets/cartas/5-paus.png";

import copa6 from "../assets/cartas/6-copa.png";
import espada6 from "../assets/cartas/6-espada.png";
import ouro6 from "../assets/cartas/6-ouro.png";
import paus6 from "../assets/cartas/6-paus.png";

import copa7 from "../assets/cartas/7-copa.png";
import espada7 from "../assets/cartas/7-espada.png";
import ouro7 from "../assets/cartas/7-ouro.png";
import paus7 from "../assets/cartas/7-paus.png";

import copa8 from "../assets/cartas/8-copa.png";
import espada8 from "../assets/cartas/8-espada.png";
import ouro8 from "../assets/cartas/8-ouro.png";
import paus8 from "../assets/cartas/8-paus.png";

import copa9 from "../assets/cartas/9-copa.png";
import espada9 from "../assets/cartas/9-espada.png";
import ouro9 from "../assets/cartas/9-ouro.png";
import paus9 from "../assets/cartas/9-paus.png";

import copa10 from "../assets/cartas/10-copa.png";
import espada10 from "../assets/cartas/10-espada.png";
import ouro10 from "../assets/cartas/10-ouro.png";
import paus10 from "../assets/cartas/10-paus.png";

import copaA from "../assets/cartas/A-copa.png";
import espadaA from "../assets/cartas/A-espada.png";
import ouroA from "../assets/cartas/A-ouro.png";
import pausA from "../assets/cartas/A-paus.png";

import copaJ from "../assets/cartas/J-copa.png";
import espadaJ from "../assets/cartas/J-espada.png";
import ouroJ from "../assets/cartas/J-ouro.png";
import pausJ from "../assets/cartas/J-paus.png";

import copaQ from "../assets/cartas/Q-copa.png";
import espadaQ from "../assets/cartas/Q-espada.png";
import ouroQ from "../assets/cartas/Q-ouro.png";
import pausQ from "../assets/cartas/Q-paus.png";

import copaK from "../assets/cartas/K-copa.png";
import espadaK from "../assets/cartas/K-espada.png";
import ouroK from "../assets/cartas/K-ouro.png";
import pausK from "../assets/cartas/K-paus.png";

import coringaP from "../assets/cartas/C-P.png";
import coringaV from "../assets/cartas/C-V.png";
import verso from "../assets/cartas/Verso.png";

export const BARALHO_BASE = [
  // ===== 2 =====
  { id: 1, nome: "2 de Copas", img: copa2 },
  { id: 2, nome: "2 de Espadas", img: espada2 },
  { id: 3, nome: "2 de Ouros", img: ouro2 },
  { id: 4, nome: "2 de Paus", img: paus2 },

  // ===== 3 =====
  { id: 5, nome: "3 de Copas", img: copa3 },
  { id: 6, nome: "3 de Espadas", img: espada3 },
  { id: 7, nome: "3 de Ouros", img: ouro3 },
  { id: 8, nome: "3 de Paus", img: paus3 },

  // ===== 4 =====
  { id: 9, nome: "4 de Copas", img: copa4 },
  { id: 10, nome: "4 de Espadas", img: espada4 },
  { id: 11, nome: "4 de Ouros", img: ouro4 },
  { id: 12, nome: "4 de Paus", img: paus4 },

  // ===== 5 =====
  { id: 13, nome: "5 de Copas", img: copa5 },
  { id: 14, nome: "5 de Espadas", img: espada5 },
  { id: 15, nome: "5 de Ouros", img: ouro5 },
  { id: 16, nome: "5 de Paus", img: paus5 },

  // ===== 6 =====
  { id: 17, nome: "6 de Copas", img: copa6 },
  { id: 18, nome: "6 de Espadas", img: espada6 },
  { id: 19, nome: "6 de Ouros", img: ouro6 },
  { id: 20, nome: "6 de Paus", img: paus6 },

  // ===== 7 =====
  { id: 21, nome: "7 de Copas", img: copa7 },
  { id: 22, nome: "7 de Espadas", img: espada7 },
  { id: 23, nome: "7 de Ouros", img: ouro7 },
  { id: 24, nome: "7 de Paus", img: paus7 },

  // ===== 8 (NOVO) =====
  { id: 25, nome: "8 de Copas", img: copa8 },
  { id: 26, nome: "8 de Espadas", img: espada8 },
  { id: 27, nome: "8 de Ouros", img: ouro8 },
  { id: 28, nome: "8 de Paus", img: paus8 },

  // ===== 9 (NOVO) =====
  { id: 29, nome: "9 de Copas", img: copa9 },
  { id: 30, nome: "9 de Espadas", img: espada9 },
  { id: 31, nome: "9 de Ouros", img: ouro9 },
  { id: 32, nome: "9 de Paus", img: paus9 },

  // ===== 10 (NOVO) =====
  { id: 33, nome: "10 de Copas", img: copa10 },
  { id: 34, nome: "10 de Espadas", img: espada10 },
  { id: 35, nome: "10 de Ouros", img: ouro10 },
  { id: 36, nome: "10 de Paus", img: paus10 },

  // ===== ÁS =====
  { id: 37, nome: "Ás de Copas", img: copaA },
  { id: 38, nome: "Ás de Espadas", img: espadaA },
  { id: 39, nome: "Ás de Ouros", img: ouroA },
  { id: 40, nome: "Ás de Paus", img: pausA },

  // ===== VALETE =====
  { id: 41, nome: "Valete de Copas", img: copaJ },
  { id: 42, nome: "Valete de Espadas", img: espadaJ },
  { id: 43, nome: "Valete de Ouros", img: ouroJ },
  { id: 44, nome: "Valete de Paus", img: pausJ },

  // ===== DAMA =====
  { id: 45, nome: "Dama de Copas", img: copaQ },
  { id: 46, nome: "Dama de Espadas", img: espadaQ },
  { id: 47, nome: "Dama de Ouros", img: ouroQ },
  { id: 48, nome: "Dama de Paus", img: pausQ },

  // ===== REI =====
  { id: 49, nome: "Rei de Copas", img: copaK },
  { id: 50, nome: "Rei de Espadas", img: espadaK },
  { id: 51, nome: "Rei de Ouros", img: ouroK },
  { id: 52, nome: "Rei de Paus", img: pausK },

  // ===== CORINGAS =====
  { id: 53, nome: "Coringa Preto", img: coringaP },
  { id: 54, nome: "Coringa Vermelho", img: coringaV },
];


export const VERSO_CARTA = verso;
