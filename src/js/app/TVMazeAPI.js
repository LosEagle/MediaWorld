import * as axios from "axios";

export default class TVMazeAPI {
    getSingleShowByName(name) {
        return axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${name}`);
    }

    searchForShows(array) {
        let tempPromise = [];

        Object.keys(array).forEach((key, index) => {
            tempPromise.push(axios.get("https://api.tvmaze.com/singlesearch/shows?q=" + array[index].name));
        });

        return axios.all(tempPromise);
    }

    getEpisode(showID, season, episode) {
        return axios.get(`https://api.tvmaze.com/shows/${showID}/episodebynumber?season=${season}&number=${episode}`);
    }

    getEpisodeByID(episodeID) {
        return axios.get(`https://api.tvmaze.com/episodes/${episodeID}`);
    }

    getSeasonsByID(showID) {
        return axios.get(`https://api.tvmaze.com/shows/${showID}/seasons`);
    }

    getEpisodesByID(showID) {
        return axios.get(`https://api.tvmaze.com/shows/${showID}/episodes`);
    }
}