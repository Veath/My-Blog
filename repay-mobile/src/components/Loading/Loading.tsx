import React, { Component } from 'react';
import styled from 'styled-components';
import { Mask } from '../';

const LoadingIcon = require('./images/loading.gif');

interface LoadingProp {
    isShow: boolean,
    opacity?: number
}

export default class Loading extends Component<LoadingProp> {
    constructor(props: LoadingProp) {
        super(props);
    }
    render() {
        return (
            <Mask {...this.props} style={{ zIndex: 9999 }}>
                <IconContainer>
                    <img src={LoadingIcon} />
                </IconContainer>
            </Mask>
        );
    }
}

const IconContainer = styled.div`
    width:160px;
    height:160px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate3d(-50%,-50%,0);
    img {
        width:100%;
    }
`;
