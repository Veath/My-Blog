import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    0% {
        opacity:0
    }
    100% {
        opacity:1
    }
`;
interface MaskProps {
    isShow?: boolean,
    opacity?: number
}

const Mask = styled.div`
    position: fixed;
    top:  0;
    left: 0;
    background: ${({ opacity = 0.4 }: MaskProps) => `rgba(0, 0, 0, ${opacity})`};
    height: 100%;
    width: 100%;
    animation: 0.3s ${fadeIn} ease-in-out;
    display: ${(props: MaskProps) => (props.isShow ? 'block' : 'none')};
    z-index: 10;
`;

export default Mask;
