import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LifeAddEdit from "./pages/lifeAddEdit";
import LifeList from "./pages/lifeList";
import NotFound from "../notFound/notFound";

export default class LifeJob extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/lifejob/add-edit"} component={LifeAddEdit}/>
                <Route path={"/lifejob"} component={LifeList}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}