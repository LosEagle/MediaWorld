import React from "react";

const fs = window.require("fs");
const _  = require("lodash");

const UserList = React.createClass({
    getInitialState: function() {
        return {
            jsonList: "",
            listPath: "./assets/data/list.json"
        };
    },

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

        this.checkListExistence();
        this.listInput();
        this.listOutput(this.state.jsonList, finalJson);
    },

    checkListExistence: function() {
        if (!fs.existsSync(this.state.listPath)) {
            fs.openSync(this.state.listPath, "w");
        }
    },

    listInput: function() {
        let data = fs.readFileSync(this.state.listPath, "utf8");

        if (data === "")
            this.state.jsonList = data;
        else
            this.state.jsonList = JSON.parse(data);
    },

    listOutput: function(currentJson, formValues) {
        let finalValue;

        if (currentJson !== "")
            finalValue = _.concat(currentJson, formValues);
        else
            finalValue = formValues;

        finalValue = JSON.stringify(finalValue, null, 4);

        fs.writeFile(this.state.listPath, finalValue, (err) => {
            if (err)
                throw err;
        });
    }
});

module.exports = UserList;