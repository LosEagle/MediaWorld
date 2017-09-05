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

        this.handleShortcuts = this.handleShortcuts.bind(this);
        this.clearKeybinds = this.clearKeybinds.bind(this);
    }

    render() {
        return (
            <div className="managerSearch">
                <input className="managerSearch__input" onInput={this.handleSearchInput.bind(this)} type="text" ref="search"/>
                <a className="btn-floating btn-large waves-effect waves-light teal darken-1">
                    <i className="managerSearch__icon fa fa-search" onClick={this.toggleSearch.bind(this)} ref="icon"/>
                </a>
            </div>
        );
    }

    componentDidMount() {
        this.data = io.read(global.userItems);
        this.shortcutKeys = {
            "Control": false,
            "f": false,
            "Escape": false
        };
        document.addEventListener("keydown", this.handleShortcuts);
        document.addEventListener("keyup", this.clearKeybinds);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleShortcuts);
        document.removeEventListener("keyup", this.clearKeybinds);
    }

    toggleSearch() {
        if (this.searchIsShown === false) {
            this.showSearch();
        } else {
            this.hideSearch();
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

    handleShortcuts(e) {
        if (typeof this.shortcutKeys[e.key] === "undefined") return;

        this.shortcutKeys[e.key] = true;

        if (this.shortcutKeys["Control"] && this.shortcutKeys["f"])
            this.toggleSearch();

        else if (this.shortcutKeys["Escape"])
            this.hideSearch();
    }

    clearKeybinds() {
        for (let key in this.shortcutKeys) {
            this.shortcutKeys[key] = false;
        }
    }

    showSearch() {
        if (!this.searchIsShown) {
            this.refs.search.style.display = "block";
            this.searchIsShown = true;
            this.refs.search.focus();
        }
    }

    hideSearch() {
        if (this.searchIsShown) {
            this.refs.search.style.display = "none";
            this.searchIsShown = false;
        }
    }
}