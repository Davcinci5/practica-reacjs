//Dependencias 
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//componentes
import Header from './Global/Header'
import Content from './Global/Content'
import Footer from './Global/Footer'

//datos
import items from '../data/menu' //<--- es un objeto

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;
    return (
      <div className="App">
       <Header title='CodeJobs' items={items}/> 
       <Content body={children} />
       <Footer copyright="&copy; Codejobs"/>
      </div>
    );
  }
}

export default App;
