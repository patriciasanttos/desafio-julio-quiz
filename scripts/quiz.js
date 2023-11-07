let respondida = false

function mostrarResultados() {
  // Limpa a div do quadro-quiz
  let quadroQuiz = document.getElementById("quadro-quiz");
  quadroQuiz.innerHTML = '';

  // Titulo
  let h2 = document.createElement("h2");
  h2.textContent = 'Resultado';
  quadroQuiz.appendChild(h2);

  for (let i = 0; i < perguntas.length; i++) {
    const pergunta = perguntas[i];

    let div = document.createElement("div");
    let ul = document.createElement("ul");

    let h3 = document.createElement('h3');
    h3.textContent = pergunta.questao

    div.appendChild(h3)

    for (let j = 0; j < pergunta.alternativas.length; j++) {
      const alternativa = pergunta.alternativas[j];

      let li = document.createElement("li");
      li.textContent = alternativa;

      let classes = ''
      if (j === pergunta.alternativaSelecionada) {
        classes += ' selecionada'

        if (pergunta.alternativaCorreta == pergunta.alternativaSelecionada) {
          classes += ' correta'
        } else {
          classes += ' errada'
        }
      } else {
        if (j === pergunta.alternativaCorreta && j != pergunta.alternativaSelecionada) {
          classes += ' correta'
        } 
      }

      li.setAttribute('class', classes)
      ul.appendChild(li)
    }
    div.appendChild(ul)

    quadroQuiz.appendChild(div)
  }

  
  let divResposta = document.createElement("div");
  divResposta.setAttribute("id", "resposta");

  let button = document.createElement("button");
  button.setAttribute("id", "responder");
  button.addEventListener("click", () => window.location = '/');
  button.textContent = "Voltar";

  divResposta.appendChild(button)
  quadroQuiz.appendChild(divResposta)
}

function onClickProximo() {
  // Vai pra próxima pergunta e verifica se já chegou na última
  perguntaAtual++
  respondida = false

  if (perguntaAtual < perguntas.length) {
    perguntasNoHtml(perguntaAtual);
  } else {
    mostrarResultados()
  }
}

function onClickResponder(numeroQuestao) {
  respondida = true

  let alternativas = document.getElementsByClassName("alternativas");
  let questao = perguntas[numeroQuestao]

  if (questao.alternativaCorreta != questao.alternativaSelecionada) {
    alternativas[questao.alternativaSelecionada].setAttribute(
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

  // Coloca classe "respondida" (trava as alternativas)
  for (let i = 0; i < alternativas.length; i++) {
    alternativas[i].setAttribute(
      "class",
      alternativas[i].className + " respondida"
    );
  }

  // Omitir botão responser e criar o botão "próximo"
  document.getElementById("responder").remove()

  let button = document.createElement("button");
  button.setAttribute("id", "responder");
  button.addEventListener("click", () => onClickProximo(numeroQuestao));
  button.textContent = "Próximo";

  document.getElementById("resposta").appendChild(button)
}

function onClickAlternativa(numeroQuestao, numeroAlternativa) {
  if (!respondida) {
    perguntas[numeroQuestao].alternativaSelecionada = numeroAlternativa;
    document.getElementById("responder").removeAttribute("disabled");
  
    let alternativas = document.getElementsByClassName("alternativas");
    for (let i = 0; i < alternativas.length; i++) {
      alternativas[i].setAttribute("class", "alternativas");
    }
    let divAlternativa = alternativas[numeroAlternativa];
    divAlternativa.setAttribute("class", "alternativas selecionada");
  }
}

function perguntasNoHtml(numeroQuestao) {
  // Limpa a div do quadro-quiz
  let quadroQuiz = document.getElementById("quadro-quiz");
  quadroQuiz.innerHTML = '';

  // Titulo da questão
  let h2 = document.createElement("h2");
  h2.setAttribute("id", "pergunta");
  h2.textContent = perguntas[numeroQuestao].questao;
  quadroQuiz.appendChild(h2);

  let divQuestoes = document.createElement("div");
  divQuestoes.setAttribute("id", "questoes");

  // Lista com as alternativas
  for (let i = 0; i < perguntas[numeroQuestao].alternativas.length; i++) {
    let divAlternativa = document.createElement("div");
    divAlternativa.setAttribute("class", "alternativas");
    divAlternativa.addEventListener("click", () =>
      onClickAlternativa(numeroQuestao, i)
    );

    let h2Alternativa = document.createElement("h2");
    h2Alternativa.textContent = perguntas[numeroQuestao].alternativas[i];

    divAlternativa.appendChild(h2Alternativa);
    divQuestoes.appendChild(divAlternativa);
  }

  quadroQuiz.appendChild(divQuestoes);

  let divResposta = document.createElement("div");
  divResposta.setAttribute("id", "resposta");

  // Botão de responder
  let button = document.createElement("button");
  button.setAttribute("id", "responder");
  button.setAttribute("disabled", "");
  button.addEventListener("click", () => onClickResponder(numeroQuestao));
  button.textContent = "Responder";

  divResposta.appendChild(button);
  quadroQuiz.appendChild(divResposta);
}

// Começar mostrando a primeira pergunta (perguntaAtual: 0)
perguntasNoHtml(perguntaAtual);
