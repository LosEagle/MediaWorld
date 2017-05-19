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
            },
            firstDay: 1
        });
    }

    getShows() {
        let currentJSON = io.read(global.userItems);

        for (let item of currentJSON) {
            let name = item.name;

            show.getSeason(item.name, item.season).then((response) => {
                const data = response.data.Episodes;

                for (let i = 0; i <= data.length - 1; i++) {
                    let ep = data[i];

                    const eventObj = {
                        title: `${item.name} - S${item.season}E${ep.Episode}`,
                        start: new Date(ep.Released),
                        end: new Date(ep.Released),
                        editable: false,
                        allDay: true
                    };

                    $("#calendar").fullCalendar("renderEvent", eventObj, true);
                }
            });
        }
    }
}

module.exports = Calendar;