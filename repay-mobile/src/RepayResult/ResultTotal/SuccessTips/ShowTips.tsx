/**
 * @fileOverview 成功还款提示文字
 */

import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../utils/styleRem/index';
import {ShowSuccessTipsProps} from './types';

const TipsWrapper = styled.div`
    font-size: ${p2r(12 * 2)};
    color: #999;
    line-height: ${p2r(18 * 2)};
    padding-right: ${p2r(5 * 2)};
    margin-top: ${p2r(10 * 2)};
    margin-bottom: ${p2r( 10 * 2)};
`;

export default ({tips}: ShowSuccessTipsProps) => (
    <TipsWrapper>
        <h4>温馨提示：</h4>
        <p>{tips}</p>
    </TipsWrapper>
);
