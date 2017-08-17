import React from "react";
import "./managerSearch.sass";
import IO from "../../../app/IO";
import * as _ from "lodash";
import * as global from "../../../app/global";

const io = new IO;

export default class ManagerSearch extends React.Component {
    constructor() {
        super();

        this.searchIsShown = false;
    }

    render() {
        return (
            <div className="managerSearch">
                <input className="managerSearch__input" onInput={this.handleSearchInput.bind(this)} type="text" ref="search"/>
                <i className="managerSearch__icon fa fa-search" onClick={this.handleIconClick.bind(this)} ref="icon"/>
            </div>
        );
    }

    componentDidMount() {
        this.data = io.read(global.userItems);
    }

    handleIconClick() {
        if (this.searchIsShown === false) {
            this.refs.search.style.display = "block";
            this.searchIsShown = true;
            this.refs.search.focus();
        } else {
            this.refs.search.style.display = "none";
            this.searchIsShown = false;
        }
    }

    handleSearchInput() {
        let data = this.data;
        const val = this.refs.search.value;
        let indexes = [];

        _.forEach(data, (value, key) => {
            const name = value.name.toLowerCase();
            const term = val.toLowerCase();

            if (name.search(term) === -1)
                indexes.push(key);
        });

        this.props.setHiddenItems(indexes);
    }
}