import * as fs from "fs";
import * as _  from "lodash";

export default class IO {
    createFileIfNotExists(path) {
        if (!fs.existsSync(path)) {
            fs.openSync(path, "w");
            return true;
        }
        return false;
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
        let currentJSON = this.read(path);
        entryIndex = parseInt(entryIndex);

        currentJSON[entryIndex] = entry;
        currentJSON = JSON.stringify(currentJSON, null, 4);

        fs.writeFile(path, currentJSON, (err) => {
            if (err)
                throw err;
        });
    }

    write(path, object) {
        object = JSON.stringify(object, null, 4);

        fs.writeFile(path, object, (err) => {
            if (err)
                throw err;
        });
    }

    writeStrSync(path, string) {
        fs.writeFile(path, string, (err) => {
            if (err)
                throw err;
        });
    }
}