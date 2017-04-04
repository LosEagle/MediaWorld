export var userItems;

if (global.process.resourcesPath.match(/node_modules/) !== null) {
    userItems = "./assets/data/list.json";
} else if (global.process.resourcesPath.match(/node_modules/) === null) {
    userItems = global.process.resourcesPath + "/app/assets/data/list.json";
} else {
    throw `global.js | userItems: ${userItems}`;
}