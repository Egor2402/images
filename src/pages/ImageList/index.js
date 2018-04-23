import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {HeaderWithControls} from './styled';

import ImagesTable from './components/ImagesTable';

class ImageList extends Component {
    render() {
        return (
            <div>
                <HeaderWithControls>
                    <h2>List Images</h2>
                    <RaisedButton href="/addimage" label="Add Image"></RaisedButton>
                </HeaderWithControls>
                <ImagesTable></ImagesTable>
            </div>
        );
    }
}

export default ImageList;
