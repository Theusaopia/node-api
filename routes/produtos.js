const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "GET na rota de produtos",
  });
});

router.get("/:id_produto", (req, res, next) => {
  const id = req.params.id_produto;
  var mensagem = "GET em produto exclusivo";

  if (id === "especial") {
    mensagem = "Você descobriu";
  }

  res.status(200).send({
    mensagem: mensagem,
    id: id,
  });
});

router.post("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "POST na rota de produtos",
  });
});

router.patch("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "PATCH na rota de produtos",
  });
});

router.delete("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "DELETE na rota de produtos",
  });
});

module.exports = router;
