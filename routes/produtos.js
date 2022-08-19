const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query("SELECT * FROM produtos", (error, resultado, field) => {
      if (error) {
        return res.status(500).send({
          error: error,
        });
      }

      return res.status(200).send({ response: resultado });
    });
  });
});

router.get("/:id_produto", (req, res, next) => {
  const id = req.params.id_produto;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "SELECT * FROM produtos WHERE id_produto = ?",
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
      "INSERT INTO produtos (nome, preco) VALUES (?, ?)",
      [req.body.nome, req.body.preco],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        res.status(201).send({
          mensagem: "Produto inserido com sucesso",
          id_produto: resultado.insertId,
        });
      }
    );
  });
});

router.patch("/:id_produto", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE produtos
        SET nome = ?, 
            preco = ?
        WHERE id_produto = ?`,
      [req.body.nome, req.body.preco, req.params.id_produto],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        res.status(202).send({
          mensagem: "Produto alterado com sucesso",
        });
      }
    );
  });
});

router.delete("/:id_produto", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM produtos WHERE id_produto = ?",
      [req.params.id_produto],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        res.status(202).send({
          mensagem: "Produto excluido com sucesso",
        });
      }
    );
  });
});

module.exports = router;
