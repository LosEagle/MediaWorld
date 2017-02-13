import React from "react";

require("../../css/2-components/home.scss");

const fs = window.require("fs");
const axios = require("axios");

const Home = React.createClass({
    getInitialState: function() {
        return {
            listPath: "./assets/data/list.json",
            jsonList: "",
            omdbData: ""
        };
    },

    componentDidMount: function() {
        this.readListContents();
        this.fetchEpisodeData();
    },

    render: function() {
        let cards = [];

        cards = this.constructCardArray();
        return (
            <div className="row">
                {cards}
            </div>
        );
    },

    readListContents: function() {
        let data = fs.readFileSync(this.state.listPath, "utf8");

        if (data === "")
            this.state.jsonList = data;
        else
            this.state.jsonList = JSON.parse(data);
    },

    fetchEpisodeData: function() {
        let list = this.state.jsonList;
        let data = [];
        let temp;
        let item;
        let currentData;
        let finalStateValue;

        Object.keys(list).forEach((key,index) => {
            axios.get(`http://www.omdbapi.com/?t=${list[index].name}&Season=${list[index].season}&Episode=${list[index].episode}`)
            .then((response) => {
                item = response.data;
                currentData = this.state.omdbData;

                if (currentData !== "")
                    finalStateValue = _.concat(item, currentData);
                else
                    finalStateValue = item;

                this.setState({ omdbData: finalStateValue});
            });
        });
    },

    constructCardArray: function() {
        let array = [];
        let currentObject;

        for (let i = 0; i <= this.state.omdbData.length - 1; i++) {
            currentObject = this.state.omdbData[i];

            array.push(
                <div className="col s4" key={i}>
                    <div className="card small">
                        <div className="card-image">
                            <img className="activator" src={currentObject.Poster} alt=""/>
                            <span className=""></span>
                        </div>
                        <div className="card-content">
                            <strong>{currentObject.Title} | S{currentObject.Season}E{currentObject.Episode} | {currentObject.Released}</strong>
                            <p>{currentObject.Plot.substring(0,40)}</p>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{currentObject.Title}<i className="fa fa-times right"></i></span>
                            <p>{currentObject.Plot}</p>
                        </div>
                    </div>
                </div>
            );
        }

        return array;
    }
});

module.exports = Home;