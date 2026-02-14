# 🃏 Jogo de Cartas em React (JavaScript)

Este projeto é um jogo de cartas desenvolvido em **React com JavaScript**, focado em exibir cartas na mão do jogador, com sistema de embaralhamento aleatório, distribuição de cartas e estrutura preparada para futuras expansões (bots ou multiplayer online).

---

## 📌 Visão Geral

O objetivo do projeto é simular a mecânica básica de um jogo de cartas digital, onde:

* As cartas são carregadas a partir de um baralho base
* O jogador recebe apenas 3 cartas na mão
* As cartas são embaralhadas aleatoriamente
* Não há repetição de cartas (cada carta é única)
* Existe um botão para embaralhar novamente a mão

Este projeto foi pensado para ser escalável, permitindo adicionar futuramente:

* Modo contra bot
* Multiplayer online
* Sistema de turnos
* Animações de cartas

---

## 🗂️ Estrutura do Projeto

```
src/
 ├── assets/
 │   └── cartas/          # Imagens das cartas (frente e verso)
 │
 ├── components/
 │   └── Carta.jsx        # Componente visual de cada carta
 │
 ├── data/
 │   └── Cartas.js        # Baralho base do jogo
 │
 ├── pages/
 │   └── homes/
 │       ├── Home.jsx     # Tela principal do jogo
 │       └── Home.css     # Estilos da página inicial
 │
 └── App.jsx              # Componente principal da aplicação
```

---

## 🎨 Design das Cartas

As cartas foram criadas no Figma e exportadas como imagens PNG, incluindo:

* Frente das cartas
* Verso da carta (para futuras mecânicas de cartas viradas)

Todas as imagens devem estar dentro da pasta:

```
src/assets/cartas/
```

Exemplo:

```
src/assets/cartas/2-Copas.png
src/assets/cartas/A-Espadas.png
src/assets/cartas/Parte-Traz.png
```

---

## ⚙️ Tecnologias Utilizadas

* React (JavaScript)
* Vite (build tool)
* CSS3
* Figma (design das cartas)

---

## 🚀 Como Rodar o Projeto

### 1️ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

### 2️ Entrar na pasta do projeto

```bash
cd Jogo-Cartas/frontend
```

### 3️ Instalar as dependências

```bash
npm install
```

### 4️ Iniciar o projeto

```bash
npm run dev
```

O projeto estará disponível em:

```
http://localhost:5173
```

---

## 🧠 Lógica do Sistema de Cartas

### 🎴 Baralho Base

O baralho é definido em:

```
src/data/Cartas.js
```

Ele contém todas as cartas únicas do jogo, com:

* id (único)
* nome da carta
* imagem da carta

---

### 🔀 Embaralhamento das Cartas

O embaralhamento é feito usando um algoritmo aleatório que:

* Mistura o baralho
* Seleciona apenas 3 cartas
* Garante que não haja repetição

Isso é essencial para:

* Jogos contra bots
* Multiplayer online
* Distribuição justa de cartas

---

### ✋ Sistema de Mão do Jogador

Atualmente:

* O jogador recebe apenas 3 cartas
* As cartas aparecem na tela inicial
* Não são duplicadas
* Podem ser embaralhadas com um botão

---

## 🕹️ Funcionalidades Implementadas

✔️ Exibição das cartas na tela  <br>
✔️ Distribuição automática de 3 cartas  <br>
✔️ Embaralhamento aleatório  <br>
✔️ Sem repetição de cartas  <br>
✔️ Botão de embaralhar cartas  <br>
✔️ Estrutura preparada para expansão  <br>

---

## 🔮 Futuras Melhorias (Roadmap)

* 🤖 Modo contra bot (IA)
* 🌐 Multiplayer online
* 🎲 Sistema de turnos
* 🃏 Animação de virar carta
* 🏆 Sistema de pontuação
* 🔊 Efeitos sonoros
* 📱 Responsividade para mobile

---

## 🐛 Problemas Comuns e Soluções

### ❌ Imagens das cartas não aparecem

Verifique:

* Se as imagens estão dentro de `src/assets/cartas`
* Se o nome do arquivo está correto (maiúsculas e minúsculas)
* Se o caminho do import está correto no `Cartas.js`

Exemplo correto:

```js
import carta from "../assets/cartas/nome-da-carta.png";
```

---

### ❌ Todas as cartas aparecem na mão

Isso acontece quando o código usa o baralho inteiro ao invés de sortear apenas 3 cartas.
A lógica correta deve sempre:

1. Embaralhar
2. Selecionar apenas 3 cartas

---

## 👨‍💻 Autor

Desenvolvido por Guilherme
Projeto de estudo com foco em:

* React
* Lógica de jogos
* Manipulação de estado
* Organização de projeto front-end

---

## 📜 Licença

Este projeto é de uso educacional e livre para modificações e melhorias.
