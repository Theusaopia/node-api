const express = require("express");
const router = express.Router();

const PedidosController = require("../controllers/pedidos-controller");

router.get("/", PedidosController.getPedidos);

router.get("/:id_pedido", PedidosController.getPedidoId);

router.post("/", PedidosController.postPedido);

router.patch("/:id_pedido", PedidosController.patchPedido);

router.delete("/:id_pedido", PedidosController.deletePedido);

module.exports = router;
