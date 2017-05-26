import Helper from "./Helper";

const h = new Helper;

export let userItems;

if (h.detectEnvironment() === "development") {
    userItems = "./src/data/list.json";
} else if (h.detectEnvironment() === "production") {
    userItems = global.process.resourcesPath + "/app/src/data/list.json";
} else {
    throw `global | userItems: ${userItems}`;
}

export const settings = "./src/data/settings.json";