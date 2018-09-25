import React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "../utils/styleRem";

const overdueIcon = require('./images/overdue-white.png');

interface Props {
    amount: number,
    date: string,
    overdue?: boolean
}

class MainPanel extends React.Component<Props> {
    render() {
        return (
            <Container>
                <Text>当前应还(元)</Text>
                <Amount overdue={this.props.overdue}>{this.props.amount}</Amount>
                {this.props.amount > 0 && <Text>最近一笔待还</Text>}
                {this.props.amount > 0 && <Text>最后还款日：{this.props.date}</Text>}
            </Container>
        )
    }
}
export default MainPanel;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: ${px2rem(266)};
    background-color: #00BBC0;
    text-align: center;
    color:#fff;
    padding: ${px2rem(40)} 0;
    &::before {
        content: 'REPAY';
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 0;
        vertical-align: bottom;
        color: rgba(0,0,0,0.02);
        font-size: ${px2rem(178)};
        line-height: ${px2rem(148)};
        font-weight: bolder;
    }
`;

const Amount = styled.span`
    display: inline-block;
    position: relative;
    font-size: ${px2rem(52)};
    line-height: ${px2rem(52)};
    padding: ${px2rem(20)};
    ${(props: { overdue?: boolean }) => props.overdue && css`
        &::after {
            content: '';
            position: absolute;
            top: 5%;
            right: 0;
            transform: translateX(75%);
            display: block;
            width: ${px2rem(74)};
            height: ${px2rem(28)};
            background-image: url(${overdueIcon});
            background-size: cover;
        }
    `}
`;

const Text = styled.p`
    opacity: 0.8;
    font-size: ${px2rem(28)};
    line-height: ${px2rem(28)};
    &:last-child {
        margin-top: ${px2rem(10)};
    }
`;
