import React from "react";
import "./detail.sass";
import ShowAPI from "../../app/ShowAPI";

const show = new ShowAPI;

class Detail extends React.Component {
    constructor() {
        super();

        this.state = {
            template: []
        };
    }

    render() {
        return (
            <div className="detail row">
                <div className="col s12 detailHeader">
                    <h1 className="detailHeading">Detail: {this.props.params["info"]}</h1>
                </div>
                <div className="detailContent col s12">
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
        show.getEpisodeByImdb(this.props.params["info"]).then((response) => {
            let data = response.data;
            let infoMarkup;

            infoMarkup =
            Object.keys(data).map((key, index) => {
                return (
                     <li className="collection-item" key={index}>
                         <span className="left-align">{key}: </span>
                         <span className="right-align">{data[key].toString()}</span>
                     </li>
                );
            });

            this.setState({
                template: infoMarkup
            });
        });
    }
}

module.exports = Detail;