require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "..", "frontend")));

const db = require("./db");

app.get("/", function (requisicao, resposta) {
  resposta.send("Eureka Hub backend está a funcionar!");
});

app.get("/perfis", function (requisicao, resposta) {
  const consulta = db.prepare("SELECT * FROM perfis");
  const perfis = consulta.all();
  resposta.json(perfis);
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.get("/perfis/:nome", function (requisicao, resposta) {
  const nomeBuscado = requisicao.params.nome;
  const consulta = db.prepare(
    "SELECT * FROM perfis WHERE nome = ? COLLATE NOCASE",
  );
  const perfilEncontrado = consulta.get(nomeBuscado);
  resposta.json(perfilEncontrado);
});

app.get("/perfis/cidade/:cidade", function (requisicao, resposta) {
  const cidadeBuscada = requisicao.params.cidade;
  const consulta = db.prepare(
    "SELECT * FROM perfis WHERE cidade = ? COLLATE NOCASE",
  );
  const perfisEncontrados = consulta.all(cidadeBuscada);
  resposta.json(perfisEncontrados);
});

app.post("/interesse", function (requisicao, resposta) {
  const perfil = requisicao.body;
  db.prepare("INSERT INTO eventos (tipo) VALUES (?)").run("interesse");

  const opcoesEmail = {
    from: process.env.GMAIL_USER,
    to: perfil.email,
    subject: "Novo interesse no Eureka Hub",
    text:
      "Alguém demonstrou interesse no perfil de " +
      perfil.nome +
      " (" +
      perfil.area +
      ", " +
      perfil.cidade +
      ").",
  };

  transporter.sendMail(opcoesEmail, function (erro, info) {
    if (erro) {
      console.log(erro);
      resposta.status(500).json({ sucesso: false });
    } else {
      resposta.json({ sucesso: true });
    }
  });
});

app.post("/metricas/busca", function (requisicao, resposta) {
  db.prepare("INSERT INTO eventos (tipo) VALUES (?)").run("busca");
  resposta.json({ sucesso: true });
});

app.get("/metricas", function (requisicao, resposta) {
  const contagens = db
    .prepare("SELECT tipo, COUNT(*) AS total FROM eventos GROUP BY tipo")
    .all();
  resposta.json(contagens);
});

app.listen(3000, function () {
  console.log("Servidor a correr em http://localhost:3000");
});
