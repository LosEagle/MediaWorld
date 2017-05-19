import * as axios from "axios";

export default class ShowAPI {
    constructor() {
        this.API_KEY = "AIzaSyBide0_mlFe0xmlbpIogj59XALfQCVtfjo";
    }

    search(query) {
        return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${this.API_KEY}`);
    }
}