import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS for styling
import { auth } from "../firebaseConfig";


// eslint-disable-next-line react/prop-types
function Comment({ blogId }) {
    const [content, setContent] = useState("");

    const user = auth.currentUser;
    if (!user) {
        alert("Please Login");
        return;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await user.getIdToken();
        await axios.post('http://localhost:5276/api/v1/blog/' + blogId + '/comment', { content, blogId }, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(response => {
                alert('Comment added!');
                setContent('');
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment"
                required
            />
            <button type="submit">Submit Comment</button>
        </form>
    );
}

export default Comment;
