import React from "react";
import "./detail.sass";
import ShowAPI from "../../app/ShowAPI";
import YoutubeAPI from "../../app/YoutubeAPI";

const show = new ShowAPI;
const yt = new YoutubeAPI;

class Detail extends React.Component {
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
        show.getEpisodeByImdb(this.props.params.info).then((response) => {
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
        const query = `${this.props.params.showName} s${this.epInfo.Season}e${this.epInfo.Episode} trailer`;

        yt.search(query).then((response) => {
            const data = response.data.items[0];

            this.setState({
                embed:
                    <iframe type="text/html" height="360"
                    src={`https://www.youtube.com/embed/${data.id.videoId}`}
                    frameBorder="0"></iframe>
            });
        });
    }
}

module.exports = Detail;