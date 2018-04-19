import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col } from 'reactstrap';
import { RaisedButton, Paper, TextField, FlatButton } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { HeaderWithControls, ControlsBlock } from './styled';

import * as imageActions from '../../actions/ImageActions';

class AddImage extends Component {
  render() {
    const objects = [{id: 1, location: {x: 12, y: 130}}];
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
            <Paper zDepth={1} style={{textAlign: 'center', marginBottom: 15, padding: 16}}>
              <RaisedButton label="Select Image" style={{margin: '50px 0'}}></RaisedButton>
            </Paper>
            <Paper zDepth={1} style={{padding: 16}}>
              <TextField
                floatingLabelText="Description"
                multiLine={true}
                rows={1}
                rowsMax={4}
                fullWidth={true}
              />
            </Paper>
          </Col>
          <Col sm={6} xs={12}>
            <Card>
              <CardHeader title="Image Objects"/>
              <CardText>
                <Table>
                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                      <TableHeaderColumn>Location</TableHeaderColumn>
                      <TableHeaderColumn>Labels</TableHeaderColumn>
                      <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {objects.map(object => {
                      return (
                        <TableRow key={object.id}>
                          <TableRowColumn>{object.location.x}; {object.location.y}</TableRowColumn>
                          <TableRowColumn></TableRowColumn>
                          <TableRowColumn>
                            <FlatButton primary={true}>Delete</FlatButton>
                          </TableRowColumn>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <div style={{textAlign: 'center', marginTop: 15}}>
                  <RaisedButton label="Add Object"></RaisedButton>
                </div>
              </CardText>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ image }) => ({ image });
const mapDispatchToProps = (dispatch) => ({ imageActions: bindActionCreators(imageActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(AddImage);
