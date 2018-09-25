import React from 'react';
import styled from 'styled-components';
import { px2rem } from '../utils/styleRem';
import { Button } from '../components'

const editIcon = require('./images/icon-edit.png');

interface Props {
    edit: () => void,
    confirm: () => void,
    topping?: boolean
}

class ControlBar extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }
    render() {
        return (
            <Container topping={this.props.topping}>
                <Wrapper>
                    还款金额：
                    <Amount>2000.00</Amount>
                    <Edit onClick={this.props.edit}/>
                </Wrapper>
                <RepayButton type='primary' onClick={this.props.confirm}>确定还款</RepayButton>
            </Container>
        );
    }
}

export default ControlBar;

const Container = styled.div`
    z-index: ${({topping}: {topping?: boolean}) => topping ? 1000 : 0};
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${px2rem(14)};
    padding-left: ${px2rem(30)};
    background-color: #fff;
    border-top: solid 1px #eee;
`;

const Wrapper = styled.div`
    flex: auto;
    color: #000;
    font-size: ${px2rem(28)};
`;

const Amount = styled.span`
    color: #FF0129;
    font-size: ${px2rem(36)};
    &::before {
        content: '￥';
        display: inline-block;
        width: ${px2rem(30)};
        font-size: ${px2rem(28)};
    }
`;

const Edit = styled.span`
    display: inline-block;
    width: ${px2rem(36)};
    height: ${px2rem(36)};
    margin-left: ${px2rem(29)};
    vertical-align: bottom;
    background-image: url(${editIcon});
    background-size: cover;
`;

const RepayButton = styled(Button)`
    width: ${px2rem(256)};
`;
