import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Container } from 'reactstrap';

import ImageList from './pages/ImageList';
import AddImage from './pages/AddImage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <Route exact path='/' component={ImageList}/>
        <Route exact path='/addimage' component={AddImage}/>
      </Container>
    );
  }
}

export default App;
