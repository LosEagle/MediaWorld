import React from "react";

const fs = window.require("fs");
const _  = require("lodash");

const UserList = React.createClass({
    getInitialState: function() {
        return {
            jsonList: "initialState",
            listPath: "./assets/data/list.json"
        };
    },

    render: function() {
        return (
            <div className="row">
                <form onSubmit={this.handleUserListForm} className="col s12">
                    <div className="row">
                        <div className="col s12">
                            <h1>ListComponent</h1>
                        </div>
                        <div className="input-field col s12">
                            <input id="name" type="text" className="validate" ref="name"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="s" type="number" className="validate" ref="s"/>
                            <label htmlFor="s">S</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="e" type="number" className="validate" ref="e"/>
                            <label htmlFor="e">E</label>
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
        let s = this.refs.s.value;
        let e = this.refs.e.value;

        event.preventDefault();

        if (name === "" || s === "" || e === "") {
            Materialize.toast("Please fill all form fields", 4000);
            return;
        }

        let finalJson = [{
            "name": name,
            "s": s,
            "e": e
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
        let self = this;
        let data = fs.readFileSync(this.state.listPath, "utf8");

        if (data === "") {
            data = [{}];
            this.state.jsonList = data;
        } else {
            this.state.jsonList = JSON.parse(data);
        }
    },

    listOutput: function(currentJson, formValues) {
        let finalValue = _.concat(currentJson, formValues);
        finalValue = JSON.stringify(finalValue, null, 4);

        fs.writeFile(this.state.listPath, finalValue, (err) => {
            if (err)
                throw err;
        });
    }
});

module.exports = UserList;