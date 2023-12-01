function filterCart(data, cart, { minQuantity } = { minQuantity: 1 }) {
  let filteredData = [];
  for (const itemFromData of data) {
    let isInCart = false;

    for (const itemFromCart of cart) {
      if (itemFromData.id === itemFromCart.stockId) {
        isInCart = true;
        break;
      }
    }

    if (!isInCart && itemFromData.quantity >= minQuantity) {
      filteredData.push(itemFromData);
    }
  }
  return filteredData;
}

export default filterCart;
