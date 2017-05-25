import React from "react";
import "fullcalendar";
import "fullcalendar/dist/fullcalendar.css";
import "./calendar.sass";
import * as global from "../../app/global";
import IO from "../../app/IO";
import TVMazeAPI from "../../app/TVMazeAPI";
import * as _ from "lodash";

const io = new IO;
const tvm = new TVMazeAPI;

class Calendar extends React.Component {
    constructor() {
        super();
        this.calendarEvents = [];
    }

    componentDidMount() {
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
            },
            firstDay: 1,
            events: this.calendarEvents
        });
    }

    getShows() {
        let currentJSON = io.read(global.userItems);
        let i = 0;

        for (let item of currentJSON) {
            const name = item.name;
            const season = Number(item.season);
            let id = 0;

            tvm.getSingleShowByName(name).then((response) => {
                id = response.data.id;
            }).then(() => {
                tvm.getEpisodesByID(id).then((response) => {
                    const data = response.data;
                    const episodes = _.filter(data, { "season": season });

                    for (let ep of episodes) {
                        const eventObj = {
                            title: `${name} - S${ep.season}E${ep.number}`,
                            start: new Date(ep.airdate),
                            end: new Date(ep.airdate),
                            editable: false,
                            allDay: true
                        };

                        this.calendarEvents.push(eventObj);
                    }
                }).then(() => {
                    if (i === currentJSON.length -1)
                        this.initFullCalendar();

                    i++;
                });
            }).catch((err) => {
                return;
            });
        }
    }
}

module.exports = Calendar;