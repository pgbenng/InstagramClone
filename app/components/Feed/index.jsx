import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Photo from "../Photo/index.jsx";
import Comment from "../Comments/index.jsx"

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state = {
      username: ""
    };
  }

  componentDidMount() {
    var context = this;
    axios
      .get("/pictures/photos")
      .then(images => {
        console.log(images);  
        context.setState({
          images: images.data
        });
      })
      .catch(err => {
        console.error(err);
      });
    var context = this;
    axios
      .get("/auth/current-user")
      .then(userObj => {
        console.log(userObj);
        context.setState({
          username: userObj.data.username
        });
      })
      .catch(err => {
        console.error(err);
      });
  }


  handleBio(e) {
    this.setState({
      bio: e.target.value
    });
  }

  handleBioSubmit(e) {
    axios
      .post("/users/bio", {
        bio: this.state.bio
      })
      .then(res => {
        console.log(res);
      });
  }
  render() {
    let { images } = this.state;
    images = images ? images : [];

    return (
      <div>
        <img id="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
        alt="Instagram"width="200px"height="80px"></img>
        <div> This is the real instagram, hello {this.state.username}</div>
        <br></br>
        <div>
        <div> {this.state.bio}</div>
        <input
          type="text"
          onChange={this.handleBio.bind(this)}
          placeholder="Update your bio"
        />
        <button onClick={this.handleBioSubmit.bind(this)} />
          {images.map(image => (
            <div>
            <Photo img={image.imageurl} />
            <Comment/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

module.exports = Feed;
