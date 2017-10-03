import React from "react";
import "./responsiveHeader.sass";

export default class ResponsiveHeader extends React.Component {
    componentDidMount() {
        $(".button-collapse").sideNav();
    }

    render() {
        return (
            <a href="#" data-activates="slide-out" className="button-collapse"><i className="fa fa-bars" /></a>
        );
    }
}