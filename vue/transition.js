import {addClass, removeClass} from './dom'

let transition = {
    beforeEnter (el) {
        addClass(el, 'collapse-transition')
        el.style.height = 0
    },
    enter (el) {
        el.style.height = `${el.scrollHeight * 2}px`
    },
    afterEnter (el) {
        removeClass(el, 'collapse-transition')
    },
    beforeLeave (el) {
        el.style.height = `${el.scrollHeight}px`
    },
    leave (el) {
        if (el.scrollHeight !== 0) {
            addClass(el, 'collapse-transition')
            el.style.height = 0
        }
    },
    afterLeave (el) {
        removeClass(el, 'collapse-transition')
        el.style.height = 0
    }
}

export default {
    name: collapse,
    functional: true,
    render (h, {children}) {
        const data = {
            on: {...transition}
        }
    }
    return h('transition', data, children)
}