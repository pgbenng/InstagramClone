import React from 'react';
import axios from 'axios'; 

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    username: ""
    
    }
  
  }
  componentDidMount() {
    const context = this;
    axios.get('/auth/current-user')
    .then((userObj) => {
      context.setState({
        username: userObj.data.username
      });
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render() {
    return (
      <div>
        Hello World my name is {this.state.username}
      </div>
    )
  }
}
