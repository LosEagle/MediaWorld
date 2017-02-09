import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory } from "react-router";

require("materialize-css");
require("materialize-css/sass/materialize.scss");
require("../css/main.sass");

var Upcoming = require("./components/Upcoming");
var UserList = require("./components/UserList");

const app = document.getElementById("app");

var AppRouter = React.createClass({
    render: function() {
        return (
            <Router history={hashHistory}>
                <Route path={"/"} component={Upcoming} />
                <Route path={"/userlist"} component={UserList} />
            </Router>
        );
    }
});

ReactDOM.render(<AppRouter />, app);