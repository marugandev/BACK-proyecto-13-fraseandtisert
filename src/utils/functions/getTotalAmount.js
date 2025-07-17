const getTotalAmount = (items) => {
  return items.reduce((sum, item) => {
    const discountFactor = 1 - (item.discount ?? 0) / 100;
    const unitPrice = item.price * discountFactor;
    const subtotalPrice = unitPrice * item.quantity;
    return sum + subtotalPrice;
  }, 0);
};

module.exports = getTotalAmount;
