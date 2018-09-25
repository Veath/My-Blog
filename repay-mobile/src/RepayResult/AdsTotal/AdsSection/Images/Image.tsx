import React, {Component} from 'react';
import {ImageProps} from "./types";
import ShowImage from './ShowImage'


export default class Image extends Component<ImageProps, {}>{
    get imageList() {
        const {adsItem} = this.props;
        return Array.isArray(adsItem.decorations) ? adsItem.decorations : [];
    }

    render() {
        return (
            <>
                {this.imageList.map((d, i) => (
                    <ShowImage src={d.picSrc} jumpParam={d.jumpParam} key={i} />
                ))}
            </>
        )
    }
}
