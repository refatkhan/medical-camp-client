import React, { createContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure.js";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.init.js"; // adjust path if needed
import useAxios from '../hooks/useAxios.js'
import axios from "axios";

// Create context
export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Providers
    const googleProvider = new GoogleAuthProvider();
    // 🔹 Sign Up
    const createUser = async (email, password) => {
        setLoading(true);
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result.user;
    };
    // 🔹 Sign In (Email/Password)
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    // 🔹 Google Sign In
    const googleSignIn = async () => {
        setLoading(true);
        const result = await signInWithPopup(auth, googleProvider);
        return result.user; // important!
    };
    // 🔹 Update User Profile
    const updateUserProfile = (name, photoURL, userParam) => {
        const currentUser = userParam || auth.currentUser;
        if (!currentUser) {
            throw new Error("No user is signed in for profile update");
        }
        return updateProfile(currentUser, {
            displayName: name,
            photoURL: photoURL,
        });
    };

    // 🔹 Log Out
    const logOut = async () => {
        setLoading(true);
        localStorage.removeItem("token");
        await signOut(auth);
        setUser(null);
        setLoading(false);
    };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser?.email) {
        const userData = { email: currentUser?.email };
        axios
          .post(
            "http://localhost:3000/jwt",
            userData
          )
          .then((res) => {
            const token = res.data.token;
            localStorage.setItem("token", token);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

    // 🔹 Observe User State
    const axiosInstance = useAxios();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                try {
                    const response = await axiosInstance.post("http://localhost:3000/jwt", {
                        email: currentUser.email,
                    });
                    localStorage.setItem("token", response.data.token);
                } catch (error) {
                    console.error("Failed to fetch JWT token:", error);
                    localStorage.removeItem("token");
                }
            } else {
                localStorage.removeItem("token");
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [axiosInstance]);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        updateUserProfile,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
