import React from 'react';
import {ShowDiscountProps} from "./types";
import ListStyle from '../ListStyle';
import WithFormatted from '../WithFormatted';

export default WithFormatted(({formattedAmounts}: ShowDiscountProps)=>(
    <ListStyle>
        <span>红包抵扣</span>
        <span>￥ {formattedAmounts}</span>
    </ListStyle>
))
