import React from "react";
import * as global from "../../app/global";
import IO from "../../app/IO";

const io = new IO;

class UserListRemove extends React.Component {
    constructor() {
        super();

        this.state = {
            collection: []
        };
    }

    componentDidMount() {
        this.createCollectionArray();
    }

    render() {
        return (
            <div className="row">
                <ul className="collection col s12">
                    {this.state.collection}
                </ul>
            </div>
        );
    }

    createCollectionArray() {
        let currentCollection = io.readJSON(global.userItems);

        if (currentCollection === "") return;

        currentCollection = currentCollection.map((item, i) => {
            return (
                <li key={i} className="collection-item">
                    <strong>{item.name}</strong> Season:{item.season} Episode:{item.episode}
                    <a href="#" className="secondary-content">
                        <i onClick={this.handleItemRemove.bind(this)} data-entry={i} className="fa fa-times"></i>
                    </a>
                </li>
            );
        });

        this.setState({collection: currentCollection});
    }

    handleItemRemove(e) {
        e.preventDefault();

        let currentCollection = this.state.collection;
        let index = e.target.getAttribute("data-entry");

        io.removeJSONEntry(global.userItems, index);
        currentCollection.splice(index, 1);

        this.setState({collection: currentCollection});
    }
}

module.exports = UserListRemove;