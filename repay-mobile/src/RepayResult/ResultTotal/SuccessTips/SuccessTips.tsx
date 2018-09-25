/**
 * @fileOverview 成功还款提示文字
 */

import React, {Component} from 'react';
import amount from '../../../utils/amount/index'
import {SuccessTipsProps} from './types';
import ShowTips from './ShowTips';

export default class SuccessTips extends Component<SuccessTipsProps, {}> {
    get tipsText() {
        const {repayAmount} = this.props;
        return `您已成功还款￥${amount(repayAmount, 2)},银行到账存在一定的延迟，请勿重复还款，已即有分期实际到账通知为准`
    }

    render() {
        return (<ShowTips tips={this.tipsText}/>)
    }
}
