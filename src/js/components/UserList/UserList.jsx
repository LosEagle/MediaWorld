import React from "react";
import * as global from "../../app/global";
import IO from "../../app/IO";

const io = new IO;

export default class UserList extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <form onSubmit={this.handleFormSubmit.bind(this)} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="name" type="text" className="validate" ref="name"/>
                            <label ref="nameLabel" htmlFor="name">Show name</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="season" type="number" className="validate" ref="season"/>
                            <label ref="seasonLabel" htmlFor="season">Season</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="episode" type="number" className="validate" ref="episode"/>
                            <label ref="episodeLabel" htmlFor="episode">Episode</label>
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

    handleFormSubmit(event) {
        const name = this.refs.name.value;
        const season = this.refs.season.value;
        const episode = this.refs.episode.value;

        event.preventDefault();

        if (name === "" || season === "" || episode === "") {
            Materialize.toast("Please fill all form fields", 4000);
            return;
        }

        const finalJson = [{
            "name": name,
            "season": season,
            "episode": episode
        }];

        io.append(global.userItems, finalJson);
        this.clearForm();
        Materialize.toast("Show added successfully.", 5000);
    }

    clearForm() {
        const name = this.refs.name;
        const season = this.refs.season;
        const episode = this.refs.episode;
        const nameL = this.refs.nameLabel;
        const seasonL = this.refs.seasonLabel;
        const episodeL = this.refs.episodeLabel;

        name.value = "";
        season.value = "";
        episode.value = "";

        name.classList.remove("valid");
        season.classList.remove("valid");
        episode.classList.remove("valid");

        nameL.classList.remove("active");
        seasonL.classList.remove("active");
        episodeL.classList.remove("active");
    }
}