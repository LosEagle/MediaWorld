import React from "react";
import "fullcalendar";
import "fullcalendar/dist/fullcalendar.css";
import "./calendar.sass";
import * as global from "../../app/global";
import IO from "../../app/IO";
import ShowAPI from "../../app/ShowAPI";

const io = new IO;
const show = new ShowAPI;

class Calendar extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.initFullCalendar();
        this.getShows();
    }

    render() {
        return (
            <div id="calendar" className="calendar" ref="calendar"></div>
        );
    }

    initFullCalendar() {
        $("#calendar").fullCalendar({
            header: {
                left: "prev, next today",
                center: "title",
                right: "listMonth, month, basicWeek, basicDay"
            }
        });
    }

    getShows() {
        let currentJSON = io.read(global.userItems);

        for (let item of currentJSON) {
            show.getEpisode(item.name, item.season, item.episode).then((response) => {
                const eventObj = {
                    title: `${item.name} - ${response.data.Title} - S${response.data.Season}E${response.data.Episode}`,
                    start: new Date(response.data.Released),
                    end: new Date(response.data.Released),
                    editable: false,
                    allDay: true
                };

                $("#calendar").fullCalendar("renderEvent", eventObj, true);
            });
        }
    }
}

module.exports = Calendar;