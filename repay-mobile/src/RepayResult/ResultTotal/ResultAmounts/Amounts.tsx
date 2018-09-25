/**
 * @fileOverview 还款金额显示
 */

import React, {Component} from 'react';
import amount from '../../../utils/amount/index'
import {AmountsProps} from "./types";
import ShowRepayAmounts from './ShowRepayAmounts'

export default class Amounts extends Component<AmountsProps, {}>{
    get formattedText() {
        const {repayAmount} = this.props;
        return `￥ ${amount(repayAmount, 2)}`
    }

    render() {
        return (
            <ShowRepayAmounts formattedAmount={this.formattedText} />
        )
    }
}


