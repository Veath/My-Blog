import styled from 'styled-components';
import { px2rem } from '../../utils/styleRem';
import { RadioPropType } from './types';

const selectedIcon = require('./images/selected-icon.png')

const Radio = styled.div`
    width: ${px2rem(36)};
    height: ${px2rem(36)};
    border-radius: 100%;
    background-size: 100%;
    ${({ checked = false }: RadioPropType) => checked ? `
        background-image: url(${selectedIcon});
    ` : 'border: 1px solid #D8D8D8;'}}
`;

export default Radio;