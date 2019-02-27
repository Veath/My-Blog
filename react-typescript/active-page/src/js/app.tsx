import * as React from "react"
import styled from "styled-components"

const bgUp = require("../img/bg_up.png");
const bgMid = require("../img/bg_mid.png");
const bgDown = require("../img/bg_down.png");
const btnBg = require("../img/btn.png");

interface UrlData {
    [key: string]: string;
}

interface ImgProps {
    src: string
}

interface AppProps {}

const Page = styled.div`
    img {
        display: block;
        width: 100%;
        height: 100%;
        vertical-align:bottom;
        margin-top: -2px;
    }
`;

const Btn = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: transparent;
    width: 85%;
`;

const Warp = styled.div`
    position: relative;
`;

const Img: React.SFC<ImgProps> = props => (
    <Warp>
        <img src={props.src}></img>
        {props.children}
    </Warp>
)

class App extends React.Component<AppProps> {
    constructor (props: AppProps) {
        super(props)
    }
    win:any = window
    getRequest = () => {
        const url = location.href;
        const theRequest:UrlData = {};
        if (url.indexOf('?') !== -1) {
            const str = url.substr(url.indexOf('?') + 1);
            const strs = str.split('&');
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
            }
        }
        return theRequest;
    }
    onClickHandler = () => {
        this.win._czc.push(["_setCustomVar", '点击按钮', this.getRequest().channel || 'All', 1]);
        setTimeout(() => {
            window.location.href = 'https://h.hnzycfc.com/alipaymarket/?channel=3101'
        }, 200)
    }
    componentDidMount () {
        console.log('report...')
        this.win._czc.push(["_setCustomVar", '访客渠道', this.getRequest().channel || 'All', 1]);
    }
    render() {
        return (
            <Page>
               <Img src={bgUp}></Img>
               <Img src={bgMid}></Img>
               <Img src={bgDown}>
                    <Btn onClick={this.onClickHandler}>
                        <Img src={btnBg}></Img>
                    </Btn>
               </Img>
            </Page>
        );
    }
}

export default App