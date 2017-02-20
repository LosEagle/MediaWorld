import React from "react";

const fs = window.require("fs");
const global = require("../app/global");
import IO from "../app/IO";

const UserListRemove = React.createClass({
    render: function() {
        let connection = [];

        connection = this.createCollectionArray();

        return (
            <div className="row">
                {connection}
            </div>
        );
    },

    createCollectionArray: function() {
        let collectionArray = [];
        let currentObject;
        const io = new IO;

        let JSONList = io.readJSON(global.userItems);

        for (let i = 0; i <= JSONList.length - 1; i++) {
            currentObject = JSONList[i];

            collectionArray.push(
                <li key={i} className="collection-item">
                    {currentObject.name} Season:{currentObject.season} Episode:{currentObject.episode}
                    <a href="#" onClick={this.handleItemRemove} className="secondary-content">
                        <i data-entry={i} className="fa fa-times"></i>
                    </a>
                </li>
            );
        }

        return (
            <ul className="collection col s12">
                {collectionArray}
            </ul>
        );
    },

    handleItemRemove: function(e) {
        e.preventDefault();

        const io = new IO;

        io.removeJSONEntry(global.userItems, e.target.getAttribute("data-entry"));
    }
});

module.exports = UserListRemove;