const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "GET na rota de pedidos",
  });
});

router.get("/:id_pedido", (req, res, next) => {
  const id = req.params.id_pedido;
  var mensagem = "GET em pedido exclusivo";

  if (id === "especial") {
    mensagem = "Você descobriu";
  }

  res.status(200).send({
    mensagem: mensagem,
    id: id,
  });
});

router.post("/", (req, res, next) => {

  const pedido = {
    id_produto: req.body.id_produto,
    quantidade: req.body.quantidade
  };

  res.status(201).send({
    mensagem: "POST na rota de pedidos",
    pedidoCriado: pedido
  });
});

router.patch("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "PATCH na rota de pedidos",
  });
});

router.delete("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "DELETE na rota de pedidos",
  });
});

module.exports = router;
