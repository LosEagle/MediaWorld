import Helper from "./Helper";

const h = new Helper;

export let userItems;
export let settings;

if (h.detectEnvironment() === "development") {
    userItems = "./src/data/list.json";
    settings = "./src/data/settings.json";
} else if (h.detectEnvironment() === "production") {
    userItems = global.process.resourcesPath + "/app/src/data/list.json";
    settings = global.process.resourcesPath + "/app/src/data/settings.json";
} else {
    throw "Can't detect environment";
}