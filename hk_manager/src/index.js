import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 1. 引入provider组件
import {Provider} from 'react-redux'
import store from './store/index'
import {ConfigProvider} from 'antd'
import moment from 'moment'

moment.locale('zh-uk')

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider>
            <App/>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);
