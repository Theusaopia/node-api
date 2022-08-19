const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query("SELECT * FROM pedidos", (error, resultado, field) => {
      if (error) {
        return res.status(500).send({
          error: error,
        });
      }

      return res.status(200).send({ response: resultado });
    });
  });
});

router.get("/:id_pedido", (req, res, next) => {
  const id = req.params.id_pedido;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "SELECT * FROM pedidos WHERE id_pedidos = ?",
      [id],
      (error, resultado, field) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        return res.status(200).send({ response: resultado });
      }
    );
  });
});

router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO pedidos (id_produto, quantidade) VALUES (?, ?)",
      [req.body.id_produto, req.body.quantidade],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        res.status(201).send({
          mensagem: "Pedido inserido com sucesso",
          id_produto: resultado.insertId,
        });
      }
    );
  });
});

router.patch("/:id_pedido", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE pedidos
        SET id_produto = ?, 
            quantidade = ?
        WHERE id_pedidos = ?`,
      [req.body.id_produto, req.body.quantidade, req.params.id_pedido],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        res.status(202).send({
          mensagem: "Pedido alterado com sucesso",
        });
      }
    );
  });
});

router.delete("/:id_pedido", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM pedidos WHERE id_pedidos = ?",
      [req.params.id_pedido],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        res.status(202).send({
          mensagem: "Pedido excluido com sucesso",
        });
      }
    );
  });
});

module.exports = router;
