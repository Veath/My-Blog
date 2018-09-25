import React from 'react';
import styled, { css } from 'styled-components'
import { px2rem } from '../../utils/styleRem';

interface ItemType {
    key?: number | string,
    value?: string,
    selected?: boolean
}

interface TabProps {
    select: (e: any) => void,
    list: Array<ItemType>,
    currentIndex: number
}

class Tab extends React.Component<TabProps> {
    constructor (props: TabProps) {
        super(props);
    }
    render () {
        return (
            <Container onClick={this.props.select}>
                {this.props.list.map((item: ItemType, index) =>
                    <TabItem
                        data-index={index}
                        selected={this.props.currentIndex === index}
                        key={item.key}>
                        {item.value}
                    </TabItem>
                )}
            </Container>
        );
    }
}

export default Tab;

const Container = styled.ul`
    display: flex;
    width: 100%;
    padding: ${px2rem(16)} 0;
    background-color:#36C8CC;
`;

const TabItem = styled.li`
    position: relative;
    flex: 1;
    text-align: center;
    color:#fff;
    font-size: ${px2rem(28)};
    line-height: ${px2rem(48)};
    &:not(first-child) {
        border-left: solid 1px #68D5D8;
    }
    ${(props: ItemType) => props.selected && css`
        font-size: ${px2rem(30)};
        &::after {
            content: '';
            position: absolute;
            bottom: ${px2rem(-18)};
            left: 50%;
            transform: translateX(-50%);
            display: block;
            width: ${px2rem(22.6)};
            height: ${px2rem(22.6)};
            box-sizing: border-box;
            border: solid ${px2rem(11.3)} transparent;
            border-bottom: solid ${px2rem(11.3)} #F5F5F5;
        }
    `}
`;
