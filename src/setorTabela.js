import { DataTypes } from "sequelize";
import { conn } from "./sequelize.js";

const setorTabela = conn.define(
    "Setores",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING, //VARCHAR()
            allowNull: false
        }
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

export default setorTabela;