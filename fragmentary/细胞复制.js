// 1 个细胞的生命周期是 3 小时，1 小时分裂一次。求 n 小时后，容器内有多少细胞？
// f(n) = 2*f(n-1) - f(n-4)

function fn(n) {
    if (n < 0) return 0
    if(n === 0) return 1
    if (n === 1) return 2
    if (n === 2) return 4
    if (n === 3) return 7
    return fn(n-1) * 2 -fn(n - 4)
}