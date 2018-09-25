import React from 'react';
import ReactDOM from 'react-dom';
import { Loading } from '..';

interface RequestLoadingTypes {
    show: () => void,
    hide: () => void
}

let div: any;
let timeOut = 0;
let timer = 50;
let beginTime:any;
let min = 500;
let win = window;
let counter = 0;
const RequestLoading: RequestLoadingTypes = {
    show() {
        clearTimeout(timeOut);
        beginTime = Date.now();
        counter++;
        timeOut = win.setTimeout(() => {
            div = document.createElement('div');
            document.body.appendChild(div);
            ReactDOM.render(<Loading  isShow={true} opacity={0}/>, div);
        }, timer);
    },
    hide() {
        clearTimeout(timeOut);
        const endTime = Date.now();
        const diff = endTime - beginTime;
        console.log('loading...' + diff);
        counter && counter--;
         // 不在timer毫秒内返回,并且时间小于min毫秒，设置阀值，最少显示XXX秒才隐藏
         if (diff > timer && diff < min) {
            setTimeout(() => {
                if (!counter && div) {
                    ReactDOM.unmountComponentAtNode(div);
                    document.body.removeChild(div);
                }
            }, min - (diff - timer));
        } else {
            // settimeout hack 串行接口
            setTimeout(() => {
                if (!counter && div) {
                    ReactDOM.unmountComponentAtNode(div);
                    document.body.removeChild(div);
                    div = null;
                }
            }, 100);
        }
        
    }
}

export default RequestLoading;
