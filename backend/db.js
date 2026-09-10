const Database = require("better-sqlite3");

const db = new Database("eureka.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS perfis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cidade TEXT,
    area TEXT,
    email TEXT,
    pontos INTEGER
  )
`);

const contagem = db.prepare("SELECT COUNT(*) AS total FROM perfis").get();

if (contagem.total === 0) {
  const inserir = db.prepare(
    "INSERT INTO perfis (nome, cidade, area, email, pontos) VALUES (?, ?, ?, ?, ?)",
  );
  inserir.run(
    "Marina",
    "São Paulo",
    "UX Design",
    "luizaccarneiro+marina@gmail.com",
    400,
  );
  inserir.run(
    "Tiago",
    "Lisboa",
    "Growth",
    "luizaccarneiro+tiago@gmail.com",
    550,
  );
  inserir.run(
    "Carla",
    "São Paulo",
    "Branding",
    "luizaccarneiro+carla@gmail.com",
    750,
  );
  inserir.run(
    "Rafael",
    "Lisboa",
    "Vendas",
    "luizaccarneiro+rafael@gmail.com",
    300,
  );
}

module.exports = db;
