import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Dropzone from 'react-dropzone';

import * as imageActions from '../../../../redux/image';

class ImageBox extends Component {
    onDrop = files => {
        const image = files[0];
        this.props.imageActions.setAddImageDataState({image});
    }

    onImgClick = event => {
        const {resolveAddObjectPromise} = this.props.addImageData;
        if (resolveAddObjectPromise) {
            const leftPercent = (event.pageX - event.target.getBoundingClientRect().left) / event.target.offsetWidth;
            const topPercent = (event.pageY - event.target.getBoundingClientRect().top) / event.target.offsetHeight;
            resolveAddObjectPromise({
                x: leftPercent * event.target.naturalWidth,
                y: topPercent * event.target.naturalHeight
            });
        }
    }

    render() {
        const {image} = this.props.addImageData;
        const ImageZone = image
            ? <img onLoad={this.onImgLoad} onClick={this.onImgClick} src={image.preview} style={{width: '100%'}} alt="selected-img"/>
            : <Dropzone onDrop={this.onDrop} style={{width: '100%', height: 200, border: '2px dashed #ddd', cursor: 'pointer'}}></Dropzone>

        return (<div>{ImageZone}</div>);
    }
}

const mapStateToProps = ({image}) => ({addImageData: image.addImageData});
const mapDispatchToProps = (dispatch) => ({imageActions: bindActionCreators(imageActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(ImageBox);
