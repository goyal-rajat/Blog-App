import React, { useState } from "react";
import axios from "axios";


function CreateBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5276/api/v1/blog', { title, content })
            .then(response => {
                alert('Post created');
                setTitle(title);
                setContent(content);
            })
            .catch(error => console.error(error));
    };
    return (
        <div>
            <h1>Create Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}

export default CreateBlog;