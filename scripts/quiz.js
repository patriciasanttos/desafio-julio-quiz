let respondida = false;
let perguntaAtual = 0;

function filtrarPerguntas() {
  const urlParams = new URLSearchParams(window.location.search);
  const quantidade = urlParams.get('q');

  if (quantidade && quantidade <= 10) {
    let listaFiltrada = []

    while(listaFiltrada.length < quantidade) {
      const pergunta = perguntas[Math.floor(Math.random() * perguntas.length)];
      if (listaFiltrada.indexOf(pergunta) == -1) {
        listaFiltrada.push(pergunta)
      }
    }
    
    perguntas = [...listaFiltrada]
  }
}

function mostrarResultados() {
  // Limpa a div do quadro-quiz
  let quadroQuiz = document.getElementById("quadro-quiz");
  quadroQuiz.innerHTML = "";

  quadroQuiz.setAttribute('class', 'animate__animated animate__backInUp')

  // Titulo
  let divHeader = document.createElement("div");
  divHeader.setAttribute("class", "flex-row");

  let h2 = document.createElement("h2");
  h2.textContent = "Resultado";
  divHeader.appendChild(h2);

  let divResultado = document.createElement("div");
  divResultado.setAttribute("id", "titulo-resultado");
  divHeader.appendChild(divResultado);

  quadroQuiz.appendChild(divHeader);

  let divScore = document.createElement("div");
  quadroQuiz.appendChild(divScore);

  let acertos = 0
  let erros = 0

  for (let i = 0; i < perguntas.length; i++) {
    const pergunta = perguntas[i];

    let div = document.createElement("div");
    let ul = document.createElement("ul");
    let acertou = pergunta.alternativaCorreta == pergunta.alternativaSelecionada

    if (acertou) {
      acertos++
    } else {
      erros++
    }

    let h3 = document.createElement("h3");
    h3.textContent = (acertou ? `✅ ` : `❌ `) + pergunta.questao;

    div.appendChild(h3);

    for (let j = 0; j < pergunta.alternativas.length; j++) {
      const alternativa = pergunta.alternativas[j];

      let li = document.createElement("li");
      li.textContent = alternativa;

      let classes = "";
      if (j === pergunta.alternativaSelecionada) {
        classes += " selecionada";

        if (acertou) {
          classes += " correta";
        } else {
          classes += " errada";
        }
      } else {
        if (
          j === pergunta.alternativaCorreta &&
          j != pergunta.alternativaSelecionada
        ) {
          classes += " correta";
        }
      }

      li.setAttribute("class", classes);
      ul.appendChild(li);
    }
    
    div.appendChild(ul);
    quadroQuiz.appendChild(div);
  }

  document.getElementById('titulo-resultado').innerHTML += `${acertos} ✅    ❌ ${erros}`;

  let divResposta = document.createElement("div");
  divResposta.setAttribute("id", "resposta");

  let buttonRedo = document.createElement("button");
  buttonRedo.setAttribute("id", "responder");
  buttonRedo.addEventListener("click", () => onClickRedo());
  buttonRedo.textContent = "Refazer Quiz";

  let buttonBack = document.createElement("button");
  buttonBack.setAttribute("id", "responder");
  buttonBack.addEventListener("click", () => (window.location = "/"));
  buttonBack.textContent = "Voltar";

  divResposta.appendChild(buttonRedo);
  divResposta.appendChild(buttonBack);
  quadroQuiz.appendChild(divResposta);
}

function onClickProximo() {
  // Vai pra próxima pergunta e verifica se já chegou na última
  perguntaAtual++;
  respondida = false;
  
  let quadroQuiz = document.getElementById("quadro-quiz");
  quadroQuiz.setAttribute('class', 'animate__animated animate__fadeOutLeft')

  setTimeout(() => {
    if (perguntaAtual < perguntas.length) {
      perguntasNoHtml(perguntaAtual);
    } else {
      mostrarResultados();
    }
  }, 400)
}

function onClickRedo () {
  perguntaAtual = 0;
  respondida = false;
  
  let quadroQuiz = document.getElementById("quadro-quiz");
  quadroQuiz.setAttribute('class', 'animate__animated animate__backOutDown')

  setTimeout(() => {
    perguntasNoHtml(perguntaAtual);
  }, 400)
}

function onClickResponder(numeroQuestao) {
  respondida = true;

  let alternativas = document.getElementsByClassName("alternativas");
  let questao = perguntas[numeroQuestao];
  let acertou = questao.alternativaCorreta == questao.alternativaSelecionada

  if (!acertou) {
    alternativas[questao.alternativaSelecionada].setAttribute(
      "class",
      "alternativas alternativaIncorreta"
    );
    alternativas[perguntas[numeroQuestao].alternativaCorreta].setAttribute(
      "class",
      "alternativas alternativaCorreta animate__animated animate__flash"
    );
    
    let quadroQuiz = document.getElementById("quadro-quiz");
    quadroQuiz.setAttribute('class', 'animate__animated animate__headShake')

    let audio = new Audio('/sounds/error.mp3');
    audio.volume = 0.2
    audio.play(); 
  } else {
    alternativas[perguntas[numeroQuestao].alternativaCorreta].setAttribute(
      "class",
      "alternativas alternativaCorreta animate__animated animate__flash"
    );
    let audio = new Audio('/sounds/correct.mp3');
    audio.volume = 0.3
    audio.play(); 
  }

  // Coloca classe "respondida" (trava as alternativas)
  for (let i = 0; i < alternativas.length; i++) {
    alternativas[i].setAttribute(
      "class",
      alternativas[i].className + " respondida"
    );
  }

  // Omitir botão responser e criar o botão "próximo"
  document.getElementById("responder").remove();

  let button = document.createElement("button");
  button.setAttribute("id", "responder");
  button.addEventListener("click", () => onClickProximo(numeroQuestao));
  button.textContent = "Próximo";

  document.getElementById("resposta").appendChild(button);
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
  quadroQuiz.innerHTML = "";

  // Titulo da questão
  let h2 = document.createElement("h2");
  h2.setAttribute("id", "pergunta");
  h2.textContent = (perguntaAtual + 1) + ' - ' + perguntas[numeroQuestao].questao;
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

  quadroQuiz.setAttribute('class', 'animate__animated animate__fadeInRight')
}

// filtrar perguntas pela querystring "q"
filtrarPerguntas();

// Começar mostrando a primeira pergunta (perguntaAtual: 0)
perguntasNoHtml(perguntaAtual);


