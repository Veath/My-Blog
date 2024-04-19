// 3[a]2[bc] --> aaabcbc
// 3[a2[c]] -->accaccacc

function decodeString1(str) {
    const countStack= []
    const stringStack = []
    let i=0
    let num = 0
    let res = ''
    while(i < str.length) {
        const char = str[i]
        if(char >= '0' && char < '9' ) {
            num = num * 10 + (+char)
        } else if (char === '[') {
            countStack.push(num)
            stringStack.push(res)
            num = 0
            res = ''
        } else if(char === ']') {
            const count = countStack.pop()
            let temStr = ''
            for(let j = 0; j < count; j++) {
                temStr += res
            }
            res = stringStack.pop() + temStr
        } else {
            res += char
        }
        i++
    }
    return res
}

console.log(decodeString1('3[a]2[bc]'))

function decodeString2(str) {
    innerDecodeString2(str, 0)
}

function innerDecodeString2(str, i) {
    let index = i
    let num = 0
    let res = ''
    while(index < str.length) {
        const char = str[index]
        if(char >= '0' && char < '9') {
            num = num * 10 + (+char)
        } else if (char === '[') {
            const [idx, temp] = innerDecodeString2(str, index + 1)
            index = idx
            for(let j = 0; i < num; j++) {
                res += temp
            }
            num = 0
        } else if (char === ']') {
            return [index, res]
        } else {
            res += char
        }
        i++
    }
    return res
}

console.log(decodeString1('3[a2[c]]'))