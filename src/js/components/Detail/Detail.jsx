import React from "react";
import "./detail.sass";
import TVMazeAPI from "../../app/TVMazeAPI";
import Settings from "../../app/Settings";

const tvm = new TVMazeAPI;
const settings = new Settings();

export default class Detail extends React.Component {
    constructor() {
        super();

        this.state = {
            episodeInfo: {}
        };
    }

    render() {
        return (
            <div className="detail row">
                <div className="detailContent col s12">
                    <div className="epImg">
                        <img className="epImg__img" src={(this.state.episodeInfo.image) ? this.state.episodeInfo.image.original : ""} alt=""/>
                    </div>
                    <div className="epContent">
                        <h1>{this.state.episodeInfo.name}</h1>
                        <p>Season {this.state.episodeInfo.season} Episode {this.state.episodeInfo.number}</p>
                        <p>Release: {settings.formatDate(this.state.episodeInfo.airstamp)}</p>
                        <p>Length: {this.state.episodeInfo.runtime}</p>
                        <p ref="summary"></p>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.constructContent();
    }

    constructContent() {
        tvm.getEpisodeByID(this.props.match.params.id).then((response) => {
            const data = response.data;

            this.refs.summary.innerHTML = data.summary;

            this.setState({
                episodeInfo: data
            });
        });
    }
}
