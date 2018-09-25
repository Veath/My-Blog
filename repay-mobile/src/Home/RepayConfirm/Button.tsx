/**
 * @fileOverview 确认还款按钮
 */
import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../utils/styleRem/index';
import Button from '../../components/Button/index';

const ButtonExtend = styled(Button)`
    height: ${p2r(40 * 2)};
    width: ${p2r(335 * 2)};
    font-size: ${p2r(16 * 2)};
    margin: ${p2r(85 * 2)} ${p2r(20 * 2)} ${p2r(20 * 2)} ${p2r(20 * 2)};
`;

export default ({handleClick, disabled}: any) => (<ButtonExtend type={'primary'} onClick={handleClick} disabled={disabled}>确认</ButtonExtend>)
;
