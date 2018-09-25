import React from 'react';
import {ShowRePayProps} from "./types";
import ListStyle from '../ListStyle';
import WithFormatted from '../WithFormatted';

export default WithFormatted(({formattedAmounts}: ShowRePayProps)=>(
    <ListStyle>
        <span>还款金额</span>
        <span>￥ {formattedAmounts}</span>
    </ListStyle>
))
