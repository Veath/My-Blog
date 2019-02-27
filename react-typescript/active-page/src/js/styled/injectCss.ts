import { injectGlobal } from "styled-components";

const global = injectGlobal`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
        -webkit-tap-highlight-color: transparent;
    }
    body {
        background: #fd4e40;
    }
`;

export default global