import React from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'

import {getSourceCount} from '../../../../api/homeApi'

export default class SourceCount extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this._loadData();
    }

    _loadData = () => {
        getSourceCount().then((result) => {
            let tempData = [];
            if (result.status === 1) {
                for (let k in result.data) {
                    tempData.push(result.data[k]);
                }
                // 更新状态机
                this.setState({
                    data: tempData
                });
            }
        });
    };


    getOption = () => {
        return {
            xAxis: {
                type: 'category',
                data: ['幼教', '职场', '活动', '直播']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.state.data,
                type: 'bar'
            }]
        }
    };

    render() {
        return (
            <Card title="各版块资源总数量统计">
                <ReactEcharts option={this.getOption()}/>
            </Card>
        )
    }
}