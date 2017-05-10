import React from "react";
import * as global from "../../app/global";
import IO from "../../app/IO";
import ShowAPI from "../../app/ShowAPI";
import "./home.sass";

const io = new IO;
const show = new ShowAPI;

class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            entryData: "",
            renderData: "",
            componentTemplate: ""
        };
    }

    componentWillMount() {
        io.createFileIfNotExists(global.userItems);
    }

    componentDidMount() {
        this.readListContents();
    }

    render() {
        return (
            <div className="row home">
                {this.state.componentTemplate}
            </div>
        );
    }

    readListContents() {
        const data = io.read(global.userItems);

        if (data.length === 0) {
            this.setState({
                componentTemplate:
                                    <div>
                                        <div>
                                            <strong>
                                                <i className="fa fa-exclamation-circle"></i> Your watchlist is empty.
                                            </strong>
                                        </div>
                                        <div className="section">
                                            Would you like to <a href="#userlist"><em>add</em></a> some entries?
                                        </div>
                                    </div>
            });
        } else {
            this.setState({entryData: data}, () => {
                this.fetchEpisodeData();
            });
        }
    }

    fetchEpisodeData() {
        const entryData = this.state.entryData;
        let currentData = {};
        let finalData;

        show.getMultipleEpisodes(entryData).then((result) => {
            result.forEach((key, index) => {
                const currentItem = result[index].data;

                if (typeof finalData !== "undefined")
                    finalData = _.concat(currentItem, finalData);
                else {
                    finalData = currentItem;
                }
            });

            this.setState({
                renderData: finalData
            });

            this.makeTemplate();
        });
    }

    makeTemplate() {
        let currentObject = this.state.renderData;

        if (!Array.isArray(currentObject)) {
            let temp;

            temp = currentObject;
            currentObject = [];
            currentObject.push(temp);
        }

        currentObject = currentObject.map(function(item, i) {
            if (item.Plot) {
                const detailUrl = `#detail/${item.imdbID}`;

                return (
                    <div className="col s4" key={i}>
                        <div className="card small">
                            <div className="card-image">
                                <img className="activator" src={item.Poster === "N/A" ? "" : item.Poster} alt=""/>
                                <span className=""></span>
                            </div>
                            <div className="card-content">
                                <a href={detailUrl}><strong>{item.Title} | S{item.Season}E{item.Episode} | {item.Released}</strong></a>
                                <p>{item.Plot.substring(0,40)}</p>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">{item.Title}<i className="fa fa-times right"></i></span>
                                <p>{item.Plot}</p>
                            </div>
                        </div>
                    </div>
                );
            }
        });

        this.setState({componentTemplate: currentObject});
    }
}

module.exports = Home;