import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Pengaduans = db.define(
  "pengaduans",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isi_laporan: {
      type: DataTypes.STRING,
   
    },
    image: {
      type: DataTypes.STRING,
    },
    url: { type: DataTypes.STRING },
    tanggapan: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [3, 1000],
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ("0", "proses", "selesai"),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Pengaduans);
Pengaduans.belongsTo(Users, { foreignKey: "userId" });

export default Pengaduans;
