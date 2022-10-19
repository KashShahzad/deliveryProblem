const util = require("util");
const fd = require("../file/data");
const ch = require("../utility/billing");
const dc = require("../utility/duplicateCheck");
const graph = require("../utility/graph");

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
    storeToCustomers: distances[0].elements,
    customers: destinationAddresses,
    customersRemaining: destinationAddresses.length,

    currentRoute: [],
  };

  // logic
  while (customersRemaining > 0) {
    const result = graph.routeDef(
      calculations.storeToCustomers,
      calculations.customers,
      calculations.customersRemaining[i]
    );

    const routeObject = {};
    routeObject.customer = customers[i];
    routeObject.deliveryCharges = ch.charges(result.value);
    routeObject.path = `${result.path}`;

    calculations.currentRoute.push(routeObject);
    calculations.customersRemaining -= 1;
  }

  return displayVar(solution, calculations.currentRoute);
};

module.export = solution;
