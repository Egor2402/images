import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import { Image } from './styled';

import * as imageActions from '../../../../actions/ImageActions';

class ImagesTable extends Component {
  deleteImage = (image) => {
    this.props.imageActions.deleteImage(image.id);
  }

  render() {
    const { images } = this.props
    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Image</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Labels</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {images.map(image => {
            return (
              <TableRow key={image.id}>
                <TableRowColumn><Image src={image.imgSrc} /></TableRowColumn>
                <TableRowColumn>{image.description}</TableRowColumn>
                <TableRowColumn></TableRowColumn>
                <TableRowColumn>
                  <FlatButton primary={true}>Edit</FlatButton>
                  <FlatButton primary={true} onClick={() => this.deleteImage(image)}>Delete</FlatButton>
                </TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = ({image}) => ({image});

const mapDispatchToProps = (dispatch) => ({imageActions: bindActionCreators(imageActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(ImagesTable);