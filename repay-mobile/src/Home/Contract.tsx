import React from 'react';
import styled, { css } from 'styled-components';
import { Radio } from '../components';
import { px2rem } from '../utils/styleRem';

const overdueIcon = require('./images/overdue-red.png');

interface Props {
    select: (e: any) => void,
    title?: string,
    index: number,
    currentIndex: number
}

class Contract extends React.Component<Props> {
    constructor (props: Props) {
        super(props);
    }
    render () {
        return (
            <Container>
                <Header>
                    <Radio
                        data-index={this.props.index}
                        onClick={this.props.select}
                        checked={this.props.index === this.props.currentIndex} />
                    <Title>{this.props.title}</Title>
                </Header>
                <List>
                    <Item>
                        <Name>商品贷(合同号：9910603222)</Name>
                        <Period>第3期/共12期</Period>
                        <Amount>应还金额：<span>¥1000.00</span></Amount>
                        <Date>还款日期：2018-09-06</Date>
                    </Item>
                    <Item>
                        <Name overdue={true}>商品贷(合同号：9910603222)</Name>
                        <Period>2018－09-01</Period>
                        <Amount>应还金额：<span>¥1000.00</span></Amount>
                        <Date>还款日期：2018-09-06</Date>
                    </Item>
                </List>
            </Container>
        );
    }
}

export default Contract;

const Container = styled.div`
    position: relative;
    margin-top: ${px2rem(16)};
    background-color:#fff;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: ${px2rem(68)};
    padding-left: ${px2rem(30)};
    border-bottom: solid 1px #eee;
`;

const Title = styled.div`
    font-size: ${px2rem(28)};
    font-weight: bolder;
    line-height: 100%;
    color: #333;
    margin-left: .5em;
`;

const List = styled.div`
    width: 100%;
    padding-left: ${px2rem(82)};
`;

const Item = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: ${px2rem(30)} ${px2rem(30)} ${px2rem(30)} 0;
    font-size: ${px2rem(24)};
    border-bottom: solid 1px #eee;
`;

const Name = styled.div`
    position: relative;
    color:#666;
    margin-bottom: ${px2rem(24)};
    ${(props: {overdue?: boolean}) => props.overdue && css`
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            transform: translateX(110%);
            display: block;
            width: ${px2rem(74)};
            height: ${px2rem(28)};
            background-image: url(${overdueIcon});
            background-size: cover;
        }
    `}
`;

const Period = styled.div`
    color:#999;
`;

const Amount = styled.div`
    color:#333;
    font-size: ${px2rem(28)};
    span {
        color:#000;
    }
`;

const Date = styled.div`
    color:#333;
`;

