function buildMessage(customer, city, condition) {
  return `Hi ${customer}, your order to ${city} is delayed due to ${condition}. We appreciate your patience!`;
}

module.exports = { buildMessage };