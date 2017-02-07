import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory } from "react-router";

require("materialize-css");
require("materialize-css/sass/materialize.scss");
require("../css/main.sass");

var Upcoming = require("./components/Upcoming");

const app = document.getElementById("app");

var AppRouter = React.createClass({
    render: function() {
        return (
            <Router history={hashHistory}>
                <Route path={"/"} component={Upcoming}></Route>
                <Route path={"/test"} component={Upcoming}></Route>
            </Router>
        );
    }
});

ReactDOM.render(<AppRouter />, app);