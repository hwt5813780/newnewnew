import React from 'react'
import {Switch, Route} from 'react-router-dom'

import HomeList from './pages/homeList'
import HomeCommon from './pages/homeCommon'
import NotFound from './../notFound/notFound'

export default class Home extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={"/home/common"} component={HomeCommon}/>
                <Route path={"/home"} component={HomeList}/>
                <Route component={NotFound}/>
            </Switch>
        )
    }
}