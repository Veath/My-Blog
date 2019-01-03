const toggle = {
    props: {
        on: {
            type: Boolean,
            default: false
        }
    },
    render() {
        return this.$slots.default({
            on: this.currentState,
            setOn: this.setOn,
            setOff: this.setOff,
            toggle: this.toggle
        })
    },
    data() {
        return {
            currentState: this.on
        }
    },
    methods: {
        setOn() {
            this.currentState = true
        },
        setOff() {
            this.currentState = false
        },
        toggle() {
            this.currentState = !this.currentState
        }
    }
};