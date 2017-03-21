import React from "react";

const fs = window.require("fs");
const global = require("../app/global");
import IO from "../app/IO";

const UserListRemove = React.createClass({
    getInitialState: function() {
        return {
            collection: []
        };
    },

    componentDidMount: function() {
        this.createCollectionArray();
    },

    render: function() {
        return (
            <div className="row">
                <ul className="collection col s12">
                    {this.state.collection}
                </ul>
            </div>
        );
    },

    createCollectionArray: function() {
        const io = new IO;
        let currentCollection = io.readJSON(global.userItems);

        if (currentCollection === "") return;

        currentCollection = currentCollection.map((item, i) => {
            return (
                <li key={i} className="collection-item">
                    <strong>{item.name}</strong> Season:{item.season} Episode:{item.episode}
                    <a href="#" className="secondary-content">
                        <i onClick={this.handleItemRemove} data-entry={i} className="fa fa-times"></i>
                    </a>
                </li>
            );
        });

        this.setState({collection: currentCollection});
    },

    handleItemRemove: function(e) {
        e.preventDefault();

        const io = new IO;
        let currentCollection = this.state.collection;
        let index = e.target.getAttribute("data-entry");

        io.removeJSONEntry(global.userItems, index);
        currentCollection.splice(index, 1);

        this.setState({collection: currentCollection});
    }
});

module.exports = UserListRemove;