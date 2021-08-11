import React from 'react'
import {Switch, Route} from 'react-router-dom'

import ActivitiesList from './pages/activitiesList'
import ActivitiesAdd from './pages/activitiesAdd'
import ActivitiesEdit from "./pages/activitiesEdit";
import NotFound from "../notFound/notFound";

export default class LifeJob extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={"/activities/add-activities"} component={ActivitiesAdd}/>
                <Route path={"/activities/edit-activities"} component={ActivitiesEdit}/>
                <Route path={"/activities"} component={ActivitiesList}/>
                <Route component={NotFound}/>
            </Switch>
        )
    }
}