import { Sequelize } from "sequelize";

const databaseUrl = process.env.DATABASE_URL as string;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not defined!");
}

const sequelizeDB = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
  dialectModule: require("pg"),
});

const connection = async () =>
  sequelizeDB
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((err) => console.error("Unable to connect to the database:", err));

connection();
export default sequelizeDB;
