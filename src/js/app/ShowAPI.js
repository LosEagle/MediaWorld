import * as axios from "axios";

export default class ShowAPI {
    constructor() {
        this.queryUrl = "http://www.omdbapi.com/?t=";
        this.imdbQueryUrl = "http://www.omdbapi.com/?i=";
    }

    generateEpisodeUrl(name, season, episode) {
        return `${this.queryUrl}${name}&Season=${season}&Episode=${episode}`;
    }

    generateSeasonUrl(name, season) {
        return `${this.queryUrl}${name}&Season=${season}`;
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

    getSeason(name, season) {
        return axios.get(this.generateSeasonUrl(name, season));
    }

    getEpisodeByImdb(imdbId) {
        return axios.get(this.generateImdbEpisodeUrl(imdbId));
    }
}