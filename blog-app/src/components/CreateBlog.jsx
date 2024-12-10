import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import axios from "axios";


function CreateBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        if (!user) {
            alert("Please Login");
            return;
        }
        try {
            const token = await user.getIdToken();
            setLoading(true);
            await axios.post('http://localhost:5276/api/v1/blog', { title, content }, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                 },
            });
            alert('Post created');
            setTitle('');
            setContent('');
        }
        catch (error) { console.error('', error); }
        finally {
            setLoading(false);
        }
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