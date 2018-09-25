import React from 'react';
import styled from 'styled-components';
import { px2rem } from '../utils/styleRem';

const img = require('./images/no-data.png');

class Empty extends React.Component {
    render() {
        return (
            <div>
                <Image src={img} />
                <Text>当前暂无还款合同</Text>
            </div>
        )
    }
}

export default Empty;

const Image = styled.img`
    display: block;
    width: ${px2rem(220)};
    height: ${px2rem(220)};
    margin: ${px2rem(180)} auto ${px2rem(40)};
`;

const Text = styled.p`
    text-align: center;
    font-size: ${px2rem(28)};
    color:#999;
`;
