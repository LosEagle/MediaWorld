import React from "react";
import { remote } from "electron";
import IO from "../../app/IO";
import * as global from "../../app/global";
import "./importExport.sass";

const io = new IO;

export default class ImportExport extends React.Component {
    render() {
        return (
            <div className="importExport row">
                <div className="col s12 guide">
                    <blockquote>Please keep in mind that import will <strong>replace</strong> your current entries.
                        If you need to keep your data, make backup via export or use merge instead.</blockquote>
                </div>
                <div className="col s6 guide">
                    <div className="guide__heading">Import shows:</div>
                    <button onClick={this.importHandler.bind(this)} className="button btn waves-effect waves-light" type="button">
                        <i className="fa fa-upload"></i> Import
                    </button>
                </div>
                <div className="col s6 guide">
                    <div className="guide__heading">Export shows:</div>
                    <button onClick={this.exportHandler.bind(this)} className="button btn waves-effect waves-light" type="button">
                        <i className="fa fa-download"></i> Export
                    </button>
                </div>
                <div className="col s6 guide">
                    <div className="guide__heading">Merge shows:</div>
                    <button onClick={this.mergeHandler.bind(this)} className="button btn waves-effect waves-light" type="button">
                        <i className="fa fa-compress"></i> Merge
                    </button>
                </div>
            </div>
        );
    }

    importHandler() {
        let path = remote.dialog.showOpenDialog();

        if (typeof path === "undefined") return;

        if (this.getFileExtension(path) === ".json") {
            path = path.toString();
            let contents = io.read(path);

            io.write(global.userItems, contents);
        } else if (this.getFileExtension(path) !== ".json") {
            Materialize.toast("You must choose .json file!", 4000);
        }
    }

    exportHandler() {
        const path = remote.dialog.showSaveDialog({defaultPath: "mediaworld-export.json"});

        if (typeof path === "undefined") return;

        const contents = io.read(global.userItems);

        io.write(path, contents);
    }

    mergeHandler() {
        let path = remote.dialog.showOpenDialog();

        if (typeof path === "undefined") return;

        if (this.getFileExtension(path) === ".json") {
            path = path.toString();
            let contents = io.read(path);

            io.append(global.userItems, contents);
        } else if (this.getFileExtension(path) !== ".json") {
            Materialize.toast("You must choose .json file!", 4000);
        }
    }

    getFileExtension(path) {
        if (undefined) return;

        const extRegex = /\.[0-9a-z]+$/i;
        let extension;

        path = path.toString();
        extension = path.match(extRegex)[0];

        return extension;
    }
}