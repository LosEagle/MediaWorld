import * as axios from "axios";
import * as _ from "lodash";

export default class ShowAPI {
    constructor() {
        this.queryUrl = "http://www.omdbapi.com/?t=";
        this.imdbQueryUrl = "http://www.omdbapi.com/?i=";
    }

    generateEpisodeUrl(name, season, episode) {
        return `${this.queryUrl}${name}&Season=${season}&Episode=${episode}`;
    }

    generateImdbEpisodeUrl(imdbId) {
        return `${this.imdbQueryUrl}${imdbId}`;
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

    getEpisodeByImdb(imdbId) {
        return axios.get(this.generateImdbEpisodeUrl(imdbId));
    }
}