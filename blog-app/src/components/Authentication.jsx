import React, { useState, useEffect } from "react";
import { auth, signInWithGoogle, logOut } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";


function Authentication() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <p>
                        Welcome, {user.displayName}
                    </p>
                    <button onClick={logOut}> Sign Out</button>
                </div>
            ) : (
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            )}
        </div>
    );
}

export default Authentication;