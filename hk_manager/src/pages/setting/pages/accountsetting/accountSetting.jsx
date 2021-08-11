import React from 'react'
import {Card, Form, Input, message, Button} from "antd";
import PubSub from 'pubsub-js'
import {getUser, saveUser, changeAdminMsg} from '../../../../api/adminApi'
import config from "../../../../config/config";
import EditPassword from "./editPassword";
import KaiUploadImg from "../../../../components/KaiUploadImg";

export default class AccountSetting extends React.Component {
    constructor(props) {
        super(props);

        // 设置状态
        this.state = {
            loading: false, // 上传状态
            editPwdPanelShow: false, // 修改密码面板显示与否

            account: '', // 管理员账户名
            account_name: '', // 管理员名称
            account_icon: '', // 管理员头像
            token: '' // 令牌

        };

        // 创建表单ref
        this.formRef = React.createRef();
    }

    componentDidMount() {
        // 获取本地的管理员数据
        this.setState({
            account: getUser().account, // 管理员账户名
            account_name: getUser().account_name, // 管理员名称
            account_icon: getUser().account_icon, // 管理员头像
            token: getUser().token // 令牌
        }, () => {
            // 设置默认值
            const {account, account_name} = this.state;
            this.formRef.current.setFieldsValue({
                account, // 管理员账户名
                account_name  // 管理员名称
            })
        });

    }

    /*
      从本地去读取文件， 以base64编码形式转化出来
    */
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        // 获取服务器返回的数据
        if (info.file.response && info.file.status === 'done' && info.file.response.status === 1) {
            message.success('头像上传上传成功');
            const name = info.file.response.data.name;
            const url = config.BASE_URL + name;
            this.setState({
                account_icon: url,
                loading: false
            });
        }
    };
    /*
      修改密码
    */
    editPassWord = () => {
        this.setState({
            editPwdPanelShow: true
        })
    };

    /*
      修改密码面板的显示或隐藏
    */
    _hideEditPwdPanel = () => {
        this.setState({
            editPwdPanelShow: false
        })
    };

    render() {
        // 提交表单的数据
        const onFinish = values => {
            const {token, account_icon} = this.state;
            // 调用修改管理员信息接口
            changeAdminMsg(token, values.account_name, account_icon).then((result) => {
                if (result && result.status === 1) {
                    // 更新管理员信息
                    saveUser(result.data);
                    message.success(result.msg);
                    // 告知外界管理员信息修改成功
                    PubSub.publish('changeAdminMsg', {})
                }
            }).catch((error) => {
                message.error('管理员信息修改失败!')
            });
        };

        // 表单的栅格布局
        const formItemLayout = {
            labelCol: {
                sm: {span: 2},
            },
            wrapperCol: {
                sm: {span: 8},
            },
        };

        // 从事件中获取文件列表
        const normFile = e => {
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };

        const {account_icon} = this.state;

        return (
            <Card title="管理员信息编辑">
                <Form
                    {...formItemLayout}
                    onFinish={onFinish}
                    ref={this.formRef}
                >
                    {/*账户名*/}
                    <Form.Item
                        name="account"
                        label="账户名"
                    >
                        <Input disabled/>
                    </Form.Item>
                    {/*管理员名称*/}
                    <Form.Item
                        name="account_name"
                        label="管理员名称"
                        rules={[{required: true, message: '请添加您的昵称!'}]}
                    >
                        <Input placeholder={"请添加您的昵称"}/>
                    </Form.Item>
                    {/*管理员头像*/}
                    <Form.Item
                        name="account_icon"
                        label="管理员头像"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <KaiUploadImg upLoadBtnTitle={"上传头像"} upLoadName={"admin_avatar"}
                                      upLoadAction={"/api/auth/admin/upload_admin_icon"} uploadImg={account_icon}
                                      successCallBack={(name) => {
                                          console.log(name);
                                          this.setState({
                                              account_icon: name
                                          })
                                      }}/>
                    </Form.Item>
                    {/*尾部*/}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">修改</Button>
                        &nbsp;&nbsp;&nbsp;或者 &nbsp;&nbsp; <a onClick={() => this.editPassWord()}>修改密码?</a>
                    </Form.Item>
                </Form>
                <EditPassword visible={this.state.editPwdPanelShow} hideFunc={this._hideEditPwdPanel}/>
            </Card>
        )
    }
}