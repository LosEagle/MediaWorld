import React from "react";
import "./detail.sass";
import YoutubeAPI from "../../app/YoutubeAPI";
import TVMazeAPI from "../../app/TVMazeAPI";

const yt = new YoutubeAPI;
const tvm = new TVMazeAPI;

export default class Detail extends React.Component {
    constructor() {
        super();

        this.epInfo = {};

        this.state = {
            template: []
        };
    }

    render() {
        return (
            <div className="detail row">
                <div className="detailContent col s12">
                    <div className="detailContent__trailer">
                        {this.state.embed}
                    </div>
                    <ul className="collection">
                        {this.state.template}
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.constructContent();
    }

    constructContent() {
        tvm.getEpisodeByID(this.props.match.params.id).then((response) => {
            let data = response.data;
            this.epInfo = data;
            let infoMarkup;

            infoMarkup =
                Object.keys(data).map((key, index) => {
                    if (typeof data[key] !== "object") {
                        return (
                            <li className="collection-item" key={index}>
                                <span>{key}: </span>
                                <span>{data[key]}</span>
                            </li>
                        );
                    } else {
                        return (
                            <li className="collection-item" key={index}>
                                <span>{key}: </span>
                                <span>{JSON.stringify(data[key])}</span>
                            </li>
                        );
                    }
                });

            this.setState({
                template: infoMarkup
            });
        }).then(() => {
            this.sendYoutubeRequest();
        });
    }

    sendYoutubeRequest() {
        const query = `${this.props.match.params.showName} s${this.epInfo.season}e${this.epInfo.number} trailer`;

        yt.search(query).then((response) => {
            const data = response.data.items[0];

            if (!data) {
                Materialize.toast("YouTube trailer not found", 1000);
                return;
            }

            this.setState({
                embed: <iframe type="text/html" height="360" src={`https://www.youtube.com/embed/${data.id.videoId}`} frameBorder="0"></iframe>
            });
        });
    }
}
