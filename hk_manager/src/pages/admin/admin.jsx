import React, {Component} from 'react'
import {connect} from 'react-redux'
// 引入路由组件
import {Switch, Redirect, Route} from 'react-router-dom'
import PubSub from 'pubsub-js'
// 引入layout依赖
import {Layout, Modal} from 'antd';
// 引入组件
import LeftNav from './components/left-nav/left-nav'
import RightHead from './components/right-head/right-head'
// 引入样式
import './css/admin.css'
// 引入判断是否登录函数
import {isLogin} from '../../api/adminApi'
// 引入一级路由
import Activities from "./../activities/activities";
import Home from "./../home/home";
import LifeJob from "./../lifeJob/lifeJob";
import Lives from "./../lives/lives";
import Resource from "./../resource/resource";
import Setting from "./../setting/setting";
import notFound from "../notFound/notFound";
// 引入layout中内容
const {Content, Footer} = Layout;


class Admin extends Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount() {
        // 订阅token失效信息
        PubSub.subscribe('tokenOut', (msg) => {
            if (msg === 'tokenOut') {
                Modal.warning({
                    title: '登录信息已经失效',
                    content: (
                        <div>
                            <p>请重新登录后再操作</p>
                        </div>
                    ),
                    onOk: () => {
                        this.props.history.replace('/login');
                    }
                })
            }
        })
    }

    componentWillUnmount() {
        // 销毁消息
        PubSub.unsubscribe('tokenOut')
    }

    render() {
        // 判断是否是登录的
        if (!isLogin()) {
            return <Redirect to={'/login'}/>
        }
        const collapsed = this.state.collapsed;
        return (
            <Layout className='admin-pane'>
                {/*左边*/}
                <LeftNav collapsed={collapsed}/>
                {/*右边*/}
                <Layout>
                    <RightHead collapsed={collapsed} toggle={this.toggle}/>
                    <Content className='admin-content'>
                        <Switch>
                            <Redirect exact from={'/'} to={'/home'}/>
                            <Route path={'/home'} component={Home}/>
                            <Route path={'/resource'} component={Resource}/>
                            <Route path={'/lifejob'} component={LifeJob}/>
                            <Route path={'/activities'} component={Activities}/>
                            <Route path={'/lives'} component={Lives}/>
                            <Route path={'/setting'} component={Setting}/>
                            <Route component={notFound}/>
                        </Switch>
                    </Content>
                    <Footer className='admin-footer'>
                        Weiting Huang@Used Car 2020-2021
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(null, null)(Admin);