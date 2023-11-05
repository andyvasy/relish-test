/*
 Helper functions to supprt filtering
*/

const listToMap = (list) => {
  const map = new Map();
  list.forEach((item) => {
    map.set(item.id, item);
  });
  return map;
};

const likeFilter = (field, text) => (item) => {
  return (
    !text ||
    (item &&
      item[field] &&
      item[field].toLowerCase().indexOf(text.toLowerCase()) >= 0)
  );
};

const strictFilter = (field, value) => (item) => {
  return (
    !value ||
    (item && item[field] && item[field].toLowerCase() === value.toLowerCase())
  );
};

module.exports = {
  listToMap,
  likeFilter,
  strictFilter,
};
