import { css } from 'styled-components';
const styleFade: any = css`
    .fade-enter {
        opacity: 0;
        animation-duration: .5s;
        animation-fill-mode: both;
        animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
        animation-play-state: paused;
    }
    .fade-appear {
        opacity: 0;
        animation-duration: .5s;
        animation-fill-mode: both;
        animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
        animation-play-state: paused;
    }
    .fade-leave {
        animation-duration: .5s;
        animation-fill-mode: both;
        animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
        animation-play-state: paused;
    }
    .fade-enter.fade-enter-active {
        animation-name: fadeIn;
        animation-play-state: running;
    }
    .fade-appear.fade-appear-active {
        animation-name: fadeIn;
        animation-play-state: running;
    }
    .fade-leave.fade-leave-active {
        animation-name: fadeOut;
        animation-play-state: running;
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .fade-enter,
    .fade-leave,
    .fade-appear {
        animation-duration: 0.3s;
    }
`;

const styleScale: any = css`
    .scale-enter,
    .scale-leave {
        display: block;
    }
    .scale-enter,
    .scale-appear {
        opacity: 0;
        animation-duration: .2s;
        animation-fill-mode: both;
        animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
        animation-play-state: paused;
    }
    .scale-leave {
        animation-duration: .2s;
        animation-fill-mode: both;
        animation-timing-function: cubic-bezier(0.6, -0.3, 0.74, 0.05);
        animation-play-state: paused;
    }
    .scale-enter.scale-enter-active,
    .scale-appear.scale-appear-active {
        animation-name: amZoomIn;
        animation-play-state: running;
    }
    .scale-leave.scale-leave-active {
        animation-name: amZoomOut;
        animation-play-state: running;
    }
    @keyframes amZoomIn {
        0% {
            opacity: 0;
            transform-origin: 50% 50%;
            transform: scale(0, 0);
        }
        100% {
            opacity: 1;
            transform-origin: 50% 50%;
            transform: scale(1, 1);
        }
    }
    @keyframes amZoomOut {
        0% {
            opacity: 1;
            transform-origin: 50% 50%;
            transform: scale(1, 1);
        }
        100% {
            opacity: 0;
            transform-origin: 50% 50%;
            transform: scale(0, 0);
        }
    }
`;

const stylePopup: any = css`
    .popup-enter {
        opacity: 0;
        animation-duration: .2s;
        animation-fill-mode: both;
        animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
        animation-play-state: paused;
    }
    .popup-appear {
        opacity: 0;
        animation-duration: .2s;
        animation-fill-mode: both;
        animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
        animation-play-state: paused;
    }
    .popup-leave {
        animation-duration: .2s;
        animation-fill-mode: both;
        animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
        animation-play-state: paused;
    }
    .popup-enter.popup-enter-active {
        animation-name: popupIn;
        animation-play-state: running;
    }
    .popup-appear.popup-appear-active {
        animation-name: popupIn;
        animation-play-state: running;
    }
    .popup-leave.popup-leave-active {
        animation-name: popupOut;
        animation-play-state: running;
    }
    @keyframes popupIn {
        0% {
            opacity: 0;
            transform:translate3d(0, 100%, 0);
        }
        100% {
            opacity: 1;
            transform:translate3d(0, 0, 0);
        }
    }
    @keyframes popupOut {
        0% {
            opacity: 1;
            transform:translate3d(0, 0, 0);
        }
        100% {
            opacity: 0;
            transform:translate3d(0, 100%, 0);
        }
    }
    .popup-enter,
    .popup-leave,
    .popup-appear {
        animation-duration: 0.2s;
    }
`;

const stylePopLeft: any = css`
    .popleft-enter {
        opacity: 0;
        animation-duration: .2s;
        animation-fill-mode: both;
        animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
        animation-play-state: paused;
    }
    .popleft-appear {
        opacity: 0;
        animation-duration: .2s;
        animation-fill-mode: both;
        animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
        animation-play-state: paused;
    }
    .popleft-leave {
        animation-duration: .2s;
        animation-fill-mode: both;
        animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
        animation-play-state: paused;
    }
    .popleft-enter.popleft-enter-active {
        animation-name: popleftIn;
        animation-play-state: running;
    }
    .popleft-appear.popleft-appear-active {
        animation-name: popleftIn;
        animation-play-state: running;
    }
    .popleft-leave.popleft-leave-active {
        animation-name: popleftOut;
        animation-play-state: running;
    }
    @keyframes popleftIn {
        0% {
            opacity: 0;
            transform:translate3d(100%, 0, 0);
        }
        100% {
            opacity: 1;
            transform:translate3d(0, 0, 0);
        }
    }
    @keyframes popleftOut {
        0% {
            opacity: 1;
            transform:translate3d(0, 0, 0);
        }
        100% {
            opacity: 0;
            transform:translate3d(100%, 0, 0);
        }
    }
    .popleft-enter,
    .popleft-leave,
    .popleft-appear {
        animation-duration: 0.2s;
    }
`;

export { styleScale, styleFade, stylePopup, stylePopLeft }