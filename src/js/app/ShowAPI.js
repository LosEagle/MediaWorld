import * as axios from "axios";
import * as _ from "lodash";

export default class ShowAPI {
    constructor() {
        this.queryUrl = "http://www.omdbapi.com/?t=";
    }

    generateEpisodeUrl(name, season, episode) {
        return `${this.queryUrl}${name}&Season=${season}&Episode=${episode}`;
    }

    getMultipleEpisodes(object) {
        let tempPromise = [];

        Object.keys(object).forEach((key, index) => {
            tempPromise.push(axios.get(this.generateEpisodeUrl(object[index].name, object[index].season, object[index].episode)));
        });

        return axios.all(tempPromise);
    }

    getEpisode(name, season, episode) {
        return axios.get(this.generateEpisodeUrl(name, season, episode));
    }
}