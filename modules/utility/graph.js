const logger = require("util.log");

const routeDef = (storeMap, customer, customersRemaining, memo = {}) => {
  if (storeMap in memo) return memo.storeMap;

  const log = logger.instance();

  if (orders === {}) return log.info("No data");

  const result = {
    path: [],
    value: 0,
  };

  while (storeMap) {
    if (customersRemaining < 1) {
      result.path[customer[customersRemaining]];
      result.value = storeMap[customersRemaining].distance.value;
    } else if (customersRemaining > 1) {
      const paths = [];
      const values = 0;
      for (i in customersRemaining) {
        paths.push([customer[customersRemaining]]);
        values += storeMap[customersRemaining].distance.value;
      }
      result.path = paths;
      result.value = values;
    }
  }

  memo[storeMap] = result;
  return result;
};

module.export = routeDef;
