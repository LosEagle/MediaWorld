import React from "react";
import * as global from "../../app/global";
import IO from "../../app/IO";
import TVMazeAPI from "../../app/TVMazeAPI";
import Helper from "../../app/Helper";
import Settings from "../../app/Settings";

const io = new IO;
const tvm = new TVMazeAPI;
const h = new Helper;
const settings = new Settings;

export default class Home extends React.Component {
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
        this.getEpisodeData();
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

    getEpisodeData() {
        let finalData = [];

        tvm.searchForShows(this.entryData).then((response) => {
            for (let i = 0; i <= response.length - 1; i++) {
                this.entryData[i].id = response[i].data.id;
            }
        }).then(() => {
            for (let i = 0; i <= this.entryData.length - 1; i++) {
                tvm.getEpisode(this.entryData[i].id, this.entryData[i].season, this.entryData[i].episode).then((response) => {
                    const currentItem = response.data;

                    currentItem.showName = this.entryData[i].name;
                    finalData = _.concat(finalData, currentItem);

                }).then(() => {
                    this.setState({
                        renderData: finalData,
                        allowTemplRender: true
                    });
                });
            }
        });
    }

    showTemplCards(item, i) {
        const showName = item.showName;
        const detailUrl = `#detail/${item.id}/${showName}`;

        if (!item.id) return;

        return (
            <div className="col s4" key={i}>
                <div className="card small">
                    <div className="card-image">
                        <img className="activator" src={item.image === null ? "https://placehold.it/350x150?text=no+image" : item.image.medium} alt=""/>
                        <span className=""></span>
                    </div>
                    <div className="card-content">
                        <a href={detailUrl}><strong>{showName} | {item.name} | S{item.season}E{item.number} | {settings.formatDate(item.airstamp)}</strong></a>
                        <p className="truncate">{h.stripParagraphs(item.summary)}</p>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title">{item.name}<i className="fa fa-times right"></i></span>
                        <p>{h.stripParagraphs(item.summary)}</p>
                    </div>
                </div>
            </div>
        );
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