import React, {Component} from "react"
import {Card, Button, Table, Switch, Divider, Modal, message, notification} from 'antd'

import {getLive, deleteLive, setFocusLive} from '../../../api/liveApi'
import config from './../../../config/config'

export default class LiveList extends Component {
    state = {
        isLoading: false,
        liveList: [],
        totalSize: 0,
        pageSize: 4
    };

    componentDidMount() {
        // 加载列表数据
        this._loadData();
    }

    _loadData = (page_num = 1, page_size = 4) => {
        getLive(page_num, page_size).then((result) => {
            if (result && result.status === 1) {
                message.success(result.msg);
                this.setState({
                    totalSize: result.data.live_count,
                    liveList: result.data.live_list
                })
            }
        }).catch(() => {
            message.error('获取直播课程失败!');
        })
    };

    // 列的配置信息
    columns = [
        {title: 'ID', dataIndex: 'id', key: 'id', align: "center", width: 50},
        {title: '直播课标题', dataIndex: 'live_title', key: 'live_title', align: "center",},
        {
            title: '直播课封面', dataIndex: 'live_img', key: 'live_img', align: "center",
            render: (text, record) => {
                return (
                    <img src={config.BASE_URL + record.live_img} alt="课程封面" width={100}/>
                )
            }
        },
        {title: '直播课时间', dataIndex: 'live_begin_time', key: 'live_begin_time', align: "center"},
        {title: '直播课老师', dataIndex: 'live_author', key: 'live_author', align: "center"},
        {title: '直播课价格', dataIndex: 'live_price', key: 'live_price', align: "center"},
        {
            title: '首页焦点',
            dataIndex: 'is_focus',
            key: 'is_focus',
            align: "center",
            width: 100,
            render: (text, record) => {
                return (
                    <Switch
                        checkedChildren="是"
                        unCheckedChildren="否"
                        disabled={record.focus_img.length === 0}
                        defaultChecked={record.is_focus === 1}
                        onChange={(checked) => {
                            setFocusLive(record.id, checked ? 1 : 0).then((result) => {
                                if (result && result.status === 1) {
                                    notification["success"]({
                                        message: `课程: ${record.live_title}`,
                                        description: `${checked ? '设置为' : '取消'}焦点课程!`
                                    });
                                }
                            })
                        }}
                    />
                )
            }
        },
        {
            title: '操作',
            key: 'action',
            align: "center",
            width: 250,
            render: (text, record) => {
                return (
                    <span>
                        <Button onClick={() => {
                            this.props.history.push({
                                pathname: '/lives/edit-live',
                                state: {
                                    live: record
                                }
                            });
                        }}>编辑</Button>
                        <Divider type="vertical"/>
                        <Button onClick={() => {
                            Modal.confirm({
                                title: '确认是否删除',
                                content: '删除此课程, 所有关联内容都会被全部删除?',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: () => {
                                    deleteLive(record.id).then(result => {
                                        if (result && result.status === 1) {
                                            message.success(result.msg);
                                            this._loadData();
                                        } else {
                                            message.error('删除失败!');
                                        }
                                    }).catch(() => {
                                        message.error('删除失败!');
                                    })
                                }
                            });
                        }}>删除</Button>
                    </span>
                )
            }
        },
    ];

    render() {
        // 添加直播课
        let addBtn = (
            <Button type={"primary"} onClick={() => {
                this.props.history.push("/lives/add-live");
            }}>
                添加直播课
            </Button>);

        return (
            <Card title={"直播课列表"} extra={addBtn}>
                <Table
                    dataSource={this.state.liveList}
                    columns={this.columns}
                    rowKey={"id"}
                    bordered={true}
                    loading={this.state.isLoading}
                    pagination={{
                        total: this.state.totalSize,
                        pageSize: this.state.pageSize,
                        onChange: (pageNum, pageSize) => {
                            console.log("需要加载第" + pageNum, pageSize);
                        }
                    }}/>
            </Card>
        )
    }
}