//import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';


import './css/Content.css';

class Content extends React.Component {
  /*constructor(){
    super();
    this.state = {
      count: 0,
      numero1: 0,
      numero2: 0,
      result: 0
    };
    this.handleCountClick = this.handleCountClick.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.handleResultClick = this.handleResultClick.bind(this);
    
  }

  componentDidMount(){
    this.setState({
      count:1
    });
  }

  handleCountClick(e){
    if(e.target.id === 'add')
    {
      this.setState({
        count: this.state.count + 1
      });
    }else if(e.target.id === 'substract' && this.state.count > 0)
    {
      this.setState({
        count: this.state.count - 1
      });
    }else
    {
      this.setState({
        count : 0
      });
    }
  }

  handleInputChanged(e){
    if(e.target.id === 'numero1')
    {
      this.setState({
        numero1: Number(e.target.value)
      });
    }else{
      this.setState({
        numero2: Number(e.target.value)
      });
    }
  }

  handleResultClick(){
    this.setState({
      result: Number(this.state.numero1 + this.state.numero2)
    });
  }
*/
static propTypes = {
  body: PropTypes.object.isRequired
};
  render() {
    const { body } = this.props;
    return (
      <div className="Content">
        {body}
      </div>
    );
  }
}

export default Content;
