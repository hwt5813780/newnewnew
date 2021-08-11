import React, {Component} from "react"
import {Card, Form, Input, Select, message, Button, DatePicker} from 'antd'
import Moment from 'moment'

import KaiUploadImg from '../../../components/KaiUploadImg'
import {addLive, getLivePerson, getLiveTheme} from '../../../api/liveApi'
import {getUser} from '../../../api/adminApi'

const {RangePicker} = DatePicker;
const {Option} = Select;


export default class Resource extends Component {

    state = {
        imageUrl: '', // 资源封面
        focusImgUrl: '', // 轮播图封面

        live_theme: [], // 直播主题数组
        live_person: [], // 直播适用人群数组
    };

    componentDidMount() {
        // 1. 获取直播适用人群
        getLivePerson().then((result) => {
            if (result && result.status === 1) {
                this.setState({
                    live_person: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        });

        // 2. 获取直播主题
        getLiveTheme().then((result) => {
            if (result && result.status === 1) {
                this.setState({
                    live_theme: result.data
                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    formItemLayout = {
        labelCol: {span: 3},
        wrapperCol: {span: 12},
    };

    render() {
        const onFinish = values => {
            const {imageUrl, focusImgUrl} = this.state;
            if (!imageUrl) {
                message.warning('请上传直播课封面!');
                return;
            }

            // 开始时间和结束时间
            const live_begin_time = Moment(values.live_time[0]).format('YYYY-MM-DD HH:mm:ss');
            const live_end_time = Moment(values.live_time[1]).format('YYYY-MM-DD HH:mm:ss');


            // 调用接口
            addLive(getUser().token, values.live_title, values.live_url, values.live_author, values.live_price, imageUrl, live_begin_time, live_end_time, values.live_person_id, values.live_theme_id, focusImgUrl).then((result) => {
                if (result && result.status === 1) {
                    message.success(result.msg);
                    this.props.history.goBack();
                }
            }).catch(() => {
                message.error('添加直播课失败!');
            })

        };

        const {live_theme, live_person} = this.state;
        return (
            <Card title="新增直播课">
                <Form {...this.formItemLayout} onFinish={onFinish}>
                    <Form.Item
                        label="直播课名称"
                        name="live_title"
                        rules={[{required: true, message: '请输入直播课名称!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="直播课作者"
                        name="live_author"
                        rules={[{required: true, message: '请输入直播课作者!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="直播课价格"
                        name="live_price"
                        rules={[{required: true, message: '请输入直播课价格!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="直播课时间"
                        name="live_time"
                        rules={[{required: true, message: '请输入直播课时间!'}]}
                    >
                        <RangePicker showTime/>
                    </Form.Item>
                    <Form.Item
                        label="适用人群"
                        name="live_person_id"
                        rules={[{required: true, message: '请选择适用人群!'}]}
                    >
                        <Select placeholder={"请选择适用人群"} style={{width: 150}}>
                            {
                                live_person.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item["live_person_name"]}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="内容主题"
                        name="live_theme_id"
                        rules={[{required: true, message: '请选择内容主题!'}]}
                    >
                        <Select placeholder={"请选择内容主题"} style={{width: 150}}>
                            {
                                live_theme.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item["live_theme_title"]}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="直播课地址"
                        name="live_url"
                        rules={[{required: true, message: '请输入直播课地址!'}]}
                    >
                        <Input placeholder="请输入直播课的地址"/>
                    </Form.Item>
                    <Form.Item
                        label="直播课封面图"
                        name="live_img"
                    >
                        <KaiUploadImg
                            upLoadBtnTitle={"上传封面图"}
                            upLoadName={"live_img"}
                            upLoadAction={"/api/auth/live/upload_live"}
                            successCallBack={(name) => {
                                message.success('直播课程封面上传成功!');
                                this.setState({
                                    imageUrl: name
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="首页轮播图"
                        name="focus_img"
                    >
                        <KaiUploadImg
                            upLoadBtnTitle={"上传焦点图"}
                            upLoadName={"live_img"}
                            upLoadAction={"/api/auth/live/upload_live"}
                            successCallBack={(name) => {
                                message.success('直播课焦点图上传成功!');
                                this.setState({
                                    focusImgUrl: name
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{span: 24}}
                    >
                        <div style={{textAlign: 'center', marginTop: 30}}>
                            <Button type="primary" htmlType="submit" style={{marginRight: 10}}>
                                保存
                            </Button>
                            <Button onClick={() => {
                                this.props.history.goBack()
                            }}>
                                取消
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}