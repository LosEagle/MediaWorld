import React from "react";
import ManagerSearch from "../ManagerSearch/ManagerSearch.jsx";
import UserListManager from "../UserListManager.jsx";

export default class ManagerContainer extends React.Component {
    render() {
        return (
            <div>
                <UserListManager
                    setShowItems={this.setShowItems.bind(this)}
                    getShowItems={this.getShowItems.bind(this)}
                    getHiddenItems={this.getHiddenItems.bind(this)}
                    ref={ (managerView) => { this.managerView = managerView; } }/>
                <ManagerSearch
                    setShowItems={this.setShowItems.bind(this)}
                    getShowItems={this.getShowItems.bind(this)}
                    setHiddenItems={this.setHiddenItems.bind(this)}/>
            </div>
        );
    }

    constructor() {
        super();

        this.state = {
            showItems: [],
            hiddenItems: []
        };
    }

    setShowItems(items) {
        this.setState({ showItems: items });
    }

    getShowItems() {
        return this.state.showItems;
    }

    setHiddenItems(rowIndexes) {
        this.setState({ hiddenItems: rowIndexes }, () => {
            this.managerView.prepareTemplate();
        });
    }

    getHiddenItems() {
        return this.state.hiddenItems;
    }
}