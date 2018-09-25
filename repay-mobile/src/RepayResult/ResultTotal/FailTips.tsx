/**
 * @fileOverview 还款失败信息
 */

import React, {Component} from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../utils/styleRem/index';

const FailTipsWrapper = styled.p`
    font-size: ${p2r(14 * 2)};
    color: #a4a4a4;
    margin-top: ${p2r(15 * 2)};
`;
export default () => (
    <FailTipsWrapper>很抱歉，本次还款失败，请稍后重试</FailTipsWrapper>
)
