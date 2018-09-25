/**
 * @fileOverview 继续还款按钮
 */
import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {px2rem as p2r} from '../../utils/styleRem/index';
import Button from '../../components/Button/index';

const ButtonExtend = styled(Button)`
    height: ${p2r(38 * 2)};
    font-size: ${p2r(16 * 2)};
    margin-top: ${p2r(20 * 2)};
    margin-bottom: ${p2r(20 * 2)};
`;

export default withRouter(({history}: any) => (<ButtonExtend type={'primary'} onClick={() => history.push('/')}>继续还款</ButtonExtend>))
;
