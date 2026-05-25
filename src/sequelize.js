import { Sequelize } from "sequelize";

export const conn = new Sequelize("banco_tarefas", "root", "123456789", {
    host: "localhost",
    dialect: "mysql",
})
// const conn = new Sequelize("banco de dados", "usuario", "senha", { host: "localhost", dialect: "mysql" })

try {
  await conn.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
