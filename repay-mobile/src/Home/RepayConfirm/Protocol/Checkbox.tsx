import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../utils/styleRem/index';
import {CheckboxProps} from "./types";
const checkboxUrl = require('./images/checkbox.png');

const CheckboxWrapper = styled<{checked: boolean}, 'span'>('span')`
    display: inline-block;
    height: ${p2r(15 * 2)};
    width: ${p2r(15 * 2)};
    margin-right: ${p2r(7 * 2)};
    box-sizing: border-box;
    background-image: ${({checked})=>(checked?`url(${checkboxUrl})`:'none')};
    border: ${({checked})=>(checked?'none':'1px solid #d8d8d8')};
    vertical-align: sub;
`;

export default ({checked, handleCheck}:CheckboxProps)=>(
    <CheckboxWrapper checked={checked} onClick={handleCheck}/>
)
