import Pengaduan from "../models/PengaduanModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

export const getPengaduans = async (req, res) => {
  try {
    let response;
    if ((req.role === "admin", "officer")) {
      response = await Pengaduan.findAll({
        attributes: ["uuid", "isi_laporan", "image", "tanggapan", "status","url"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Pengaduan.findAll({
        attributes: ["uuid", "isi_laporan", "image", "tanggapan", "status","url"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPengaduanById = async (req, res) => {
  try {
    const pengaduan = await Pengaduan.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pengaduan)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if ((req.role === "admin", "officer")) {
      response = await Pengaduan.findOne({
        attributes: ["uuid", "isi_laporan", "image", "tanggapan", "status"],
        where: {
          id: pengaduan.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Pengaduan.findOne({
        attributes: ["uuid", "isi_laporan", "image", "tanggapan", "status"],
        where: {
          [Op.and]: [{ id: pengaduan.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPengaduan = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const { isi_laporan } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Pengaduan.create({
        isi_laporan: isi_laporan,
        image: fileName,
        url: url,
        userId: req.userId,
      });
      res.status(201).json({ msg: "Pengaduan Created Successfuly" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

export const updatePengaduan = async (req, res) => {
  try {
    const pengaduan = await Pengaduan.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pengaduan)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { isi_laporan, image, tanggapan, status } = req.body;
    if ((req.role === "admin", "officer")) {
      await Pengaduan.update(
        { isi_laporan, image, tanggapan, status },
        {
          where: {
            id: pengaduan.id,
          },
        }
      );
    } else {
      if (req.userId !== pengaduan.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Pengaduan.update(
        { isi_laporan, image, tanggapan, status },
        {
          where: {
            [Op.and]: [{ id: pengaduan.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Tanggapan successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePengaduan = async (req, res) => {
  try {
    const pengaduan = await Pengaduan.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pengaduan)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { isi_laporan, image, tanggapan } = req.body;
    if (req.role === "admin") {
      await Pengaduan.destroy({
        where: {
          id: pengaduan.id,
        },
      });
    } else {
      if (req.userId !== pengaduan.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Pengaduan.destroy({
        where: {
          [Op.and]: [{ id: pengaduan.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Pengaduan deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
