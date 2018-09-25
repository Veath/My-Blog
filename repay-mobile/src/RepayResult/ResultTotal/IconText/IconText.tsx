/**
 * @fileOverview 还款状态包裹组件
 */

import React, {Component} from 'react';
import {StatusIconTextProps} from './types';
import ShowIconText from './ShowIconText';

const fail = require('./images/icon_fail@2x.png');
const success = require('./images/icon_succeed@2x.png');


export default class Status extends Component<StatusIconTextProps, {}> {
    get statusIconSrc() {
        const {status} = this.props;
        return status ? success : fail;
    }

    get statusText() {
        const {status} = this.props;
        return status ? '还款成功' : '还款失败';
    }

    render() {
        return (
            <ShowIconText src={this.statusIconSrc} text={this.statusText}/>
        )
    }
}
