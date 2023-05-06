import React            from 'react';
import axios            from 'axios';

class Signup extends React.Component {
  constructor (props) {
    super (props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeInput = this.changeInput.bind(this);

    this.state = {
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    };
  }

  changeInput(event) {
    const type = event.target.dataset.type;
    const value = event.target.value;

    this.setState({
      [type]: value
    });
  }

  handleSubmit(e) {
    const context = this;
    e.preventDefault();
    axios.post('/auth/signup', {
       username: context.state.username,
       password: context.state.password,
    })
    .then((response) => {
      window.location = '/photos';
    })
  }

  render() {
    return (
      <div>
        <img id="loginlogo"src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
    ></img>
        <form onSubmit={this.handleSubmit}>
          <div className="form-inputs">
            <input 
              onChange={this.changeInput}
              className="login-input"
              type='text'
              placeholder='username'
              data-type='username'
              />
            <span id="username"></span>
            <input 
              onChange={this.changeInput}
              className="login-input"
              type='password' 
              placeholder='password'
              data-type='password'
              />
            <span id="password"></span>
            <input 
              onChange={this.changeInput}
              className="login-input"
              type='text' 
              placeholder='firstName'
              data-type='firstName'
              />
            <span id="firstName"></span>
            <input 
              onChange={this.changeInput}
              className="login-input"
              type='text' 
              placeholder='lastName'
              data-type='lastName'
              />
            <span id="lastName"></span>
            <div className="submit">
              <button id="submit" className="btn btn-success">Sign Up</button>
            </div>
          </div>
        </form>
        <div id="error">
        </div>
      </div>
    );
  }
}

module.exports = Signup;
