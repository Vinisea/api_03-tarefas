import express from "express";
import { conn } from "./sequelize.js";

//TABELAS
import setorTabela from "./setorTabela.js";

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
// Listar todas
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

//Listar um setor pelo id
app.get("/setores/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const setorSelecionado = await setorTabela.findOne({ where: { id: id } });
    if (setorSelecionado) {
      res.status(200).json(setorSelecionado);
    } else if (!setorSelecionado) {
      res.status(404).json({ message: "Setor não encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});

//Deletar um Setor pelo id
app.delete("/setores/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await setorTabela.destroy({ where: { id: id } });
    const setorSelecionado = await setorTabela.findOne({ where: { id: id } });

    if (setorSelecionado === null) {
      res.status(200).json({ message: "Excluido com sucesso!" });
    } else {
      res.status(404).json({ message: "ID não encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});

/**************************** FIM DAS ROTAS PARA SETORES *****************************/

//Rota 404
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});
