import React from "react";

const fs = window.require("fs");
const global = require("../app/global");
import IO from "../app/IO";

const UserListRemove = React.createClass({
    render: function() {
        let collection = [];

        collection = this.createCollectionArray();

        return (
            <div className="row">
                {collection}
            </div>
        );
    },

    createCollectionArray: function() {
        const io = new IO;

        let collection = io.readJSON(global.userItems);

        collection = collection.map((item, i) => {
            return (
                <li key={i} className="collection-item">
                    <strong>{item.name}</strong> Season:{item.season} Episode:{item.episode}
                    <a href="#" onClick={this.handleItemRemove} className="secondary-content">
                        <i data-entry={i} className="fa fa-times"></i>
                    </a>
                </li>
            );
        });

        return (
            <ul className="collection col s12">
                {collection}
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