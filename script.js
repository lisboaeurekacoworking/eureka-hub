const perfis = [
  { nome: "Maria Joana", cidade: "Campinas", area: "UX Design", pontos: 550 },
  {
    nome: "Carolina Andrade",
    cidade: "Lisboa",
    area: "Marketing Digital",
    pontos: 950,
  },
  {
    nome: "Pedro Sousa",
    cidade: "São Paulo",
    area: "Engenheiro de Produção",
    pontos: 950,
  },
];

const listaPerfis = document.getElementById("listaPerfis");

function renderizarPerfis(lista) {
  listaPerfis.innerHTML = "";
  for (const perfil of lista) {
    const card = document.createElement("div");
    card.textContent = perfil.nome + " - " + perfil.area;
    listaPerfis.appendChild(card);
  }
}

renderizarPerfis(perfis);

const inputBusca = document.getElementById("inputBusca");

function filtrarPorLetra(lista, letra) {
  const resultado = [];
  for (const perfil of lista) {
    if (perfil.nome.startsWith(letra)) {
      resultado.push(perfil);
    }
  }
  return resultado;
}

inputBusca.addEventListener("input", function () {
  const texto = inputBusca.value;
  const filtrados = filtrarPorLetra(perfis, texto);
  renderizarPerfis(filtrados);
});
