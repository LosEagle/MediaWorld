import IO from "./IO";
import * as global from "./global";
import moment from "moment-timezone";

const io = new IO;

export default class Settings {
    constructor() {
        this.ensureConfigExistence();
        this.values = io.read(global.settings);

        this.defaultSettings = {
            "dateFormat": "YYYY-MM-DD hh:mmA",
            "timezone": "America/New_York",
            "calendarFirstDay": "0"
        };
    }

    ensureConfigExistence() {
        let fileWasCreated;

        fileWasCreated = io.createFileIfNotExists(global.settings);

        if (fileWasCreated)
            io.writeStrSync(global.settings, "{}");
    }

    formatDate(dateTimeStamp) {
        return moment(dateTimeStamp).tz(this.getTimezone()).format(this.getDateFormat());
    }

    getDateFormat() {
        if (this.values.dateFormat) {
            return this.values.dateFormat;
        } else {
            return this.defaultSettings.dateFormat;
        }
    }

    getTimezone() {
        if (this.values.timezone) {
            return this.values.timezone;
        } else {
            return this.defaultSettings.timezone;
        }
    }

    getCalendarFirstDay() {
        if (this.values.calendarFirstDay) {
            return this.values.calendarFirstDay;
        } else {
            return this.defaultSettings.calendarFirstDay;
        }
    }
}