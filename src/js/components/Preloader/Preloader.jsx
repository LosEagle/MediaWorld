import React from "react";
import ReactDOM from "react-dom";
import "./preloader.sass";
import * as axios from "axios";

const progressbar = document.getElementById("progressbar");

class Preloader extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        axios.interceptors.request.use((config) => {
            this.show();
            return config;
        });

        axios.interceptors.response.use((response) => {
            this.hide();
            return response;
        });
    }

    render() {
        return (
            <div className={`preloader progress ${this.props.visibility}`}>
                <div className="indeterminate"></div>
            </div>
        );
    }

    show() {
        ReactDOM.render(<Preloader />, progressbar);
    }

    hide() {
        ReactDOM.render(<Preloader visibility="hidden" />, progressbar);
    }
}

module.exports = Preloader;