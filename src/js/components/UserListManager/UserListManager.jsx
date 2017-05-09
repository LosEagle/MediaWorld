import React from "react";
import "./userListManager.sass";
import * as global from "../../app/global";
import IO from "../../app/IO";
import ShowAPI from "../../app/ShowAPI";

const io = new IO;
const show = new ShowAPI;

class UserListManager extends React.Component {
    constructor() {
        super();

        this.state = {
            collection: [],
            entryData: {},
            releaseDates: []
        };
    }

    componentWillMount() {
        this.state.entryData = io.readJSON(global.userItems);
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
        let currentCollection = this.state.entryData;

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

        let index = e.target.getAttribute("data-entry");
        const entryData = this.state.entryData;
        let entry = entryData[index];
        let season;

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

        let index = e.target.getAttribute("data-entry");
        const entryData = this.state.entryData;
        let entry = entryData[index];
        let episode;

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
        const entryData = this.state.entryData;
        let temp = [];

        if (!entry) {
            show.getMultipleEpisodes(entryData).then((result) => {
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

            show.getEpisode(entryData[entry].name, entryData[entry].season, entryData[entry].episode).then((result) => {
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