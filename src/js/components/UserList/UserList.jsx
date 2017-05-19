import React from "react";
import * as _ from "lodash";
import * as global from "../../app/global";
import IO from "../../app/IO";

const io = new IO;

class UserList extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <form onSubmit={this.handleUserListForm.bind(this)} className="col s12">
                    <div className="row">
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
    }

    handleUserListForm(event) {
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
        io.append(global.userItems, finalJson);
    }
}

module.exports = UserList;