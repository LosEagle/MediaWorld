import React from "react";
import "fullcalendar";
import "fullcalendar/dist/fullcalendar.css";
import "./calendar.sass";
import * as global from "../../app/global";
import IO from "../../app/IO";
import TVMazeAPI from "../../app/TVMazeAPI";
import * as _ from "lodash";
import Settings from "../../app/Settings";

const io = new IO;
const tvm = new TVMazeAPI;
const settings = new Settings;

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.calendarEvents = [];
    }

    componentDidMount() {
        this.getShows();
    }

    render() {
        return (
            <div id="calendar" className="calendar" ref={ (calendar) => { this.calendar = calendar; } } />
        );
    }

    initFullCalendar() {
        $(this.calendar).fullCalendar({
            header: {
                left: "prev, next today",
                center: "title",
                right: "listMonth, month, basicWeek, basicDay"
            },
            firstDay: settings.getCalendarFirstDay(),
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
                    if (id) {
                        const data = response.data;
                        const episodes = _.filter(data, { "season": season });

                        for (let ep of episodes) {
                            const eventObj = {
                                title: `${name} - S${ep.season}E${ep.number}`,
                                start: new Date(ep.airstamp),
                                end: new Date(ep.airstamp),
                                editable: false,
                                allDay: false
                            };

                            this.calendarEvents.push(eventObj);
                        }
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