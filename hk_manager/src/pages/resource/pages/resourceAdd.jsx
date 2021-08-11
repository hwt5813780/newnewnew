import React from 'react'
import {Card, Form, Input, Select, Upload, message, Button} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import Moment from 'moment'

import KaiUploadImg from '../../../components/KaiUploadImg'
import {
    getResourceClasses,
    getResourceMeta,
    getResourceFormat,
    getResourceCategory,
    getResourceArea,
    addResource
} from "../../../api/resourceApi";
import {getUser} from "../../../api/adminApi";

const {Option} = Select;


export default class AddResource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '/uploads/images/resource/default.jpeg',
            staff_id: [],
            profile: [],
            name: [],
            position: [],
            email: [],
        }
    }

    componentDidMount() {
        getResourceClasses().then((result) => {
            if (result && result.status === 1) {
                this.setState({
                    resource_classes: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        getResourceArea().then((result) => {
            if (result && result.status === 1) {
                this.setState({
                    resource_area: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        getResourceCategory().then((result) => {
            if (result && result.status === 1) {
                this.setState({
                    resource_category: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        getResourceFormat().then((result) => {
            if (result && result.status === 1) {
                this.setState({
                    resource_format: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        getResourceMeta().then((result) => {
            if (result && result.status === 1) {
                this.setState({
                    resource_meta: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 2}
            },
            wrapperCol: {
                xs: {span: 12}
            },
        };

        const {
            staff_id,
            profile,
            name,
            position,
            email,
        } = this.state;

        const onFinish = values => {
            const {imageUrl} = this.state;

            // 1. 生成创建日期
            const resource_publish_time = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

            // 2. 上传资源
            addResource(getUser().token, values.staff_id, imageUrl, values.name, values.position, values.phone, values.email).then((result) => {
                if (result && result.status === 1) {
                    message.success(result.msg);
                    this.props.history.goBack();
                }
            }).catch(() => {
                message.error('添加直播课失败!');
            })
        };

        return (
            <Card title="Add New Staff Member">
                <Form  {...formItemLayout} onFinish={onFinish} >
                    <Form.Item
                        label={"Staff ID"}
                        name="staff_id"
                        rules={[{required: true, message: 'Enter the ID'}]}
                    >
                        <Input style={{width:'30%'}}/>
                    </Form.Item>
                    <Form.Item
                        label={"Profile"}
                        name="profile"
                    >
                        <KaiUploadImg
                            upLoadBtnTitle={"Upload Profile"}
                            upLoadName={"profile"}
                            upLoadAction={"/api/auth/resource/upload_resource"}
                            successCallBack={(name) => {
                                this.setState({
                                    imageUrl: name
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"Name"}
                        name="name"
                        rules={[{required: true, message: 'Enter the name'}]}
                    >
                        <Input style={{width:'30%'}}/>
                    </Form.Item>
                    <Form.Item
                        label="Position"
                        name="position"
                        rules={[{required: true, message: 'Choose the position'}]}
                    >
                        <Select placeholder={"Choose Position"} style={{width: "30%"}}>
                            <Option value="Manager" key="Manager">Manager</Option>
                            <Option value="Purchaser" key="Purchaser">Purchaser</Option>
                            <Option value="Salesman" key="Salesman">Salesman</Option>
                            <Option value="Other" key="Other">Other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={"Phone"}
                        name="phone"
                        rules={[{required: true, message: 'Enter the phone'}]}
                    >
                        <Input style={{width:'30%'}}/>
                    </Form.Item>
                    <Form.Item
                        label={"Email"}
                        name="email"
                        rules={[{required: true, message: 'Enter the email'}]}
                    >
                        <Input style={{width:'30%'}}/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{span: 16}}
                    >
                        <div style={{position:"relative",left:150, marginTop: 30}}>
                            <Button type={"primary"} htmlType={"submit"} style={{marginRight: 15}}>Complete</Button>
                            <Button onClick={() => {
                                this.props.history.goBack()
                            }}>Cancel</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}