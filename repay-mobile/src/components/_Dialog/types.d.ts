import { ReactNode } from 'react';
import {InterpolationValue} from 'styled-components';
export interface DialogPropTypes {
    children?: ReactNode;
    onClose?: (e: any) => void;
    onAnimateLeave?: () => void;
    afterClose?: () => void;
    visible?: boolean | undefined;
    title?: ReactNode;
    footer?: ReactNode;
    wrapProps?: {};
    popup?: boolean;
    animateName?: string;
    animateCss?: InterpolationValue[];
    dafyStyle?: boolean;
}

export interface CotainerDivPropTypes {
    className?: string;
    animateCss?: InterpolationValue[];
    onMaskCick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

