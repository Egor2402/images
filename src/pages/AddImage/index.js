import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Row, Col} from 'reactstrap';
import {RaisedButton, Paper, TextField, FlatButton, Snackbar, FloatingActionButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import Dropzone from 'react-dropzone';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {HeaderWithControls, ControlsBlock} from './styled';

import * as imageActions from '../../actions/ImageActions';

class AddImage extends Component {
    state = {
        image: null,
        objects: [],
        resolveAddObjectPromice: null
    }

    onDrop = files => {
        const image = files[0];
        this.setState({image});
    }

    onImgClick = event => {
        if (this.state.resolveAddObjectPromice) {
            const leftPercent = (event.pageX - event.target.getBoundingClientRect().left) / event.target.offsetWidth;
            const topPercent = (event.pageY - event.target.getBoundingClientRect().top) / event.target.offsetHeight;
            this.state.resolveAddObjectPromice({
                x: leftPercent * event.target.naturalWidth,
                y: topPercent * event.target.naturalHeight
            });
            this.setState({resolveAddObjectPromice: null});
        }
    }

    addObject = () => {
        let promise = new Promise((resolve, reject) => {
            this.setState({resolveAddObjectPromice: resolve});
        });

        promise.then((location) => this.setState({objects: [...this.state.objects, {location}]}));
    }

    deleteObject = (index) => {
        const objects = this.state.objects;
        objects.splice(index, 1);
        this.setState({objects});
    }

    addLabel = () => {
        console.log('dsfdsf');
    }

    render() {
        const ImageZone = this.state.image
            ? <img onLoad={this.onImgLoad} onClick={this.onImgClick} src={this.state.image.preview} style={{width: '100%'}} alt="selected-img"/>
            : <Dropzone onDrop={this.onDrop} style={{width: '100%', height: 200, border: '2px dashed #ddd', cursor: 'pointer'}}></Dropzone>

        return (<div>
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
                        {ImageZone}
                    </Paper>
                    <Paper zDepth={1} style={{padding: 16}}>
                        <TextField floatingLabelText="Description" multiLine={true} rows={1} rowsMax={4} fullWidth={true}/>
                    </Paper>
                </Col>
                <Col sm={6} xs={12}>
                    <Card>
                        <CardHeader title="Image Objects"/>
                        <CardText>
                            <Table selectable={false}>
                                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Location</TableHeaderColumn>
                                        <TableHeaderColumn>Labels</TableHeaderColumn>
                                        <TableHeaderColumn>Actions</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {
                                        this.state.objects.map((object, index) => {
                                            return (<TableRow key={index}>
                                                <TableRowColumn>
                                                    <div>x: {object.location.x}</div>
                                                    <div>y: {object.location.y}</div>
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    <ContentAdd onClick={this.addLabel} />
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    <FlatButton primary={true} onClick={() => this.deleteObject(index)}>Delete</FlatButton>
                                                </TableRowColumn>
                                            </TableRow>);
                                        })
                                    }
                                </TableBody>
                            </Table>
                            <div style={{textAlign: 'center', marginTop: 15}}>
                                <RaisedButton label="Add Object" disabled={!this.state.image} onClick={this.addObject}></RaisedButton>
                            </div>
                        </CardText>
                    </Card>
                </Col>
            </Row>
            <Snackbar
                open={!!this.state.resolveAddObjectPromice}
                message="Please select space on image"
            />
        </div>);
    }
}

const mapStateToProps = ({image}) => ({image});
const mapDispatchToProps = (dispatch) => ({
    imageActions: bindActionCreators(imageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddImage);
