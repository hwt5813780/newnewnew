import React from 'react'
import {Switch, Route} from 'react-router-dom'

import AccountSetting from "./pages/accountsetting/accountSetting";
import MemberCount from "./pages/memberCount/memberCount";
import NotFound from "../notFound/notFound";

export default class Setting extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path={"/setting/account"} component={AccountSetting}/>
                    <Route path={"/setting/member"} component={MemberCount}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        )
    }
}