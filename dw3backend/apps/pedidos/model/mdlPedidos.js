// apps/pedidos/model/mdlPedidos.js
const db = require("../../../database/databaseconfig");

const getAllPedidos = async () => {
  // Usei JOIN para buscar o nome do cliente, similar ao que você fez com cursos
  return (
    await db.query(
      `SELECT p.*, c.nome as nome_cliente 
       FROM pedidos p 
       JOIN clientes c ON p.clienteid = c.clienteid 
       WHERE p.deleted = false 
       ORDER BY p.data DESC`
    )
  ).rows;
};

const getPedidoByID = async (pedidoIDPar) => {
  return (
    await db.query(
      `SELECT p.*, c.nome as nome_cliente 
       FROM pedidos p 
       JOIN clientes c ON p.clienteid = c.clienteid 
       WHERE p.pedidoid = $1 AND p.deleted = false`,
      [pedidoIDPar]
    )
  ).rows;
};

const insertPedidos = async (pedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO pedidos values(default, $1, $2, $3, $4, default)",
        [
          pedidoREGPar.numero,
          pedidoREGPar.data,
          pedidoREGPar.valortotal,
          pedidoREGPar.clienteid,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|insertPedidos] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const updatePedidos = async (pedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        `UPDATE pedidos SET 
           numero = $2, 
           data = $3, 
           valortotal = $4, 
           clienteid = $5 
         WHERE pedidoid = $1`,
        [
          pedidoREGPar.pedidoid,
          pedidoREGPar.numero,
          pedidoREGPar.data,
          pedidoREGPar.valortotal,
          pedidoREGPar.clienteid,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|updatePedidos] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const deletePedidos = async (pedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query("UPDATE pedidos SET deleted = true WHERE pedidoid = $1", [
        pedidoREGPar.pedidoid,
      ])
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|deletePedidos] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

module.exports = {
  getAllPedidos,
  getPedidoByID,
  insertPedidos,
  updatePedidos,
  deletePedidos,
};