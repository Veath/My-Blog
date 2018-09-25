import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../utils/styleRem/index';
import {ShowToPayProps} from "./types";
import WithFormatted from '../WithFormatted';

const ShowToPayWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${p2r(20 * 2)};
    margin-bottom: ${p2r(20 * 2)};
    font-size: ${p2r(32 * 2)};
    color: #333;
`;

export default WithFormatted(({formattedAmounts}: ShowToPayProps) => (
    <ShowToPayWrapper><span>￥{formattedAmounts}</span></ShowToPayWrapper>
))
