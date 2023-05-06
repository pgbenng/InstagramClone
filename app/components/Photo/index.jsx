import React from 'react';
import axios from 'axios';

export default class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false 
    }
  }
  
  componentDidMount() {
    //I want to get whether or not this post is liked
    // Select statement would look like
    // SELECT * FROM Likes WHERE post_id = ?
    axios.get('/likes/isLiked', {
        params: {
          post_id: this.props.imgId
        }
    })
    .then (res =>{
      
      this.setState({
        isLiked: res.data
      })
    })
  }
    
  

  handleLike() {
    axios.post("/likes/likes", {
      posttoLike: this.props.imgId

    })
    .then (res => {
      alert('liked')
      this.setState({
        isLiked: !this.state.isLiked
      })
    })
  }

  handleUnLike() {
    axios.post("/likes/unlikes", {
      posttoUnLike: this.props.imgId
    })
    .then (res => {
      alert('unliked') 
      this.setState({
        isLiked: !this.state.isLiked
      })
    })
  }


  render() {
  
    return (
      <div>
      
      <div className="photo-container">
        <p className="user-details"> {this.props.username}</p>
        <img src={this.props.img}/>
        <p className="caption"> {this.props.caption}</p>
        {this.state.isLiked ? <div onClick={this.handleUnLike.bind(this)}> Unlike</div> :<div onClick={this.handleLike.bind(this)}> Like</div>} 
      </div>
      </div>
    )
  }
}
