type func = (component: any) => void;

const compose = (...funcs: func[]) => (component: any) => {
    const len = funcs.length;
    if (!len) return component;
    return funcs.reduceRight((res: any, cur: any) => cur(res), component);
}

export default compose