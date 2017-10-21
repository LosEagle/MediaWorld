export default class Helper {
    detectEnvironment() {
        if (global.process.resourcesPath.match(/node_modules/) !== null)
            return "development";
        else if (global.process.resourcesPath.match(/node_modules/) === null)
            return "production";
        else
            throw "err @ Helper | detectEnvironment";
    }

    stripParagraphs(string) {
        if (!string) return;
        return string.replace(/<p>/g, "").replace(/<\/p>/g, "");
    }
}