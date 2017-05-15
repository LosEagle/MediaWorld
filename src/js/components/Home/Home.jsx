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

        this.entryData;
        this.state = {
            renderData: [],
            allowTemplRender: false
        };
    }

    componentWillMount() {
        io.createFileIfNotExists(global.userItems);
    }

    componentDidMount() {
        this.entryData = io.read(global.userItems);
        this.fetchEpisodeData();
    }

    render() {
        if (!this.state.allowTemplRender) return (<div className="row home"></div>);

        if (this.state.renderData.length === 0) {
            return (
                <div className="row home">
                    { this.showTemplEmptyWatchlist() }
                </div>
            );
        } else {
            return (
                <div className="row home">
                    { this.state.renderData.map(this.showTemplCards.bind(this)) }
                </div>
            );
        }
    }

    fetchEpisodeData() {
        let finalData = [];

        show.getMultipleEpisodes(this.entryData).then((result) => {
            result.forEach((key, index) => {
                const currentItem = result[index].data;

                if (typeof finalData !== "undefined")
                    finalData = _.concat(finalData, currentItem);
                else {
                    finalData.push(currentItem);
                }
            });

            this.setState({
                renderData: finalData,
                allowTemplRender: true
            });
        });
    }

    showTemplCards(item, i) {
        if (item.Plot) {
            const showName = this.entryData[i].name;
            const detailUrl = `#detail/${item.imdbID}/${showName}`;

            return (
                <div className="col s4" key={i}>
                    <div className="card small">
                        <div className="card-image">
                            <img className="activator" src={item.Poster === "N/A" ? "" : item.Poster} alt=""/>
                            <span className=""></span>
                        </div>
                        <div className="card-content">
                            <a href={detailUrl}><strong>{showName} | {item.Title} | S{item.Season}E{item.Episode} | {item.Released}</strong></a>
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
    }

    showTemplEmptyWatchlist() {
        return (
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
        );
    }
}

module.exports = Home;