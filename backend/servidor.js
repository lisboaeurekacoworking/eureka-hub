const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

const perfis = [
  { nome: "Marina", cidade: "São Paulo", area: "UX Design" },
  { nome: "Tiago", cidade: "Lisboa", area: "Growth" },
  { nome: "Carla", cidade: "São Paulo", area: "Branding" },
];

app.get("/", function (requisicao, resposta) {
  resposta.send("Eureka Hub backend está rodando!");
});

app.get("/perfis", function (requisicao, resposta) {
  resposta.json(perfis);
});

app.get("/perfis/:nome", function (requisicao, resposta) {
  const nomeBuscado = requisicao.params.nome;
  let perfilEncontrado = undefined;

  for (const perfil of perfis) {
    if (perfil.nome === nomeBuscado) {
      perfilEncontrado = perfil;
    }
  }

  resposta.json(perfilEncontrado);
});

app.listen(3000, function () {
  console.log("Servidor rodando em http://localhost:3000");
});
