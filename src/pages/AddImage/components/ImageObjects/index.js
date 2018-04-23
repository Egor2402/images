import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {RaisedButton, FlatButton, Dialog, SelectField, MenuItem} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

import * as imageActions from '../../../../redux/image';


class ImageObjects extends Component {
    state = {
        labelsDialogIsOpened: false,
        selectedLabel: null
    }

    addObject = () => {
        (new Promise((resolve, reject) => {
            this.props.imageActions.setAddImageDataState({resolveAddObjectPromise: resolve});
        })).then((location) => {
            this.props.imageActions.setAddImageDataState({
                imageObjects: [...this.props.addImageData.imageObjects, {location}],
                resolveAddObjectPromise: null
            });
        });
    }

    deleteObject = index => {
        const imageObjects = this.props.addImageData.imageObjects;
        imageObjects.splice(index, 1);
        this.props.imageActions.setAddImageDataState({imageObjects});
    }

    addLabel = () => {
        this.props.imageActions.getLabels();
        this.setState({labelsDialogIsOpened: true});
    }

    handleClose = () => this.setState({labelsDialogIsOpened: false});

    selectLabel = (event, index, value) => this.setState({selectedLabel: value});

    render() {
        const {image, imageObjects} = this.props.addImageData;

        const actions = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleClose}/>,
            <FlatButton label="Save" primary={true} onClick={this.handleClose} />
        ];

        return (
            <div>
                <Card>
                    <CardHeader title="Image Objects"/>
                    <CardText>
                        <Table selectable={false}>
                            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>Location</TableHeaderColumn>
                                    <TableHeaderColumn>Labels</TableHeaderColumn>
                                    <TableHeaderColumn style={{textAlign: 'center'}}>Actions</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    imageObjects.map((object, index) => {
                                        return (<TableRow key={index}>
                                            <TableRowColumn>
                                                <div>x: {object.location.x}</div>
                                                <div>y: {object.location.y}</div>
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <ContentAdd onClick={() => this.addLabel()} style={{cursor: 'pointer'}}/>
                                            </TableRowColumn>
                                            <TableRowColumn style={{textAlign: 'center'}}>
                                                <FlatButton primary={true} onClick={() => this.deleteObject(index)}>Delete</FlatButton>
                                            </TableRowColumn>
                                        </TableRow>);
                                    })
                                }
                            </TableBody>
                        </Table>
                        <div style={{textAlign: 'center', marginTop: 15}}>
                            <RaisedButton label="Add Object" disabled={!image} onClick={this.addObject}></RaisedButton>
                        </div>
                    </CardText>
                </Card>
                <Dialog
                    title="Add Label"
                    actions={actions}
                    modal={true}
                    open={this.state.labelsDialogIsOpened}
                >
                    <SelectField
                        fullWidth={true}
                        floatingLabelText="Labels"
                        value={this.state.selectedLabel}
                        onChange={this.selectLabel}
                    >
                        {
                            this.props.labels.map(label => {
                                return (<MenuItem key={label.ID} value={label.ID} primaryText={label.name} />);
                            })
                        }
                    </SelectField>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = ({image}) => ({addImageData: image.addImageData, labels: image.labels});
const mapDispatchToProps = (dispatch) => ({imageActions: bindActionCreators(imageActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(ImageObjects);
