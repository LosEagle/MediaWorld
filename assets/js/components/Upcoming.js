import React from "react";

require("../../css/2-components/Upcoming.scss");

var fs = window.require("fs");

var Upcoming = React.createClass({
    render: function() {
        return (
            <div onLoad={this.getShows}>
                <h1 onClick={this.getShows}>Upcoming Component</h1>
            </div>
        );
    },

    getShows: function() {
        fs.readFile("./assets/data/watching.txt", "utf8", function read(err, data) {
            if (err)
                throw err;
            
            console.log(data);
        });
    }
});

module.exports = Upcoming;