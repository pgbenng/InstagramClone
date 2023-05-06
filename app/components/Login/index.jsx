import React            from 'react';
import axios            from 'axios';

class Login extends React.Component {
  constructor (props) {
    super (props);
    console.log(props)

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeInput = this.changeInput.bind(this);

    this.state = {
        username: '',
        password: '',
        
  }
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
    axios.post('/auth/login', {
       username: context.state.username,
       password: context.state.password,
    })
    .then((response) => {
      window.location = '/photos';
    })
  }
  render () {
    return (
   
    <div>
    <div id="loginbox">
    <img id="loginlogo"src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
    ></img>
    
      <form onSubmit={this.handleSubmit}>
          <div className="form-inputs">
            <input 
              onChange={this.changeInput}
              id="login-input"
              type='text'
              placeholder='Username'
              data-type='username'
              />
            <span id="username"></span>
            <input 
              onChange={this.changeInput}
              id="login-input"
              type='password' 
              placeholder='Password'
              data-type='password'
              />
            <span id="password"></span>
            
            
            <div className="submit">
              <button id="submit" className="btn btn-success">Login</button>
              <p id="or">-----------------------------OR-----------------------------</p>
              <img id="facebooklogo"src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png" width="30px" height="30px"></img>
              <a id="facebook"  target="__blank"href="https://d33v4339jhl8k0.cloudfront.net/docs/assets/528e78fee4b0865bc066be5a/images/557713bee4b027e1978e6251/file-PLMb6wnQ3b.png">
                Log in with Facebook
              </a>
            </div>
          </div>
        </form>
        <div id="error">
          <a href="https://www.youtube.com/watch?v=-15VC4Yxzys" target="__blank"> Forgot your password?</a>
          
        </div>
        <div id="github">
        <a href="https://github.com/pgbenng/" target="__blank"> <img id="github"src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"></img>
        </a>
        </div>

      </div>
      <div id="signupbox">
        <p>Don't have an account? <a href="/signup"> Sign up </a></p>
      </div>
      <div id="gettheapp">
      <p> Get the app. </p>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="__blank"><img id="appstore" src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png">
      </img></a>
      <a href="https://i.kym-cdn.com/photos/images/newsfeed/001/515/417/144.jpg" target="__blank"><img id="googleplay"src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png">
      </img></a>
      </div>
      </div>
      
    );
  }
    
    
  }








module.exports = Login;