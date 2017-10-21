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
                            <input id="name" type="text" className="validate" ref={ (name) => { this.name = name; } }/>
                            <label ref={ (nameLabel) => { this.nameLabel = nameLabel; } } htmlFor="name">Show name</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="season" type="number" className="validate" ref={ (season) => { this.season = season; } }/>
                            <label ref={ (seasonLabel) => { this.seasonLabel = seasonLabel; } } htmlFor="season">Season</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="episode" type="number" className="validate" ref={ (episode) => { this.episode = episode; } }/>
                            <label ref={ (episodeLabel) => { this.episodeLabel = episodeLabel; } } htmlFor="episode">Episode</label>
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
        const name = this.name.value;
        const season = this.season.value;
        const episode = this.episode.value;

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
        const name = this.name;
        const season = this.season;
        const episode = this.episode;
        const nameL = this.nameLabel;
        const seasonL = this.seasonLabel;
        const episodeL = this.episodeLabel;

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