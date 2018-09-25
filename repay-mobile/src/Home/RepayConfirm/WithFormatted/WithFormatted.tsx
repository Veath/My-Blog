import React, {Component} from 'react';
import amount from '../../../utils/amount';
import {HandleFormatProps} from "./types";

export default (ToFormatted: any) => {
    return class HandleFormat extends Component<HandleFormatProps, {}>{
        get formattedAmounts() {
            const {amounts} = this.props;
            return amount(amounts, 2);
        }

        render() {
            return (
                <ToFormatted formattedAmounts={this.formattedAmounts}/>
            )
        }
    }
}


