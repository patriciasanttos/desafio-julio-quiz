let perguntas = [
  {
    questao:
      "1 - Qual é a linguagem de programação mais usada para desenvolvimento web?",
    alternativas: ["A: Java", "B: Phyton", "C: JavaScript", "D: Ruby"],
    alternativaCorreta: 2,
  },
  {
    questao: '2 - O que é um loop "for" usado para?',
    alternativas: [
      "A: Manipular strings",
      "B: Realizar operações aritméticas",
      "C: Criar funções",
      "D: Executar um bloco de código várias vezes",
    ],
    alternativaCorreta: 3,
  },
  {
    questao: '3 - O que é um "bug" em programação?',
    alternativas: [
      "A: Uma característica desejada do software.",
      "B: Um erro ou problema no código que leva a um comportamento indesejado.",
      "C: Uma linguagem de programação popular.",
      "D: Um recurso de depuração.",
    ],
    alternativaCorreta: 1,
  },
  {
    questao:
      "4 - Qual é a principal função de um sistema de controle de versão, como o Git?",
    alternativas: [
      "A: Gerenciar as versões do sistema operacional.",
      "B:  Desenvolver interfaces de usuário.",
      "C: Realizar análises de dados.",
      "D: Rastrear alterações no código-fonte e facilitar o trabalho em equipe.",
    ],
    alternativaCorreta: 3,
  },
  {
    questao:
      "5 - Qual é a linguagem de programação mais amplamente usada para desenvolvimento web?",
    alternativas: ["A: HTML", "B: Java", "C: Python", "D: C++"],
    alternativaCorreta: 0,
  },
];

let alternativaSelecionada = null;

function onclickResponder(numeroQuestao) {
  let alternativas = document.getElementsByClassName("alternativas");

  if (perguntas[numeroQuestao].alternativaCorreta != alternativaSelecionada) {
    alternativas[alternativaSelecionada].setAttribute(
      "class",
      "alternativas alternativaIncorreta"
    );
    alternativas[perguntas[numeroQuestao].alternativaCorreta].setAttribute(
      "class",
      "alternativas alternativaCorreta"
    );
  } else {
    alternativas[perguntas[numeroQuestao].alternativaCorreta].setAttribute(
      "class",
      "alternativas alternativaCorreta"
    );
  }

  for (let i = 0; i < alternativas.length; i++) {
    alternativas[i].setAttribute(
      "class",
      alternativas[i].className + " respondida"
    );
  }
}

function onclickAlternativa(numeroQuestao, numeroAlternativa) {
  alternativaSelecionada = numeroAlternativa;
  document.getElementById("responder").removeAttribute("disabled");

  let alternativas = document.getElementsByClassName("alternativas");
  for (let i = 0; i < alternativas.length; i++) {
    alternativas[i].setAttribute("class", "alternativas");
  }
  let divAlternativa = alternativas[numeroAlternativa];
  divAlternativa.setAttribute("class", "alternativas selecionada");
}

function perguntasNoHtml(numeroQuestao) {
  let quadroQuiz = document.getElementById("quadro-quiz");

  let h2 = document.createElement("h2");
  h2.setAttribute("id", "pergunta");
  h2.textContent = perguntas[numeroQuestao].questao;
  quadroQuiz.appendChild(h2);

  let divQuestoes = document.createElement("div");
  divQuestoes.setAttribute("id", "questoes");

  for (let i = 0; i < perguntas[numeroQuestao].alternativas.length; i++) {
    let divAlternativa = document.createElement("div");
    divAlternativa.setAttribute("class", "alternativas");
    divAlternativa.addEventListener("click", () =>
      onclickAlternativa(numeroQuestao, i)
    );

    let h2Alternativa = document.createElement("h2");
    h2Alternativa.textContent = perguntas[numeroQuestao].alternativas[i];

    divAlternativa.appendChild(h2Alternativa);
    divQuestoes.appendChild(divAlternativa);
  }

  quadroQuiz.appendChild(divQuestoes);

  let divResposta = document.createElement("div");
  divResposta.setAttribute("id", "resposta");

  let button = document.createElement("button");
  button.setAttribute("id", "responder");
  button.setAttribute("disabled", "");
  button.addEventListener("click", () => onclickResponder(numeroQuestao));

  button.textContent = "Responder";

  divResposta.appendChild(button);
  quadroQuiz.appendChild(divResposta);
}

perguntasNoHtml(0);
