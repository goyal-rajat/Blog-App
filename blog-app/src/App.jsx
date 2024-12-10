import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle, logOut } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
//import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import BlogList from "./components/BlogPost";
import CreateBlog from "./components/CreateBlog";
import MyBlogs from './components/MyBlogs';
import BlogPosts from './components/BlogPost';
//import { auth } from "./firebaseConfig";


function App() {
    const [user, setUser] = useState(null);
    //const navigate = useNavigate();
    const [view, setView] = useState('allBlogs');
    const [token, setToken] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const idToken = await user.getIdToken(user);
                setToken(idToken);
            }
            else {
                setUser(null);
                setToken('');
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="App">
            {user ? (
                <div>
                    <h2>Welcome {user.displayName}</h2>
                    <button onClick={logOut}>Sign Out</button>
                    <CreateBlog />
                    <div>
                        <a onClick={() => setView('allBlogs')}> View All Blogs</a>
                        <a onClick={() => setView('myBlogs')}> View My Blogs</a>
                    </div>

                    {view == 'allBlogs' ? <BlogPosts token={token}/> : <MyBlogs token={token} user={user} />}
                    
                </div>
            ) : (
                    <div>
                        <h2>Please sign in</h2>
                        < button onClick={signInWithGoogle}>Sign In with Google</button>
                        
                    </div>
            )}
        </div>
    );
}

export default App;
