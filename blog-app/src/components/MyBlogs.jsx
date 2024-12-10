import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from "../components/Comments";
import { auth } from "../firebaseConfig";

function MyBlogs() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdToken(user);

                axios.get('http://localhost:5276/api/v1/blog/myblogs', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                })
                    .then(response => setPosts(response.data))
                    .catch(error => console.error(error));
            }
        }; fetchBlogs();
    }, []);

    return (
        <div className="blog-posts-container">
            <h3>Blog Posts</h3>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post.id} className="blog-post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <div className="author">By {post.name} on {new Date(post.createdAt).toLocaleDateString()}</div>
                        {/* Comment Section */}
                        <div className="comment-section">
                            <h3>Comments</h3>
                            {/* You can map through the comments if you have them in your post data */}
                            {post.comments ? (
                                post.comments.map((comment, index) => (
                                    <div key={index} className="comment">
                                        <p>{comment.content}</p>
                                        <div className="comment-author">- {comment.name}</div>
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet.</p>
                            )}
                            {/* Add Comment Form */}
                            <Comment postId={post.id} />
                        </div>
                    </div>
                ))
            ) : (
                <p>No blog posts available.</p>
            )}
        </div>
    );
}

export default MyBlogs;
