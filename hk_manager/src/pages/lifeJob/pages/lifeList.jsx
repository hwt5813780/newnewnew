import React from 'react'
import {Card, Button, Table, Switch, Divider, Modal, message, notification} from 'antd'
import {getJobList, setFocusJob, deleteJob} from "../../../api/lifejobApi";
import config from "../../../config/config";
import {saveObj} from "../../../tools/cache-tool";

export default class LifeList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            jobList: [],
            totalSize: 0,
            pageSize: 4
        }
    }

    componentDidMount() {
        // 加载列表数据
        this._loadData();
    }

    _loadData = (page_num=1, page_size=4)=>{
        getJobList(page_num, page_size).then((result)=>{
            if(result && result.status === 1){
                message.success(result.msg);
                this.setState({
                    totalSize: result.data.job_count,
                    jobList: result.data.job_list
                })
            }
        }).catch(()=>{
            message.error('获取直播课程失败!');
        })
    };

    // 列的配置信息
    columns = [
        {title: 'ID', dataIndex: 'id', key: 'id', width: 50, align: 'center'},
        {title: '职场人生标题', dataIndex: 'job_name', key: 'job_name',align: 'center'},
        {
            title: '职场人生封面', dataIndex: 'job_img', key: 'job_img',align: 'center',
            render: (text, record) => {
                return (
                    <img src={config.BASE_URL + record.job_img} alt="人生封面" width={100}/>
                )
            }
        },
        {title: '所属作者', dataIndex: 'job_author', key: 'job_author',align: 'center'},
        {
            title: '首页焦点', dataIndex: 'is_focus', key: 'is_focus',align: 'center',
            render: (text, record) => {
                return (
                    <Switch
                        checkedChildren="是"
                        unCheckedChildren= "否"
                        disabled={record.focus_img.length === 0}
                        defaultChecked={record.is_focus === 1}
                        onChange={(checked)=>{
                            setFocusJob(record.id, checked ? 1 : 0).then((result)=>{
                                if(result && result.status === 1){
                                    notification["success"]({
                                        message: `人生: ${record.job_name}`,
                                        description: `${checked ? '设置为' : '取消'}焦点人生!`
                                    });
                                }
                            })
                        }}
                    />
                )
            }
        },
        {
            title: '操作', align: 'center',
            render: (text, record) => {
                return (
                    <div>
                        <Button onClick={()=>{
                             // 往本地存储一个tag
                             saveObj('life_job_tag','edit');
                             this.props.history.push({
                                 pathname: '/lifejob/add-edit',
                                 state: {
                                     job: record
                                 }
                             });
                        }}>编辑</Button>
                        <Divider type="vertical" />
                        <Button onClick={()=>{
                            Modal.confirm({
                                title: '确认删除吗?',
                                content: '删除此资源,所有关联的内容都会被删除',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: ()=> {
                                    deleteJob(record.id).then(result=>{
                                        if(result && result.status === 1){
                                            message.success(result.msg);
                                            this._loadData();
                                        }else {
                                            message.error('删除失败!');
                                        }
                                    }).catch(()=>{
                                        message.error('删除失败!');
                                    })
                                }
                            });
                        }}>删除</Button>
                    </div>
                )
            }
        },
    ];

    render() {
        // 添加按钮
        let addBtn = (
            <Button type={"primary"} onClick={() => {
                // 往本地存储一个tag
                saveObj('life_job_tag','add');
                this.props.history.push('/lifejob/add-edit');
            }}>
                添加人生资源
            </Button>
        );

        return (
            <Card title={"人生资源列表"} extra={addBtn}>
                <Table
                    columns={this.columns}
                    dataSource={this.state.jobList}
                    rowKey={"id"}
                    pagination={{
                        total: this.state.totalSize,
                        pageSize: this.state.pageSize,
                        onChange: (pageNum, pageSize)=>{
                            console.log('需要加载' + pageNum, pageSize);
                            this._loadData(pageNum, pageSize);
                        }
                    }}
                />
            </Card>
        )
    }
}