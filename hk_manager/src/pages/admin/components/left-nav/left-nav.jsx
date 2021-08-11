import React, {Component} from 'react'
// 引入withRouter，使得左边可以操作路由
import {withRouter, Link} from 'react-router-dom'
// 引入prop-types
import PropTypes from 'prop-types'
// 引入消息订阅
import PubSub from 'pubsub-js'
// 引入图片
import LoginImg from './images/login.png'
// 引入样式
import './css/left-nav.css'
// 引入目录JSON文件
import menus from './config/menuConfig.json'
// 引入字体图标
import './fonts/iconfont.css'
// 引入组件
import {Layout, Menu} from 'antd'
// 引入管理员数据
import {getUser} from '../../../../api/adminApi'
import config from "../../../../config/config";
// 引入Slider
const {Sider} = Layout;
const {Item, SubMenu} = Menu


class LeftNav extends Component {
    state = {
        menuList: menus,
        // 管理员信息
        account_name: getUser().account_name,
        account_icon: getUser().account_icon,
    };

    static propTypes = {
        collapsed: PropTypes.bool.isRequired
    };

    componentDidMount() {
        // 订阅管理员信息更新的信息
        PubSub.subscribe('changeAdminMsg', (msg, data) => {
            if (msg === 'changeAdminMsg') {
                this.setState({
                    account_name: getUser().account_name,
                    account_icon: getUser().account_icon
                })
            }
        });
    }

    /*创建左侧菜单*/
    _renderMenu = (menuList) => {
        return menuList.map(item => {
            // 取出一级菜单
            if (!item.children) {
                return (
                    <Item key={item._key}>
                        <Link to={item._key}>
                            <span className={item.icon} style={this.props.collapsed ? {fontSize: 20,right:10} : {}}/>
                            <span style={this.props.collapsed ? {display: 'none'} : {}}>{item.title}</span>
                        </Link>
                    </Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item._key}
                        title={
                            <span>
                                 <span className={item.icon} style={this.props.collapsed ? {fontSize: 20,right:10} : {}}/>
                                  <span style={this.props.collapsed ? {display: 'none'} : {}}>{item.title}</span>
                            </span>
                        }
                    >
                        {this._renderMenu(item.children)}
                    </SubMenu>
                )
            }
        })
    };

    // 根据当前的菜单列表, 依据当前的路由路径, 获取应该被展开的菜单项
    _getOpenKeys = (menuList, path) => {
        for (let i = 0; i < menuList.length; i++) {
            // 1. 获取配置对象
            let item = menuList[i];
            // 2. 判断
            if (
                item.children &&
                item.children.find(c_item => {
                    return c_item._key === path
                })
            ) {
                return item._key;
            }
        }
        return '';
    };

    render() {
        // 获取当前的路由
        // /home/api
        let path = this.props.location.pathname;
        let pPath = path.substr(0, path.indexOf('/', 2)) ? path.substr(0, path.indexOf('/', 2)) : path;
        let openKeys = this._getOpenKeys(this.state.menuList, path);

        const {account_name, account_icon} = this.state;
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}
                   >
                <div className="logo" >
                    <div className="logo_admin" style={this.props.collapsed ? {position:"relative",width:30,left:5} : {}}>
                    </div>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[path]}
                    selectedKeys={[path, pPath]}
                    defaultOpenKeys={[openKeys]}
                >
                    {this._renderMenu(this.state.menuList)}
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(LeftNav)

