import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Input, Button, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './css/login.css'
import loginImg from './image/login.png'
import Checkbox from "antd/es/checkbox/Checkbox";
import {checkLogin, saveUser} from '../../api/adminApi'
import md5 from 'blueimp-md5'
import config from "../../config/config";


class Login extends Component {
    render() {
        const onFinish = values => {
            // 1. 对密码进行MD5加密
            const hash_pwd = md5(values.password, config.KEY);
            // 2. 处理登录业务
            checkLogin(values["account"], hash_pwd).then((result) => {
                if (result && result.status === 1) {
                    message.success(result.msg);
                    // 2.1 用户信息本地缓存持久化
                    saveUser(result.data);
                    // 2.2 跳转到主面板
                    this.props.history.replace('/');
                } else if (result && result.status === 0) {
                    message.warning(result.msg);
                } else {
                    message.error('网络出现了一点小问题！');
                }
            }).catch((error) => {
                message.error('服务器端内部错误！');
            })
        };
        return (
            <div className="login">
                <div className="logo-name">
                    <img style={{height:'80px',marginBottom:'50px'}} className="logo" src={loginImg} alt=""/>
                </div>
                <div className="login-form">
                    <Form
                        name="normal_login"
                        className="login-form"
                        style={{maxWidth: '300px'}}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="account"
                            rules={[{required: false}]}
                        >
                            <Input size="large"  placeholder="account" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: false}]}
                        >
                            <Input size="large"  type="password" placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                    <h4 style={{color:'grey'}}>Weiting Huang 2020-2021</h4>
                </div>
            </div>
        )
    }
}

export default connect(null,null)(Login);