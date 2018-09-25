import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Dialog';
import { px2rem } from '../../utils/styleRem';
import { DialogPropTypes } from './types';

class DialogWrap extends React.Component<DialogPropTypes, any> {
    container: HTMLElement | null;
    _component: any;
    constructor(props: DialogPropTypes) {
        super(props);
        this.container = null;
    }
    shouldComponentUpdate({ visible }: DialogPropTypes) {
        return !!(this.props.visible || visible);
    }
    componentWillUnmount() {
        this.removeContainer();
    }
    getContainer = () => {
        if (!this.container) {
            const container = document.createElement('div');
            document.body.appendChild(container);
            this.container = container;
        }
        return this.container;
    }
    saveRef = (node: any) => {
        this._component = node;
    }
    getComponent = (visible: boolean) => {
        const props = { ...this.props };
        return <Dialog {...props} visible={visible} ref={this.saveRef} onAnimateLeave={this.removeContainer}></Dialog>
    }
    removeContainer = () => {
        if (this.container) {
            (this.container as any).parentNode.removeChild(this.container);
            this.container = null;
        }
    }
    render() {
        const { visible = false } = this.props;
        if (visible || this._component) {
            console.log(this._component)
            return ReactDOM.createPortal(this.getComponent(visible), this.getContainer());
        }
        return null;
    }
}

export default DialogWrap;