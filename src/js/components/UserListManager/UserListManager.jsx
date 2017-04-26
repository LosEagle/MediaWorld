import React from "react";
import "./userListManager.sass";
import * as global from "../../app/global";
import * as axios from "axios";
import IO from "../../app/IO";

const io = new IO;

class UserListManager extends React.Component {
    constructor() {
        super();

        this.state = {
            collection: [],
            list: {},
            releaseDates: []
        };
    }

    componentWillMount() {
        this.state.list = io.readJSON(global.userItems);
        this.renderWithDates();
        this.createEntryRows();
    }

    componentWillUnmount() {
        let tooltips = document.querySelectorAll(".material-tooltip");

        for (let tooltip of tooltips) {
            tooltip.remove();
        }
    }

    render() {
        $(".tooltipped").tooltip();

        return (
            <div className="row userListManager">
                <table className="highlight centered col s12">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Season</th>
                            <th>Episode</th>
                            <th>Release</th>
                            <th>Interactions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.collection}
                    </tbody>
                </table>
            </div>
        );
    }

    createEntryRows() {
        let currentCollection = this.state.list;

        if (currentCollection === "") return;

        currentCollection = currentCollection.map((item, i) => {
            return (
                <tr key={i}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.season}</td>
                    <td>{item.episode}</td>
                    <td>{this.state.releaseDates[i]}</td>
                    <td className="iconContainer">
                        <a href="#userlistmanager" className="tooltipped iconContainer__icon" data-position="top" data-delay="50" data-tooltip="Increment season"><i onClick={this.handleSeasonInteraction.bind(this)} data-mode="increment" data-entry={i} className="fa fa-plus"></i></a>
                        <a href="#userlistmanager" className="tooltipped iconContainer__icon" data-position="top" data-delay="50" data-tooltip="Decrement season"><i onClick={this.handleSeasonInteraction.bind(this)} data-mode="decrement" data-entry={i} className="fa fa-minus"></i></a>
                        <a href="#userlistmanager" className="tooltipped iconContainer__icon" data-position="top" data-delay="50" data-tooltip="Increment episode"><i onClick={this.handleEpisodeInteraction.bind(this)} data-mode="increment" data-entry={i} className="fa fa-plus"></i></a>
                        <a href="#userlistmanager" className="tooltipped iconContainer__icon" data-position="top" data-delay="50" data-tooltip="Decrement episode"><i onClick={this.handleEpisodeInteraction.bind(this)} data-mode="decrement" data-entry={i} className="fa fa-minus"></i></a>
                        <a href="#userlistmanager" className="tooltipped iconContainer__icon" data-position="top" data-delay="50" data-tooltip="Remove entry"><i onClick={this.handleItemRemove.bind(this)} data-entry={i} className="fa fa-times"></i></a>
                    </td>
                </tr>
            );
        });

        this.setState({collection: currentCollection});
    }

    handleItemRemove(e) {
        e.preventDefault();

        let currentCollection = this.state.collection;
        let index = e.target.getAttribute("data-entry");

        io.removeJSONEntry(global.userItems, index);
        currentCollection.splice(index, 1);

        this.setState({collection: currentCollection});
    }

    handleSeasonInteraction(e) {
        e.preventDefault();

        const mode = e.target.getAttribute("data-mode");

        const childOverrideIndex = 1;
        let index = e.target.getAttribute("data-entry");
        let list = this.state.list;
        let entry = list[index];
        let season;
        let currentCollection = this.state.collection;

        season = parseInt(entry.season);

        if (mode === "increment")
            season += 1;
        else if (mode === "decrement")
            season -= 1;
        else
            throw "data-mode not set in interaction";

        season = season.toString();
        entry.season = season;

        io.changeEntry(global.userItems, index, entry);

        this.renderWithDates(index);
    }

    handleEpisodeInteraction(e) {
        e.preventDefault();

        const mode = e.target.getAttribute("data-mode");

        const childOverrideIndex = 2;
        let index = e.target.getAttribute("data-entry");
        let list = this.state.list;
        let entry = list[index];
        let episode;
        let currentCollection = this.state.collection;

        episode = parseInt(entry.episode);

        if (mode === "increment")
            episode += 1;
        else if (mode === "decrement")
            episode -= 1;
        else
            throw "data-mode not set in interaction";

        entry.episode = episode.toString();

        io.changeEntry(global.userItems, index, entry);

        this.renderWithDates(index);
    }

    renderWithDates(entry) {
        let list = this.state.list;
        let temp = [];

        if (!entry) {
            let tempPromise = [];

            Object.keys(list).forEach((key, index) => {
                tempPromise.push(axios.get(`http://www.omdbapi.com/?t=${list[index].name}&Season=${list[index].season}&Episode=${list[index].episode}`));
            });

            axios.all(tempPromise).then((result) => {
                result.forEach((key, index) => {
                    if (result[index].data.Error)
                        temp.push(result[index].data.Error);
                    else
                        temp.push(result[index].data.Released);
                });

                this.setState({releaseDates: temp});
                this.createEntryRows();
            });
        } else {
            let prevReleaseDates = this.state.releaseDates;
            temp = prevReleaseDates;

            axios.get(`http://www.omdbapi.com/?t=${list[entry].name}&Season=${list[entry].season}&Episode=${list[entry].episode}`).then((result) => {
                if (result.data.Error)
                    temp[entry] = result.data.Error;
                else
                    temp[entry] = result.data.Released;

                this.setState({releaseDates: temp});
                this.createEntryRows();
            });
        }
    }
}

module.exports = UserListManager;