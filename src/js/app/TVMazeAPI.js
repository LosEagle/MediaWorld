import * as axios from "axios";

export default class TVMazeAPI {
    constructor() {
        this.axiosConfig = {
            validateStatus: function (status) {
                return status < 500;
            }
        };
    }

    getSingleShowByName(name) {
        return axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${name}`, this.axiosConfig);
    }

    searchForShows(array) {
        let tempPromise = [];

        Object.keys(array).forEach((key, index) => {
            tempPromise.push(axios.get("https://api.tvmaze.com/singlesearch/shows?q=" + array[index].name, this.axiosConfig));
        });

        return axios.all(tempPromise);
    }

    getEpisode(showID, season, episode) {
        return axios.get(`https://api.tvmaze.com/shows/${showID}/episodebynumber?season=${season}&number=${episode}`, this.axiosConfig);
    }

    getEpisodeByID(episodeID) {
        return axios.get(`https://api.tvmaze.com/episodes/${episodeID}`, this.axiosConfig);
    }

    getSeasonsByID(showID) {
        return axios.get(`https://api.tvmaze.com/shows/${showID}/seasons`, this.axiosConfig);
    }

    getEpisodesByID(showID) {
        return axios.get(`https://api.tvmaze.com/shows/${showID}/episodes`, this.axiosConfig);
    }
}