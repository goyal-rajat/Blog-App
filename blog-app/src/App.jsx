import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle, logOut } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
//import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import BlogList from "./components/BlogList";
import CreateBlog from "./components/CreateBlog";
//import { auth } from "./firebaseConfig";


function App() {
    const [user, setUser] = useState(null);
    //const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <h2>Welcome {user.user}</h2>
                    <button onClick={logOut}>Sign Out</button>
                    
                    <CreateBlog />
                </div>
            ) : (
                    <div>
                        <BlogList />
                        <CreateBlog/>
                    </div>
            )}
        </div>
    );
}

export default App;
