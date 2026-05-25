import express from "express";
import { conn } from "./sequelize.js";

//TABELAS
import setorTabela from "./setorTabela.js";
import { UUIDV4 } from "sequelize";

const app = express();
const PORT = 3000;
app.use(express.json());

//Estabelecer conexão com o bando de sincronizar as tabelas
conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

/**************************** INICIO DAS ROTAS PARA SETORES *****************************/
app.get("/setores", async (req, res) => {
  try {
    const setores = await setorTabela.findAll(); //SELECT * FROM setores
    res.status(200).json(setores);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno ao listar setores" });
  }
});

//CADASTRAR UM SETOR
app.post("/setores", async (req, res) => {
  const { nome } = req.body;

  try {
    const novoSetor = await setorTabela.create({ nome: nome }); //INSERT INTO setores (nome) VALUES (nome)
    res.status(201).json(novoSetor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno ao cadastrar setor" });
  }
});

/**************************** FIM DAS ROTAS PARA SETORES *****************************/

//Rota 404
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});
