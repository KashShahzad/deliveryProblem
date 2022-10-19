// Marking the same origin, same destination distances
const identifySameOrigins = (distances) => {
  distances.map((item, index) => {
    const similarItem = item;
    if (index > 0) similarItem.elements[index - 1].sameOrigin = true;
    return similarItem;
  });
};

module.export = identifySameOrigins;
