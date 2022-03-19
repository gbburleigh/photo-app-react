import React from 'react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';
import {getHeaders} from './utils';
import {getCookie} from './utils';

class Post extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.model
        }
        this.requeryPost = this.requeryPost.bind(this);
    }

    requeryPost() {
        fetch(`https://photo-app-gbburleigh.herokuapp.com/api/posts/${this.state.post.id}`, {
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    post: data
                });
            });
    }

     render () {
        const post = this.state.post;
        if (!post) {
            return (
                <div></div>  
            );
        }
        return (
            <section className="card">
                <div className="header">
                    <h3>{ post.user.username }</h3>
                    <i className="fa fa-dots"></i>
                </div>
                
                <img 
                    src={ post.image_url } 
                    alt={'Image posted by ' +  post.user.username } 
                    width="300" 
                    height="300" />
                
                <div className="info">
                    <div className="icons">
                        <div className="leftSide">
                            <LikeButton 
                                postId={post.id} 
                                className="likeButton"
                                aria-label="Like Button"
                                likeId={post.current_user_like_id}
                                requeryPost={this.requeryPost} />

                            <button role="switch"
                                className="comment" 
                                aria-label="Comment Button">
                                <i className="far fa-comment" aria-hidden="true"></i>                      
                            </button>

                            <button role="switch"
                                className="share" 
                                aria-label="Share Button">
                                <i className="far fa-paper-plane" aria-hidden="true"></i>                      
                            </button>
                            
                        </div>
                        <div className="rightSide"><BookmarkButton
                                postId={post.id}
                                className="bookmarkButton"
                                aria-label="Bookmark Button"
                                saveId={post.current_user_bookmark_id}
                                requeryPost={this.requeryPost} />
                        </div>
                    </div>
                    <strong>{post.likes.length} likes</strong>
                    <p><strong>{post.user.username}:</strong>{post.caption }</p>
                    <p className="display-time">{post.display_time}</p>
                    <a>View all {post.comments.length} comments</a>
                    <AddComment post={post} 
                                requeryPost={this.requeryPost} />
                </div>
            </section> 
        );   
    }
    
}

export default Post;