import React from "react";

require("fullcalendar");
require("fullcalendar/dist/fullcalendar.css");
const global = require("../app/global");
import IO from "../app/IO";
const axios = require("axios");

const Calendar = React.createClass({
    componentDidMount: function() {
        this.initFullCalendar();
        this.getShows();
    },

    render: function() {
        return (
            <div id="calendar" ref="calendar"></div>
        );
    },

    initFullCalendar: function() {
        $("#calendar").fullCalendar();
    },

    getShows: function() {
        const io = new IO;
        let currentJSON = io.readJSON(global.userItems);

        for (let item of currentJSON) {
            axios.get(`http://www.omdbapi.com/?t=${item.name}&Season=${item.season}&Episode=${item.episode}`).then((response) => {
                let eventObj = {
                    title: item.name + " | " + response.data.Title,
                    start: new Date(response.data.Released),
                    end: new Date(response.data.Released),
                    editable: false,
                    allDay: true
                };
                $("#calendar").fullCalendar("renderEvent", eventObj, true);
            });
        }
    }
});

module.exports = Calendar;