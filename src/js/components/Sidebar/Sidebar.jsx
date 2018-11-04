import React from "react";
import "./sidebar.sass";

export default class Sidebar extends React.Component {
    render() {
        return (
            <ul id="slide-out" className="side-nav fixed">
                <li><a className="waves-effect white-text text-darken-1" href="#">MediaWorld <sup>WORK IN PROGRESS</sup></a></li>
                <li><a className="waves-effect white-text text-darken-1" href="#"><i className="white-text text-darken-1 fa fa-home"></i> Home</a></li>
                <li><a className="waves-effect white-text text-darken-1" href="#calendar"><i className="white-text text-darken-1 fa fa-calendar"></i> Calendar</a></li>
                <li><a className="waves-effect white-text text-darken-1" href="#userlist"><i className="white-text text-darken-1 fa fa-plus"></i> Add</a></li>
                <li><a className="waves-effect white-text text-darken-1" href="#userlistManager"><i className="white-text text-darken-1 fa fa-table"></i> Manage</a></li>
                <li><a className="waves-effect white-text text-darken-1" href="#importExport"><i className="white-text text-darken-1 fa fa-download"></i> Import/export</a></li>
                <li><a className="waves-effect white-text text-darken-1" href="#settings"><i className="white-text text-darken-1 fa fa-cog"></i> Settings</a></li>
            </ul>
        );
    }
}
