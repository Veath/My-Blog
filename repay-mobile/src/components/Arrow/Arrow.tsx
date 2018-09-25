import React from 'react';
import styled from 'styled-components'
import { px2rem } from '../../utils/styleRem';

const icon = require('./images/arrow-right.png');

interface Props {
    direction?: string,
    [x: string]: any,
}

class Arrow extends React.Component<Props> {
    render () {
        let rotate = 0;
        switch (this.props.direction) {
            case 'up':
                rotate = -90;
                break;
            case 'down':
                rotate = 90;
                break;
            case 'left':
                rotate = 180;
                break;
            default:
                rotate = 0
        }
        return (<ArrowIcon rotate={rotate}/>);
    }
}

export default Arrow;

const ArrowIcon = styled.i`
    display: inline-block;
    width: ${px2rem(32)};
    height: ${px2rem(32)};
    vertical-align: middle;
    background-image:url(${icon});
    background-size: cover;
    transform: rotate(${(props: {rotate: number}) => props.rotate + 'deg'});
    transition: .25s ease-in;
`;
