import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import {Image} from './styled';

import * as imageActions from '../../../../redux/image';

class ImagesTable extends Component {
    componentWillMount() {
        this.props.imageActions.getImagesList();
    }

    deleteImage = image => {
        this.props.imageActions.deleteImage(image.ID);
    }

    editImage = image => {
        this.props.imageActions.getImage(image.ID);
    }

    render() {
        const {images} = this.props.imageListData;
        return (<Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>Image</TableHeaderColumn>
                    <TableHeaderColumn>Description</TableHeaderColumn>
                    <TableHeaderColumn>Labels</TableHeaderColumn>
                    <TableHeaderColumn style={{textAlign: 'center'}}>Actions</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {
                    images.map(image => {
                        return (<TableRow key={image.ID}>
                            <TableRowColumn><Image src={image.imgURL}/></TableRowColumn>
                            <TableRowColumn>{image.description}</TableRowColumn>
                            <TableRowColumn></TableRowColumn>
                            <TableRowColumn style={{textAlign: 'center'}}>
                                <FlatButton primary={true} onClick={() => this.editImage(image)}>Edit</FlatButton>
                                <FlatButton primary={true} onClick={() => this.deleteImage(image)}>Delete</FlatButton>
                            </TableRowColumn>
                        </TableRow>);
                    })
                }
            </TableBody>
        </Table>);
    }
}

const mapStateToProps = ({image}) => ({imageListData: image.imageListData});

const mapDispatchToProps = (dispatch) => ({
    imageActions: bindActionCreators(imageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagesTable);
