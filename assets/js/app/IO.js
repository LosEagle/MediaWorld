const fs = window.require("fs");
const _  = require("lodash");

export default class IO {
    createFileIfNotExists(path) {
        if (!fs.existsSync(path)) {
            fs.openSync(path, "w");
        }
    }

    readJSON(path) {
        let data = fs.readFileSync(path, "utf8");

        if (data === "")
            return data;
        else
            return JSON.parse(data);
    }

    writeJSON(path, JSONOutput) {
        let finalValue;
        let currentJSON = this.readJSON(path);

        if (currentJSON !== "")
            finalValue = _.concat(currentJSON, JSONOutput);
        else
            finalValue = JSONOutput;

        finalValue = JSON.stringify(finalValue, null, 4);

        fs.writeFile(path, finalValue, (err) => {
            if (err)
                throw err;
        });
    }

    removeJSONEntry(path, entry) {
        entry = parseInt(entry);
        let currentJSON = this.readJSON(path);

        currentJSON.splice(entry, 1);

        currentJSON = JSON.stringify(currentJSON, null, 4);

        fs.writeFile(path, currentJSON, (err) => {
            if (err)
                throw err;
        });
    }
}