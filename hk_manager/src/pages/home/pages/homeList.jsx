import React, {Component} from 'react'
import TopCard from "./../components/topCard/topCard";
import SourceCount from "./../components/sourceCount/sourceCount";
import BuyCount from "./../components/buyCount/buyCount";
import './../css/home.css'

export default class HomeList extends Component {
    render() {
        return (
            <div className='home'>
                {/*头部*/}
                <div className='home-top'>
                    <TopCard
                        pathLink="/home/common"
                        iconClassName="icon iconfont icon-hezuohuobanmiyueguanli"
                        cardMainTitle="通用配置"
                        cardSubTitle="客户端通用信息配置"
                        bgColor="red"
                    />
                    <TopCard
                        pathLink="/home/common"
                        iconClassName="icon iconfont icon-fuwudiqiu"
                        cardMainTitle="管理员中心"
                        cardSubTitle="管理员管理"
                        bgColor="purple"
                    />
                    <TopCard
                        pathLink="/home/common"
                        iconClassName="icon iconfont icon-shenjing"
                        cardMainTitle="系统说明"
                        cardSubTitle="系统使用说明"
                        bgColor="orange"
                    />
                </div>
                {/*内容*/}
                <div className='home-content'>
                    <div className="home-content-card"><SourceCount/></div>
                    <div className="home-content-card"><BuyCount/></div>
                </div>
            </div>
        );
    }
}