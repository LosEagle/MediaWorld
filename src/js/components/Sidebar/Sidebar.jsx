import React from "react";

class Sidebar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <ul className="side-nav fixed grey darken-3">
                <li><a className="waves-effect white-text text-darken-1" href="#">MediaWorld <sup>WORK IN PROGRESS</sup></a></li>
                <li><a className="waves-effect white-text text-darken-1" href="#"><i className="white-text text-darken-1 fa fa-home"></i> Home</a></li>
                <li><a className="waves-effect white-text text-darken-1" href="#calendar"><i className="white-text text-darken-1 fa fa-calendar"></i> Calendar</a></li>
                <li><a className="waves-effect white-text text-darken-1" href="#userlist"><i className="white-text text-darken-1 fa fa-plus"></i> Add entries</a></li>
                <li><a className="waves-effect white-text text-darken-1" href="#userlistManager"><i className="white-text text-darken-1 fa fa-table"></i> Manage entries</a></li>
            </ul>
        );
    }
}

module.exports = Sidebar;
