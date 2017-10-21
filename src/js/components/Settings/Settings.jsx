import React from "react";
import IO from "../../app/IO";
import * as global from "../../app/global";
import moment from "moment-timezone";

const io = new IO;

export default class Settings extends React.Component {
    constructor() {
        super();

        this.fields = {};
    }

    componentDidMount() {
        this.setFormInitialValues();
        $("select").material_select();
    }

    render() {
        return (
            <div className="row">
                <form onSubmit={this.handleSettingsForm.bind(this)} className="col s12">
                    <div className="col s12">
                        <h1>Date</h1>
                        <h2>Format</h2>
                        <div className="input-field">
                            <select ref={ (dateFormat) => { this.fields.dateFormat = dateFormat; } }>
                                <option>DD.MM.YYYY hh:mm</option>
                                <option>MM.DD.YYYY hh:mm</option>
                                <option>YYYY.MM.DD hh:mm</option>
                                <option>DD-MM-YYYY hh:mm</option>
                                <option>MM-DD-YYYY hh:mm</option>
                                <option>YYYY-MM-DD hh:mm</option>
                                <option>DD/MM/YYYY hh:mm</option>
                                <option>MM/DD/YYYY hh:mm</option>
                                <option>YYYY/MM/DD hh:mm</option>
                            </select>
                        </div>

                        <h2>Timezone</h2>

                        <div className="input-field">
                            <select ref={(timezone) => { this.fields.timezone = timezone; }}>
                                {moment.tz.names().map(this.fillTimezoneOptions)}
                            </select>
                        </div>
                    </div>
                    <div className="col s12">
                        <h1>Calendar</h1>
                        <h2>First day of week</h2>
                        <span>0 = SU, 1 = MO, 2 = TU etc.</span>
                        <div className="input-field">
                            <select ref={ (calendarFirstDay) => { this.fields.calendarFirstDay = calendarFirstDay; } }>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-field col s12">
                        <button className="btn waves-effect waves-light" type="submit" name="action">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    fillTimezoneOptions(item, i) {
        return (
            <option key={i}>{item}</option>
        );
    }

    handleSettingsForm(e) {
        e.preventDefault();
        let list = io.read(global.settings);

        for (let item in this.fields) {
            let refVal = this.fields[item].value;

            if ((!list[item] || list[item] !== refVal) && refVal !== "") {
                list[item] = refVal;
            }
        }

        io.write(global.settings, list);
        Materialize.toast("Saved. Some settings might need restart.", 4000);
    }

    setFormInitialValues() {
        const contents = io.read(global.settings);

        this.fields.dateFormat.value = contents.dateFormat;
        this.fields.timezone.value = contents.timezone;
        this.fields.calendarFirstDay.value = contents.calendarFirstDay;
    }
}