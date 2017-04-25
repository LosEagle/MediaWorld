import React from "react";
import ReactDOM from "react-dom";

require("../../css/2-components/preloader.sass");
const axios = require("axios");

const progressbar = document.getElementById("progressbar");

const Preloader = React.createClass({

    componentWillMount: function() {
        axios.interceptors.request.use((config) => {
            this.show();
            return config;
        });

        axios.interceptors.response.use((response) => {
            this.hide();
            return response;
        });
    },

    render: function() {
        return (
            <div className={`preloader progress ${this.props.visibility}`}>
                <div className="indeterminate"></div>
            </div>
        );
    },

    show: function() {
        ReactDOM.render(<Preloader />, progressbar);
    },

    hide: function() {
        ReactDOM.render(<Preloader visibility="hidden" />, progressbar);
    }
});

module.exports = Preloader;