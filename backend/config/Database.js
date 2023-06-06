import { Sequelize } from "sequelize";

const db = new Sequelize("pengaduanmasyarakat", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
