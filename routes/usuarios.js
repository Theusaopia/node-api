const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/usuarios-controller");

router.post("/cadastro", UsuarioController.cadastro);

router.post("/login", UsuarioController.login);

module.exports = router;
