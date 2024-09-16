import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyBlogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5276/api/v1/blog/myblogs', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`  // Pass token for authenticated requests
            }
        })
            .then(response => setBlogs(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>My Blogs</h1>
            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <div key={blog.id}>
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                        <p><strong>Posted on:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p>No blogs created by you.</p>
            )}
        </div>
    );
}

export default MyBlogs;
