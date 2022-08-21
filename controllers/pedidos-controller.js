const mysql = require("../mysql").pool;

//------------------------METODOS

exports.getPedidos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      `SELECT pedidos.id_pedidos,
                          pedidos.quantidade,
                          produtos.id_produto,
                          produtos.nome,
                          produtos.preco
                  FROM pedidos
                  INNER JOIN produtos
                  ON produtos.id_produto = pedidos.id_produto`,
      (error, result, field) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        const response = {
          pedidos: result.map((ped) => {
            return {
              id_pedido: ped.id_pedidos,
              quantidade: ped.quantidade,
              produto: {
                id_produto: ped.id_produto,
                nome: ped.nome,
                preco: ped.preco,
              },
              request: {
                tipo: "GET",
                descricao: "Retorna detalhes do pedido",
                url: "http://localhost:3000/pedidos/" + ped.id_pedidos,
              },
            };
          }),
        };

        return res.status(200).send(response);
      }
    );
  });
};

exports.getPedidoId = (req, res, next) => {
  const id = req.params.id_pedido;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query(
      "SELECT * FROM pedidos WHERE id_pedidos = ?",
      [id],
      (error, result, field) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        if (result.length === 0) {
          return res.status(404).send({
            mensagem: "Não foi encontrado pedido com esse ID",
          });
        }

        const response = {
          pedido: {
            id_pedido: id,
            quantidade: result[0].quantidade,
            id_produto: result[0].id_produto,
            request: {
              tipo: "GET",
              descricao: "Retorna todos os pedidos",
              url: "http://localhost:3000/pedidos/",
            },
          },
        };

        return res.status(200).send(response);
      }
    );
  });
};

exports.postPedido = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO pedidos (id_produto, quantidade) VALUES (?, ?)",
      [req.body.id_produto, req.body.quantidade],
      (error, result, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        console.log(result);

        const response = {
          mensagem: "Pedido inserido com sucesso",
          pedidoCriado: {
            id_pedido: result.insertId,
            quantidade: req.body.quantidade,
            id_produto: req.body.id_produto,
            request: {
              tipo: "GET",
              descricao: "Retorna todos os pedidos",
              url: "http://localhost:3000/pedidos/",
            },
          },
        };

        res.status(201).send(response);
      }
    );
  });
};

exports.patchPedido = (req, res, next) => {
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
      (error, result, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        const response = {
          mensagem: "Pedido atualizado com sucesso",
          pedidoAtualizado: {
            id_pedido: req.params.id_pedido,
            id_produto: req.body.id_produto,
            quantidade: req.body.quantidade,
            request: {
              tipo: "GET",
              descricao: "Retorna detalhes do pedido",
              url: "http://localhost:3000/pedidos/" + req.params.id_pedido,
            },
          },
        };

        res.status(202).send(response);
      }
    );
  });
};

exports.deletePedido = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM pedidos WHERE id_pedidos = ?",
      [req.params.id_pedido],
      (error, result, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        const response = {
          mensagem: "Pedido removido com sucesso",
          request: {
            tipo: "POST",
            descricao: "Insere um pedido",
            url: "http://localhost:3000/pedidos",
            body: {
              id_produto: "Number",
              quantidade: "Number",
            },
          },
        };

        res.status(202).send(response);
      }
    );
  });
};
