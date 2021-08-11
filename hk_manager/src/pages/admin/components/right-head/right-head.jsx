import React, {Component} from 'react'
// 引入withRouter，使得左边可以操作路由
import {withRouter} from 'react-router-dom'
// 引入Layout,Modal
import {Modal, Layout, Button, message, Menu} from 'antd'
import {ExclamationCircleOutlined, UserOutlined} from '@ant-design/icons';
// 引入prop-types
import PropTypes from 'prop-types'
// 引入开关icon
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';
// 引入样式
import './css/right-head.css'
// 引入ajax
import ajax from "../../../../api/index";
import {checkLogOut, getUser, removeUser} from '../../../../api/adminApi'
// 引入Header
const {Header} = Layout
const {confirm} = Modal;
const SubMenu = Menu.SubMenu;

class RightHead extends Component {
    static propTypes = {
        collapsed: PropTypes.bool.isRequired,
        toggle: PropTypes.func.isRequired
    }
    state = {
        // 天气图片
        picURL: '',
        // 天气信息
        notice: ''
    }

    componentDidMount() {
        // 获取当前城市的天气
        this._weather();
    }

    // 天气预报函数
    _weather() {
        const cityId = '110105';
        const key = 'Qfi8mEZbaydoGUPM6PFmyTl8CY1KqndH';
        const url = `/baidu_api/?district_id=${cityId}&data_type=now&ak=${key}`
        ajax(url).then((data) => {
            let nowWeather = data.result.now;
            let notice = nowWeather["text"] + ' ' + nowWeather["temp"] + ' ' + nowWeather["wind_dir"] + ' ' + nowWeather["wind_class"];
            let picURL = `http://api.map.baidu.com/images/weather/night/xiaoyu.png`;  // 目前API已经不支持获取图片了
            // 更新状态机
            this.setState({picURL, notice})
        }).catch((error) => {
            message.error('网络异常:' + error)
        })
    }

    // 退出登录
    _logout() {
        confirm({
            title: `Sign Out`,
            icon: <ExclamationCircleOutlined/>,
            content: `Are you sure to sign out?`,
            cancelText: `No`,
            okText: `Yes`,
            onOk: () => {
                checkLogOut().then((result) => {
                    if (result && result.status === 1) {
                        // 清空本地缓存
                        removeUser();
                        message.success(result.msg);
                    } else {
                        // 清空本地缓存
                        removeUser();
                        message.error('服务器内部出现问题！');
                    }
                    // 切换到登录界面
                    this.props.history.replace('/login')
                })
            }
        });
    }

    render() {
        return (
            <Header className="header" style={{padding: 0}}>
                {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.props.toggle,
                })}
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '48px', float: 'right' }}
                >
                    <SubMenu
                        title={<span>
                            <UserOutlined style={{fontSize:16, color: '#00aaff',marginRight:5 }} />{getUser().account}
                        </span>}
                    >
                        <Menu.Item key="logout" style={{textAlign:'center'}} className="logout">
                            <Button type="danger" className="exit-btn" onClick={() => this._logout()}>Sign Out</Button>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}

export default withRouter(RightHead);