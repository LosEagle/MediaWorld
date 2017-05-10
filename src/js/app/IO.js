import * as fs from "fs";
import * as _  from "lodash";

export default class IO {
    createFileIfNotExists(path) {
        if (!fs.existsSync(path)) {
            fs.openSync(path, "w");
        }
    }

    read(path) {
        let data = fs.readFileSync(path, "utf8");

        if (data === "")
            return data;
        else
            return JSON.parse(data);
    }

    append(path, output) {
        let finalValue;
        let currentJSON = this.read(path);

        if (currentJSON !== "")
            finalValue = _.concat(currentJSON, output);
        else
            finalValue = output;

        finalValue = JSON.stringify(finalValue, null, 4);

        fs.writeFile(path, finalValue, (err) => {
            if (err)
                throw err;
        });
    }

    removeEntry(path, entryIndex) {
        entryIndex = parseInt(entryIndex);
        let currentJSON = this.read(path);

        currentJSON.splice(entryIndex, 1);

        currentJSON = JSON.stringify(currentJSON, null, 4);

        fs.writeFile(path, currentJSON, (err) => {
            if (err)
                throw err;
        });
    }

    changeEntry(path, entryIndex, entry) {
        let currentJSON = this.read(path, entryIndex);
        entryIndex = parseInt(entryIndex);

        currentJSON[entryIndex] = entry;
        currentJSON = JSON.stringify(currentJSON, null, 4);

        fs.writeFile(path, currentJSON, (err) => {
            if (err)
                throw err;
        });
    }

    write(path, output) {
        output = JSON.stringify(output, null, 4);

        fs.writeFile(path, output, (err) => {
            if (err)
                throw err;
        });
    }
}