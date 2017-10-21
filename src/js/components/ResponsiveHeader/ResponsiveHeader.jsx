import React from "react";
import "./responsiveHeader.sass";

export default class ResponsiveHeader extends React.Component {
    componentDidMount() {
        $(this.btnCollapse).sideNav();
    }

    render() {
        return (
            <a
                href="#"
                data-activates="slide-out"
                className="button-collapse"
                ref={ (btnCollapse) => {
                    this.btnCollapse = btnCollapse;
                } }><i className="fa fa-bars"/></a>
        );
    }
}