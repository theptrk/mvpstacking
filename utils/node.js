function translateObjValues(obj, fn) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = fn(obj[key])
    return acc
  }, {});
}
function translateObjKeys(obj, dict) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[dict[key]] = obj[key]
    return acc
  }, {});
}
