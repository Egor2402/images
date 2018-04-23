import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Row, Col} from 'reactstrap';
import {RaisedButton, Paper, TextField, Snackbar} from 'material-ui';
import {HeaderWithControls, ControlsBlock} from './styled';

import ImageBox from './components/ImageBox';
import ImageObjects from './components/ImageObjects';

import * as imageActions from '../../redux/image';

class AddImage extends Component {
    render() {
        return (
            <div>
                <HeaderWithControls>
                    <h2>Add Image</h2>
                    <ControlsBlock>
                        <RaisedButton label="Save"></RaisedButton>
                        <RaisedButton href="/" label="Cancel"></RaisedButton>
                    </ControlsBlock>
                </HeaderWithControls>
                <Row>
                    <Col sm={6} xs={12}>
                        <Paper zDepth={1} style={{marginBottom: 15, padding: 16}}>
                            <ImageBox/>
                        </Paper>
                        <Paper zDepth={1} style={{padding: 16}}>
                            <TextField floatingLabelText="Description" multiLine={true} rows={1} rowsMax={4} fullWidth={true}/>
                        </Paper>
                    </Col>
                    <Col sm={6} xs={12}>
                        <ImageObjects/>
                    </Col>
                </Row>
                <Snackbar
                    open={!!this.props.addImageData.resolveAddObjectPromise}
                    message="Please select space on image"
                />
            </div>
        );
    }
}

const mapStateToProps = ({image}) => ({addImageData: image.addImageData});
const mapDispatchToProps = (dispatch) => ({
    imageActions: bindActionCreators(imageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddImage);
