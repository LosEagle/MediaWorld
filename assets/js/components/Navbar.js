import React from "react";

const Navbar = React.createClass({
    render: function() {
        return (
            <div className="row">
                <a href="#" className="brand-logo right">MediaWorld</a>

                <ul className="left">
                    <li><a className="dropdown-button" href="#" data-activates="viewList">Watch</a></li>
                    <li><a className="dropdown-button" href="#" data-activates="listConfig">Manage</a></li>
                </ul>

                <ul id="viewList" className="dropdown-content">
                    <li><a href="#">Home</a></li>
                    <li><a href="#calendar">Calendar</a></li>
                </ul>


                <ul id="listConfig" className="dropdown-content">
                    <li><a href="#userlist">Add show entry</a></li>
                    <li><a href="#userlistmanager">Manage entries</a></li>
                </ul>
            </div>
        );
    }

});

module.exports = Navbar;
