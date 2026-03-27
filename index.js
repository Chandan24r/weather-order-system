require("dotenv").config();

const { loadOrders, saveOrders } = require("./utils/storage");
const { fetchWeather } = require("./services/weather");
const { buildMessage } = require("./services/message");

const API_KEY = process.env.API_KEY;

function isBadWeather(condition) {
  const text = condition.toLowerCase();
  return (
    text.includes("rain") ||
    text.includes("snow") ||
    text.includes("storm")
  );
}

async function runWorkflow() {
  const orders = loadOrders();

  console.time("Execution Time");

  const updatedOrders = await Promise.all(
    orders.map(async (order) => {
      console.log(`Processing Order: ${order.order_id}`);

      const weather = await fetchWeather(order.city, API_KEY);

      console.log(`${order.city} → ${weather}`);

      if (!weather) return order;

      if (isBadWeather(weather)) {
        order.status = "Delayed";
        order.message = buildMessage(
          order.customer,
          order.city,
          weather
        );
        console.log(`⚠️ Order ${order.order_id} delayed`);
      }

      return order;
    })
  );

  saveOrders(updatedOrders);

  const delayed = updatedOrders.filter(o => o.status === "Delayed").length;
  const total = updatedOrders.length;

  console.log(`\n📊 Summary:`);
  console.log(`Total Orders: ${total}`);
  console.log(`Delayed Orders: ${delayed}`);

  console.timeEnd("Execution Time");

  console.log("✔ Workflow completed successfully!");
}

runWorkflow();