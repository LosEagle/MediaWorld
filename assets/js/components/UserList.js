import React from "react";

const fs = window.require("fs");
const _  = require("lodash");
const global = require("../app/global");
import IO from "../app/IO";

const UserList = React.createClass({
    render: function() {
        return (
            <div className="row">
                <form onSubmit={this.handleUserListForm} className="col s12">
                    <div className="row">
                        <div className="col s12">
                            <h1>Add show to watchlist</h1>
                        </div>
                        <div className="input-field col s12">
                            <input id="name" type="text" className="validate" ref="name"/>
                            <label htmlFor="name">Show name</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="season" type="number" className="validate" ref="season"/>
                            <label htmlFor="season">Season</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="episode" type="number" className="validate" ref="episode"/>
                            <label htmlFor="episode">Episode</label>
                        </div>
                        <div className="col s12">
                            <button className="btn waves-effect waves-light" type="submit" name="action">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    },

    handleUserListForm: function(event) {
        let io = new IO;
        let name = this.refs.name.value;
        let season = this.refs.season.value;
        let episode = this.refs.episode.value;

        event.preventDefault();

        if (name === "" || season === "" || episode === "") {
            Materialize.toast("Please fill all form fields", 4000);
            return;
        }

        let finalJson = [{
            "name": name,
            "season": season,
            "episode": episode
        }];

        io.createFileIfNotExists(global.userItems);
        io.writeJSON(global.userItems, finalJson);
    }
});

module.exports = UserList;