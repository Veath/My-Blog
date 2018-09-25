import React from 'react';
import styled from 'styled-components';
import { px2rem } from '../utils/styleRem';
import Contract from './Contract';

interface Props {
    hasRedPacket?: boolean,
    select: (e: any) => void,
    currentIndex: number
}

class ContractList extends React.Component<Props> {
    initHeight = (e: any) => {
        if(!e) return;
        let h = document.documentElement.clientHeight - e.offsetTop;
        e.style.cssText = `height: ${h}px`
    };
    render() {
        return (
            <Container hasRedPacket={this.props.hasRedPacket} innerRef={e => this.initHeight(e)}>
                <Contract
                    title={'分期产品'}
                    select={this.props.select}
                    currentIndex={this.props.currentIndex}
                    index={0} />
                <Contract
                    title={'分期产品'}
                    select={this.props.select}
                    currentIndex={this.props.currentIndex}
                    index={1} />
                <Contract
                    title={'分期产品'}
                    select={this.props.select}
                    currentIndex={this.props.currentIndex}
                    index={2} />
            </Container>
        )
    }
}

export default ContractList;

const Container = styled.div`
    overflow-y: scroll;
    padding-bottom: ${(props: {hasRedPacket?: boolean}) => props.hasRedPacket ? px2rem(210) : px2rem(116)};
`;
