import styled from 'styled-components';
import { px2rem } from '../../utils/styleRem';
import { ButtonType } from './types';

const Button = styled.button`
    display: flex;
    font-size: ${px2rem(30)};
    width: 100%;
    color: #000;
    height: ${px2rem(72)};
    align-items: center;
    justify-content: center;
    border-radius: ${px2rem(50)};
    border: 1px solid #ddd;
    ${({ type }: ButtonType) => {
        switch (type) {
            case 'primary':
                return `
                    color: white;
                    background: #00bbc0;
                    border: 0;
                `;
            case 'colorful':
                return `
                    color: white;
                    background: linear-gradient(to right, #00d9dc, #00bbc0);
                    border: 0;
                `;
        }
    }};
    ${({ disabled = false }: ButtonType) => disabled && `color: rgba(255, 255, 255, 0.6);
    opacity: 0.4;`};
    
`;

export default Button;
