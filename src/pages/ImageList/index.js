import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import RaisedButton from 'material-ui/RaisedButton';
import {HeaderWithControls} from './styled';

import ImagesTable from './components/ImagesTable';

import * as imageActions from '../../actions/ImageActions';

class ImageList extends Component {
    componentWillMount() {
        this.props.imageActions.getImagesList();
    }

    render() {
        const {images} = this.props.image;
        return (<div>
            <HeaderWithControls>
                <h2>List Images</h2>
                <RaisedButton href="/addimage" label="Add Image"></RaisedButton>
            </HeaderWithControls>
            <ImagesTable images={images}></ImagesTable>
        </div>);
    }
}

const mapStateToProps = ({image}) => ({image});
const mapDispatchToProps = (dispatch) => ({
    imageActions: bindActionCreators(imageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);
