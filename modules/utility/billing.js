const charges = (routeLength) => {
  /* Distance in miles */
  const dist = parseFloat((routeLength / 1610).toFixed(2));

  let deliveryCharges = 7.0;

  deliveryCharges = parseFloat((dist + 1).toFixed(2));
  if (dist < 2.5) {
    deliveryCharges = 1.0;
  } else if (dist > 2.49 && dist < 5) {
    deliveryCharges = 2.0;
  } else if (dist > 4.99 && dist < 7) {
    deliveryCharges = 3.0;
  } else if (dist < 10.01) {
    deliveryCharges = 5;
  } else {
    deliveryCharges = 10;
  }

  return deliveryCharges;
};

module.export = charges;
