import * as React from 'react';
import styled from 'styled-components';
import { Modal, Arrow, Radio } from '../components';
import { px2rem } from '../utils/styleRem';

interface Props {
    title?: string[],
    amount: number,
    list: {
        name: string,
        price: number
    }[],
    select: (index: number) => void,
    selectedList?: number[],
    visible: boolean,
    onClose: () => void,
    animateCallback: () => void
}

export default function RedPacketPanel(props: Props) {
    return (
        <Modal
            popup
            dafyStyle
            visible={props.visible}
            onClose={props.onClose}
            afterClose={props.animateCallback}
        >
            <div>
                <Header onClick={props.onClose}>
                    <span>使用红包</span>
                    <span>还款红包：{props.amount}元 <Arrow direction='down' /></span>
                </Header>
                <List>
                    {
                        props.list.map((item, index) => {
                            return (
                                <Item key={index} onClick={() => props.select(index)}>
                                    <span>{item.name + '：' + item.price}元</span>
                                    <Radio checked={props.selectedList && props.selectedList.indexOf(index) > -1} />
                                </Item>
                            )
                        })
                    }
                </List>
            </div>
        </Modal>
    )
}

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: ${px2rem(28)};
    color: #333333;
    border-bottom: 1px solid #EEEEEE;
    padding: 0 ${px2rem(30)} ${px2rem(30)};
`;

const List = styled.ul`
    height: ${px2rem(468)};
    padding-left: ${px2rem(30)};
    overflow: scroll;
`;

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    padding: ${px2rem(28)} ${px2rem(28)} ${px2rem(28)} 0;
    border-bottom: 1px solid #EEEEEE;
    box-sizing: border-box;
    color: #666666;
    font-size: ${px2rem(28)};
    line-height: ${px2rem(28)};
`;


