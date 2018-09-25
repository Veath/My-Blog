/**
 * @fileOverview 广告标题逻辑
 */

import React, {Component} from 'react';
import {TitleProps} from "./types";
import ShowTitle from './ShowTitle';

export default class Title extends Component<TitleProps, {}> {
    get iconSrc() {
        const {adsItem} = this.props;
        return (Array.isArray(adsItem.decoration) && adsItem.decorations[0] && adsItem.decorations[0].iconSrc) || undefined;
    }

    get text() {
        const {adsItem} = this.props;
        return (Array.isArray(adsItem.decoration) && adsItem.decorations[0] && adsItem.decorations[0].words) || '';
    }

    render() {
        return (
            <ShowTitle text={this.text} src={this.iconSrc}/>
        )
    }
}
