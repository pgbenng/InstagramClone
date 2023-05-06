import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Photo from "../Photo/index.jsx";
import Comments from "../Comments/index.jsx";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      followerCount: 0,
      followingCount: 0,
      isFollowing: false,
      filetoUpload: new FormData(),
      captionTheyType: "",
      bio: ""
    };
  }

  componentDidMount() {
    var context = this;
    axios
      .get("/pictures/userphotos", {
        params: {
          username: this.props.params.username
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          images: res.data
        });
      });
    axios
      .get("/users/following", {
        params: {
          followingUsername: this.props.params.username
        }
      })
      .then(res => {
        console.log(res, "line 37");
        this.setState({
          followingCount: res.data.influencers.length
        });
      });

    axios
      .get("/users/followers", {
        params: {
          influencerUsername: this.props.params.username
        }
      })
      .then(res => {
        console.log(res, "line 49");
        this.setState({
          followerCount: res.data.followers.length
        });
      });

    axios
      .get("/users/isFollowing", {
        params: {
          influencerUsername: this.props.params.username
        }
      })
      .then(res => {
        console.log(res, "line 62");
        this.setState({
          isFollowing: res.data
        });
      });

      axios.get("/users/bio", {
        params: {
          username: this.props.params.username
        }
      })
      .then(res => {
        this.setState({
          bio: res.data
        })
      })
  }

  handlefollow() {
    axios
      .post("/users/follow", {
        usernametofollow: this.props.params.username
      })

      .then(res => {
        this.setState({
          followerCount: this.state.followerCount + 1,
          isFollowing: !this.state.isFollowing
        });
      });
  }

  handleunfollow() {
    axios
      .post("/users/unfollow", {
        usernametounfollow: this.props.params.username
      })

      .then(res => {
        this.setState({
          followerCount: this.state.followerCount - 1,
          isFollowing: !this.state.isFollowing
        });
      });
  }

  onSubmitPhoto() {
    axios.post("/users/uploadimage");
    alert("wow");
  }

  handleUploadFile(e) {
    const data = this.state.filetoUpload;
    data.set("caption", this.state.captionTheyType);

    axios.post("/pictures/upload", data).then(res => {
      this.setState({
        images: this.state.images.concat(res.data)
      });
    });
  }

  handleFileChange(e) {
    let data = this.state.filetoUpload;
    data.append("file", e.target.files[0]);
    this.setState({
      filetoUpload: data
    });
  }

  handleCaption(e) {
    this.setState({
      captionTheyType: e.target.value
    });
  }

 

  render() {
    let { images } = this.state;
    images = images ? images : [];

    console.log(this.state);

    return (
      <div>
        <img
          id="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          alt="Instagram"
          width="200px"
          height="80px"
        ></img>
       
        <br></br>
        <br></br>
        <div> Followers: {this.state.followerCount}</div>
        <div> Following: {this.state.followingCount} </div>
        {this.state.isFollowing ? (
          <a onClick={this.handleunfollow.bind(this)}> Unfollow </a>
        ) : (
          <a onClick={this.handlefollow.bind(this)}> Follow </a>
        )}
        <br></br>
        <br></br>
        

        <input type="file" onChange={this.handleFileChange.bind(this)} />
        <input
          type="text"
          onChange={this.handleCaption.bind(this)}
          placeholder="Enter the caption"
        ></input>
        <button onClick={this.handleUploadFile.bind(this)}></button>
        <br></br>
        <br></br>
        <div>
          {images.map(image => (
            <div>
              <Photo
                img={image.imageurl}
                username={image.User.username}
                caption={image.caption}
                imgId={image.id}
                isLiked={image.likes}
              />
              <Comments postid={image.id} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

module.exports = Profile;
