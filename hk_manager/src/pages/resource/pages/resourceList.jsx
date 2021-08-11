import React from 'react'
import {Card, Button, Table, Switch, Divider, Modal, message, notification, Space} from 'antd'
import {getResourceList, setFocusResource, deleteResource} from "../../../api/resourceApi";
import config from "../../../config/config";
import Search from "antd/es/input/Search";

const getRandomUserParams = params => ({
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
});


export default class ResourceList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pagination: {
                current: 1,
                pageSize: 10,
                totalSize:0,
            },
            loading: false,
            order:"",
            field:"",
            value:"",
        }
    }

    componentDidMount() {
        // 加载列表数据
        const { pagination } = this.state;
        this.fetch({
            pagination

        });
    }

    handleInputChange = (value,event) => {

        this.state.value=value;
        this.fetch({
            value:value,
            pagination:this.state.pagination,
            sortField:this.state.field,
            sortOrder:this.state.order
        });
    };

    handleTableChange = (pagination, filters, sorter) => {
        this.state.pagination=pagination;
        if(!sorter.order){
            this.state.order="";
            this.state.field="";
        }else {
            this.state.order = sorter.order;
            this.state.field = sorter.field;
        }
        this.fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };

    fetch = (params = {}) => {
        this.setState({ loading: true });
        getResourceList(this.state.pagination.current, this.state.pagination.pageSize,  this.state.field, this.state.order, this.state.value).then((result) => {
            if (result && result.status === 1) {
                message.success(result.msg);
                console.log(result.data.resource_list);
                this.setState({
                    pagination: {
                        ...params.pagination,
                        totalSize: result.data.resource_count,
                    },
                    data: result.data.resource_list,
                    loading: false,
                })
            }
        }).catch(() => {
            message.error('Fail to list111!');
        })
    };

    // 列的配置信息
    columns = [
        {title: 'Staff ID', dataIndex: 'staff_id', key: 'staff_id', align: 'center',sorter: (a, b) => a.staff_id - b.staff_id,},
        {
            title: 'Profile', dataIndex: 'profile', key: 'profile', align: 'center',
            render: (text, record) => {
                return (
                    <img src={config.BASE_URL + record.profile} alt="profile" style={{width:50,borderRadius:'50%'}} />
                )
            }
        },
        {title: 'Name', dataIndex: 'name', key: 'name', align: 'center',sorter: (a, b) => a.name - b.name,},
        {title: 'Position', dataIndex: 'position', key: 'position', align: 'center',},
        {title: 'Phone', dataIndex: 'phone', key: 'phone', align: 'center'},
        {title: 'email', dataIndex: 'email', key: 'email', align: 'center'},
        {title: 'Purchase Quantity', dataIndex: 'purchase_quantity', key: 'purchase_quantity', align: 'center',sorter: (a, b) => a.purchase_quantity - b.purchase_quantity,},
        {title: 'Purchase Cost', dataIndex: 'purchase_cost', key: 'purchase_cost', align: 'center',sorter: (a, b) => a.purchase_cost - b.purchase_cost,},
        {title: 'Sale Quantity', dataIndex: 'sale_quantity', key: 'sale_quantity', align: 'center',sorter: (a, b) => a.sale_quantity - b.sale_quantity,},
        {title: 'Sale Value', dataIndex: 'sale_value', key: 'sale_value', align: 'center',sorter: (a, b) => a.sale_value - b.sale_value,},
        {
            title: 'Action', align: 'center',
            render: (text, record) => {
                return (
                    <div>
                        <Button  onClick={() => {
                            this.props.history.push({
                                pathname: '/resource/resource-edit',
                                state: {
                                    resource: record
                                }
                            });
                        }}>Edit</Button>
                        <Divider type="vertical"/>
                        <Button  danger onClick={() => {
                            Modal.confirm({
                                title: 'Delete',
                                content: 'Are you sure to delete the staff member?',
                                okText: 'Yes',
                                cancelText: 'No',
                                onOk: () => {
                                    deleteResource(record.id).then(result => {
                                        if (result && result.status === 1) {
                                            message.success(result.msg);
                                            this.fetch();
                                        } else {
                                            message.error('Delete Failed!');
                                        }
                                    }).catch(() => {
                                        message.error('Delete Failed!');
                                    })
                                }
                            });
                        }}>Delete</Button>
                    </div>
                )
            }
        },
    ];

    render() {
        // 添加按钮
        const { data, pagination, loading } = this.state;


        return (
            <div title={"Staff List" } >
                <div style={{marginBottom:16}}>
                    <Button type={"primary"} size="large" onClick={() => {
                        this.props.history.push('/resource/resource-add');
                    }}>
                        Add New Staff
                    </Button>
                    <Search
                        placeholder="Search ID, Name, Position"
                        size="large"
                        style={{ width: 350,float:"right" }}
                        onSearch={this.handleInputChange}
                    />
                </div>
                <Table
                    columns={this.columns}
                    dataSource={this.state.data}
                    rowKey={"id"}
                    loading={loading}
                    pagination={{
                        total:this.state.pagination.totalSize,
                        pageSize: this.state.pagination.pageSize,
                    }}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}