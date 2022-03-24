const sequelize = require("../models/index").sequelize;
const DataTypes = require("sequelize");
const User = require("../models/user")(sequelize, DataTypes);
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = 10;

module.exports = {
  getUser: async (req, res) => {
    const data = await User.findAll();
    res.status(202).json(data);
  },
  getUserOne: async (req, res) => {
    const data = await User.findOne({
      where: { id: req.params.id },
    });
    res.status(202).json(data);
  },
  updatePw: async (req, res) => {
    try {
      const password = req.body.password;
      const hashPassword = await hash(password, saltRound);
      const data = await User.update(
        {
          password: hashPassword,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.status(202).json({ message: "Berhasil update data" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    const data = await User.destroy({
      where: { id: req.params.id },
    });
    res.status(202).json({ message: "Berhasil hapus data" });
  },
  login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const data = await User.findOne({
        where: { email: email },
      });
      if (!data) res.status(404).json({ message: "Data tidak ditemukan" });
      const dataPassword = await compare(password, data.password);
      if (!dataPassword) res.status(404).json({ message: "Password salah" });
      const payload = {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      };
      const token = jwt.sign(payload, "TOKEN");
      res.status(202).json({
        message: "Berhasil login",
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        token: token,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  register: async (req, res) => {
    try {
      const password = req.body.password;
      const hashPassword = await hash(password, saltRound);
      const data = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPassword,
      });
      res.status(202).json({ message: "Berhasil buat data", data: data });
    } catch (error) {
      // res.status(202).json({ message: error.message });

      if (error.errors[0]) {
        res.status(404).json({ message: error.errors[0].message });
      } else {
        res.status(404).json({ message: error.errors[1].message });
      }
    }
  },
  changePw: async (req, res) => {
    try {
      const password = req.body.password;
      const data = await User.findOne({
        where: { id: req.params.id },
      });
      const dataPassword = await compare(password, data.password);
      if (!dataPassword) {
        res.status(404).json({ message: "Password lama kamu salah" });
      }
      res.status(202).json({ message: "Password lama kamu benar" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  updateProfil: async (req, res) => {
    try {
      const data = await User.update(
        {
          image: req.file.filename,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.status(202).json({ message: "Berhasil perbarui avatar" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  updateData: async (req, res) => {
    try {
      const data = await User.update(
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.status(202).json({ message: "Berhasil perbarui profil" });
    } catch (error) {
      if (error.errors[0]) {
        res.status(404).json({ message: error.errors[0].message });
      } else {
        res.status(404).json({ message: error.errors[1].message });
      }
    }
  },
};
