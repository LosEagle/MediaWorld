import React from "react";

require("../../css/2-components/home.scss");

const fs = window.require("fs");
const axios = require("axios");
const global = require("../app/global.js");
import IO from "../app/IO";

const Home = React.createClass({
    getInitialState: function() {
        return {
            listPath: global.userItems,
            jsonList: "",
            omdbData: "",
            cards: ""
        };
    },

    componentWillMount: function() {
        let io = new IO;
        io.createFileIfNotExists(global.userItems);
    },

    componentDidMount: function() {
        this.readListContents();
    },

    render: function() {
        return (
            <div className="row">
                {this.state.cards}
            </div>
        );
    },

    readListContents: function() {
        const io = new IO;
        const data = io.readJSON(global.userItems);

        if (data.length === 0) {
            this.setState({
                cards: <div>
                            <div>
                                <strong>
                                        <i className="fa fa-exclamation-circle"></i> Your watchlist is empty.
                                </strong>
                            </div>
                            <div className="section">
                                Would you like to <a href="#userlist"><em>add</em></a> some entries?
                            </div>
                        </div>
            });
        } else {
            this.setState({jsonList: data}, () => {
                this.fetchEpisodeData();
            });
        }
    },

    fetchEpisodeData: function() {
        let list = this.state.jsonList;
        let data = [];
        let temp = [];
        let tempPromise = [];
        let item = 0;
        let currentData = {};
        let finalStateValue = {};

        Object.keys(list).forEach((key, index) => {
            tempPromise.push(axios.get(`http://www.omdbapi.com/?t=${list[index].name}&Season=${list[index].season}&Episode=${list[index].episode}`));
        });

        axios.all(tempPromise).then((result) => {

            result.forEach((key, index) => {
                item = result[index].data;
                currentData = this.state.omdbData;

                if (currentData !== "")
                    finalStateValue = _.concat(item, currentData);
                else
                    finalStateValue = Array(item);

                this.setState({omdbData: finalStateValue});
            });

            this.constructCardArray();
        });
    },

    constructCardArray: function() {
        let array = [];
        let currentObject = this.state.omdbData;

        if (!Array.isArray(currentObject)) return;

        currentObject = currentObject.map(function(item, i) {
            return (
                <div className="col s4" key={i}>
                    <div className="card small">
                        <div className="card-image">
                            <img className="activator" src={item.Poster === "N/A" ? "" : item.Poster} alt=""/>
                            <span className=""></span>
                        </div>
                        <div className="card-content">
                            <strong>{item.Title} | S{item.Season}E{item.Episode} | {item.Released}</strong>
                            <p>{item.Plot.substring(0,40)}</p>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{item.Title}<i className="fa fa-times right"></i></span>
                            <p>{item.Plot}</p>
                        </div>
                    </div>
                </div>
            );
        });

        this.setState({cards: currentObject});
    }
});

module.exports = Home;