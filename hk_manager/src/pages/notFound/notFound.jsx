import React, {Component} from 'react'
import {Button} from "antd";
import './css/notFound.css'

export default class NotFound extends Component {
    render() {
        return (
            <div className='not-found'>
                <Button type='primary' onClick={() => this.props.history.replace('/')}>回到首页</Button>
            </div>
        );
    }
}