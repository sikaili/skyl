export default function mergeObjects(obj1, obj2) {
  var obj = Array.isArray(obj1) ? [] : typeof obj1 === "object" ? {} : "";
  for (var key in obj1) {
    if (typeof obj2[key] === "object") {
      obj[key] = mergeObjects(obj1[key], obj2[key]);
    } else if (typeof obj2[key] !== "undefined") {
      obj[key] = obj2[key];
    } else {
      obj[key] = obj1[key];
    }
  }
  return obj;
}
