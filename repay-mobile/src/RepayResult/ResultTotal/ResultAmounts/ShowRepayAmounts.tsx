/**
 * @fileOverview 还款金额显示
 */

import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../utils/styleRem/index';


const ContainerWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: ${p2r(50 * 2)};
    box-sizing: border-box;
    border-top: 2px solid #EEE;
    border-bottom: 2px solid #EEE;
    padding-left: ${p2r(3 * 2)};
    line-height: ${p2r(48 * 2)};
    font-size: ${p2r(16 * 2)};
    margin-top: ${p2r(30 * 2)};
`;

export default ({formattedAmount}: any) => (
    <ContainerWrapper>
        <span>还款金额：</span>
        <span>{formattedAmount}</span>
    </ContainerWrapper>
);
