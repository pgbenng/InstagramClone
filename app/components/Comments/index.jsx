import React from 'react';
import axios from 'axios'; 

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            commentTheyType: ''
        }
        
    }

    componentDidMount() {
        axios.get("/comments/getcomments", {
            params: {
                post_id: this.props.postid
            }
        })
        .then(result => {
            this.setState({
                result: result.data
            })      
        });
    }

    handleComment(e) {
        if (e.key === 'Enter') {
            axios.post("/comments/comments", {
                post_id: this.props.postid,
                comment: this.state.commentTheyType
            })
            .then(res => {
                this.setState({
                    result: this.state.result.concat({comment: this.state.commentTheyType}),
                    
                })
            })
        }
    }

    handleChange(e) {
        this.setState({
            commentTheyType: e.target.value 
        });
    }

    handleLikingComment(commentId, e) {
        console.log(commentId, 'commentID')
        // Save in database a new like
        // INSERT INTO like (comment_id) VALUES (1)
        axios.post("/likes/likingcomment", {
            comment_id: commentId
        })
        .then(res => {
            
        });
    }

    handleUnlikingComment(commentId, e) {
        axios.post("/likes/unlikingcomment", {
            comment_id: commentId
        })
        .then(res => {
            
        })
    }



    render() {

        console.log("line 51", this.state.result)
        return (
            <div>
                Comments:
                {this.state.result.map(result => {
                    return (
                        result.likes.length > 0 ? <div>{result.comment} <span onClick={this.handleUnlikingComment.bind(this, result.id)}> Unlike </span> </div> 
                            : <div>{result.comment} <span onClick={this.handleLikingComment.bind(this, result.id)}> Like</span> </div>
                    )
                })}

                
            <div> 
                <input onChange={this.handleChange.bind(this)} onKeyPress={this.handleComment.bind(this)}></input>
            </div>
            </div>
        )
    }
    
}


    

module.exports = Comments