// apps/pedidos/controller/ctlPedidos.js
const mdlPedidos = require("../model/mdlPedidos");

const getAllPedidos = (req, res) =>
  (async () => {
    let registro = await mdlPedidos.getAllPedidos();
    // Formatando a data, assim como no controller de alunos
    registro.forEach(row => {
      if (row.data) {
        row.data = row.data.toISOString().split('T')[0];
      }
    });
    res.json({ status: "ok", registro: registro });
  })();

const getPedidoByID = (req, res) =>
  (async () => {
    const pedidoID = parseInt(req.body.pedidoid);
    let registro = await mdlPedidos.getPedidoByID(pedidoID);
    res.json({ status: "ok", registro: registro });
  })();

const insertPedidos = (req, res) =>
  (async () => {
    const pedidoREG = req.body;
    let { msg, linhasAfetadas } = await mdlPedidos.insertPedidos(pedidoREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const updatePedidos = (req, res) =>
  (async () => {
    const pedidoREG = req.body;
    let { msg, linhasAfetadas } = await mdlPedidos.updatePedidos(pedidoREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const deletePedidos = (req, res) =>
  (async () => {
    const pedidoREG = req.body;
    let { msg, linhasAfetadas } = await mdlPedidos.deletePedidos(pedidoREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

module.exports = {
  getAllPedidos,
  getPedidoByID,
  insertPedidos,
  updatePedidos,
  deletePedidos,
};