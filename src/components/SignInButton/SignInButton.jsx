import React, { useState } from "react";
import { auth, provider, signInWithPopup, signOut, db } from "../../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; // ✅ Firestore methods
import "./SignInButton.css";

const SignInButton = () => {
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const signedInUser = result.user;
      setUser(signedInUser);

      // ✅ Create a Firestore doc reference
      const userRef = doc(db, "users", signedInUser.uid);

      // ✅ Check if the user already exists
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        // Save only if new user
        await setDoc(userRef, {
          name: signedInUser.displayName,
          email: signedInUser.email,
          photoURL: signedInUser.photoURL,
          uid: signedInUser.uid,
          createdAt: new Date().toISOString(),
        });
        console.log("User data saved in Firestore");
      } else {
        console.log("User already exists in Firestore");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.error("Sign-out error:", error));
  };

  return (
    <>
      {user ? (
        <button onClick={handleSignOut} className="signin-button">
          Sign Out ({user.displayName})
        </button>
      ) : (
        <button onClick={handleSignIn} className="signin-button">
          Sign In with Google
        </button>
      )}
    </>
  );
};

export default SignInButton;
