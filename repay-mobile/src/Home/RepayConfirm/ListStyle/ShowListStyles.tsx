import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../utils/styleRem/index';

export default styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - ${p2r(15 * 2)});
    box-sizing: border-box;
    height: ${p2r(45 * 2)};
    margin-left: ${p2r(15 * 2)};
    padding-right: ${p2r(15 * 2)};
    border-bottom: 1px solid #eee;
    color: #666;
    font-size: ${p2r(14 * 2)};
`;
