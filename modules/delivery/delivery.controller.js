const util = require("util");
const fd = require("../file/data");
const ch = require("../utility/billing");
const dc = require("../utility/duplicateCheck");

//enable log
const SHOW_DEBUG_LOG = true;
//Show log
const log = (text) => SHOW_DEBUG_LOG && console.log("Log => ", text);
//Function to inspect a variable

// Function to display a variable
const displayVar = (t, v) =>
  SHOW_DEBUG_LOG && console.log(`${t}:\n`, util.inspect(v, false, null, true));

// Main function
const solution = () => {
  log("start of solution");

  const data = fd.fileData();

  const {
    origin_addresses: originAddresses,
    destination_addresses: destinationAddresses,
    rows: distances,
    customers,
  } = data;

  const solution = [];

  dc.identifySameOrigins(distances);

  //maximum Route Length in meters
  const maxRouteLength = 8046 + 8046 * 0.3;

  /* Op Object */
  const calculations = {
    store: distances[0].elements,
    customers: destinationAddresses.length,
    origins: originAddresses.length,
    customersRemaining: destinationAddresses.length,

    rider: 1,
    prevDistance: 0,
    prevCustomer: 0,

    deliveryRoutes: [],
    currentRoute: [],
  };

  // Magic
  while (calculations.customersRemaining > 0) {
    // case 1
    if (calculations.prevDistance === 0) {
      let closest = 0;
      for (let i = 0; i < calculations.customers; i += 1) {
        if (
          calculations.customersRemaining < 2 &&
          !calculations.store[i].allocated
        ) {
          closest = i;
        } else if (
          calculations.store[closest].distance.value >=
            calculations.store[i].distance.value &&
          calculations.store[i].allocated !== true
        ) {
          closest = i;
        }
      }
      log(closest);
      calculations.store[closest].allocated = true;
      calculations.store[closest].rider = calculations.rider;
      calculations.prevDistance = calculations.store[closest].distance.value;

      const routeObject = {};
      routeObject.customer = customers[closest];
      routeObject.deliveryCharges = ch.charges(
        calculations.store[closest].distance.value
      );
      routeObject.path = `${calculations.store[closest].distance.value} meters from Store to ${customers[closest]}.`;

      calculations.currentRoute.push(routeObject);
      calculations.customersRemaining -= 1;

      calculations.prevCustomer = closest;
    }

    // case 2
    else if (calculations.prevDistance > 0) {
      if (
        calculations.prevDistance < maxRouteLength &&
        calculations.customersRemaining
      ) {
        let closest = calculations.prevCustomer;
        for (let i = 0; i < calculations.customers; i += 1) {
          if (
            calculations.customersRemaining < 2 &&
            !calculations.store[i].allocated
          ) {
            closest = i;
          } else if (
            calculations.store[closest].distance.value >=
              calculations.store[i].distance.value &&
            calculations.store[i].allocated !== true
          ) {
            closest = i;
          }
        }
        log(closest);
        calculations.store[closest].allocated = true;
        calculations.store[closest].rider = calculations.rider;
        calculations.prevDistance = calculations.store[closest].distance.value;

        const routeObject = {};
        routeObject.customer = customers[closest];
        routeObject.deliveryCharges = ch.charges(
          calculations.store[closest].distance.value
        );
        routeObject.path = `${calculations.store[closest].distance.value} meters from Store to ${customers[closest]}.`;

        calculations.currentRoute.push(routeObject);
        calculations.customersRemaining -= 1;

        calculations.prevCustomer = closest;
      } else {
        calculations.rider += 1;
        calculations.deliveryRoutes.push({
          totalLength: `${calculations.prevDistance} meters from Store.`,
          route: calculations.currentRoute,
        });
        calculations.prevDistance = 0;
        calculations.currentRoute = [];
      }
    }

    //case 3
    if (calculations.customersRemaining < 1) {
      calculations.deliveryRoutes.push({
        totalLength: `${calculations.prevDistance} meters from Store.`,
        route: calculations.currentRoute,
      });
      calculations.currentRoute = [];
    }
  }
  displayVar(solution, calculations.deliveryRoutes);
  log("end of solution");
};

module.export = solution;
