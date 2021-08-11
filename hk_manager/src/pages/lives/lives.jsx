import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LiveList from "./pages/liveList";
import LiveAdd from "./pages/liveAdd";
import LiveEdit from "./pages/liveEdit";
import NotFound from "../notFound/notFound";

export default class LifeJob extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={"/lives/add-live"} component={LiveAdd}/>
                <Route path={"/lives/edit-live"} component={LiveEdit}/>
                <Route path={"/lives"} component={LiveList}/>
                <Route component={NotFound}/>
            </Switch>
        )
    }
}