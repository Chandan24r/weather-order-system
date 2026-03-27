const fs = require("fs");

function loadOrders() {
  const data = fs.readFileSync("orders.json", "utf-8");
  return JSON.parse(data);
}

function saveOrders(orders) {
  const formatted = JSON.stringify(orders, null, 2);
  fs.writeFileSync("orders.json", formatted);
}

module.exports = { loadOrders, saveOrders };