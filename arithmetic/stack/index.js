function stack() {
    const arr = []
    return {
        size() {
            return arr.length
        },
        push(value) {
            arr.push(value)
        },
        pop() {
            return arr.pop()
        },
        clear() {
            arr.length = 0
        },
        get() {
            return arr
        }
    }
}

function browserStack() {
    const back = stack()
    const forward = stack()
    let current = null

    return {
        open(url) {
            back.push(url)
            forward.clear()
            current = url
        },
        goBack() {
            if (back.size()) {
                forward.push(current)
                current = back.pop()
            }
        },
        goForward() {
            if(forward.size()) {
                back.push(current)
                current = forward.pop()
            }
        },
        get() {
            return {back, forward, current}
        }
    }
}

const browser = browserStack()
browser.open(1)
browser.open(2)
browser.open(3)
browser.goBack()
browser.goForward()
console.log(browser.get().back.get())