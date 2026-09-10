let perfis = [];

const listaPerfis = document.getElementById("listaPerfis");

function renderizarPerfis(lista) {
  listaPerfis.innerHTML = "";
  for (const perfil of lista) {
    const card = document.createElement("div");
    card.className = "card-perfil";
    card.textContent =
      perfil.nome + " - " + perfil.area + " (" + perfil.pontos + " pontos)";

    card.addEventListener("click", function () {
      mostrarDetalhe(perfil);
    });

    listaPerfis.appendChild(card);
  }
}

function carregarPerfis() {
  fetch("http://localhost:3000/perfis")
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (dados) {
      perfis = dados;
      renderizarPerfis(perfis);
    });
}

carregarPerfis();

const inputBusca = document.getElementById("inputBusca");

function filtrarPorTermo(lista, texto) {
  const resultado = [];
  const termoBusca = texto.toLowerCase();

  for (const perfil of lista) {
    const nomeCombina = perfil.nome.toLowerCase().includes(termoBusca);
    const cidadeCombina = perfil.cidade.toLowerCase().includes(termoBusca);
    const areaCombina = perfil.area.toLowerCase().includes(termoBusca);

    if (nomeCombina || cidadeCombina || areaCombina) {
      resultado.push(perfil);
    }
  }

  return resultado;
}

inputBusca.addEventListener("input", function () {
  const texto = inputBusca.value;
  const filtrados = filtrarPorTermo(perfis, texto);
  renderizarPerfis(filtrados);
});

const divDetalhe = document.getElementById("detalhePerfil");

function mostrarDetalhe(perfil) {
  divDetalhe.innerHTML = "";

  const nomeEl = document.createElement("h2");
  nomeEl.textContent = perfil.nome;
  divDetalhe.appendChild(nomeEl);

  const infoEl = document.createElement("p");
  infoEl.textContent = perfil.cidade + " - " + perfil.area;
  divDetalhe.appendChild(infoEl);

  const botaoInteresse = document.createElement("button");
  botaoInteresse.textContent = "Tenho interesse";
  divDetalhe.appendChild(botaoInteresse);

  botaoInteresse.addEventListener("click", function () {
    fetch("http://localhost:3000/interesse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(perfil),
    })
      .then(function (resposta) {
        return resposta.json();
      })
      .then(function (dados) {
        const confirmacao = document.createElement("p");
        confirmacao.textContent = dados.sucesso
          ? "E-mail enviado para " + perfil.nome + "!"
          : "Não foi possível enviar o e-mail, tenta outra vez.";
        divDetalhe.appendChild(confirmacao);
      });
  });
}
