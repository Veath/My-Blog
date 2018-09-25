const Amount = (value: any, scale: number) => {
    if (value === undefined || value ==='' || value === 0) {
        return '0.00';
    }
    value = value + '';
    scale = scale === 0 ? 0 : scale > 0 && scale <= 20 ? scale : 2;
    let positiveNum: boolean = true;
    if (value.indexOf('-') === 0) {
        positiveNum = false;
        value = value.substring(1, value.length);
    }
    value = parseFloat(value.replace(/[^\d\.-]/g, '')).toFixed(scale) + '';
    const l: string[] = value
            .split('.')[0]
            .split('')
            .reverse(),
        r = value.split('.')[1];
    let t: string = '';
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
    }
    const result: string =
        t
            .split('')
            .reverse()
            .join('') +
        (r ? '.' +
            r : '');
    return positiveNum ? result : '-' + result;
};
export default Amount;
