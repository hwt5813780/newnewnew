import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ResourceAdd from "./pages/resourceAdd";
import ResourceEdit from "./pages/resourceEdit";
import ResourceList from "./pages/resourceList";
import NotFound from "../notFound/notFound";

export default class Resource extends Component {
    render() {
        return (
            <Switch>
                <Route path={'/resource/resource-add'} component={ResourceAdd}/>
                <Route path={'/resource/resource-edit'} component={ResourceEdit}/>
                <Route path={'/resource'} component={ResourceList}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}