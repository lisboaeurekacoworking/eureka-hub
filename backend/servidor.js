require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

const perfis = [
  { nome: "Marina", cidade: "São Paulo", area: "UX Design" },
  { nome: "Tiago", cidade: "Lisboa", area: "Growth" },
  { nome: "Carla", cidade: "São Paulo", area: "Branding" },
];

app.get("/", function (requisicao, resposta) {
  resposta.send("Eureka Hub backend está a funcionar!");
});

app.get("/perfis", function (requisicao, resposta) {
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

app.post("/interesse", function (requisicao, resposta) {
  const perfil = requisicao.body;

  const opcoesEmail = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
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

app.listen(3000, function () {
  console.log("Servidor a correr em http://localhost:3000");
});
