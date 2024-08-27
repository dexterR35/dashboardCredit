
import { useState, useEffect, useMemo } from 'react';
import { getFirestore, collection, getDocs, query, orderBy, onSnapshot, setDoc, addDoc, doc, updateDoc, deleteDoc, where, serverTimestamp } from 'firebase/firestore';
import {
  getAuth,
  signOut,
  signInWithPopup, GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db } from '../../config'
import { toast } from "react-toastify";

const auth = getAuth();

export const checkAuthStatus = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        setUser(authUser);
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);
  
    return { user, loading };
  };
  

export const Login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success("Login successful!");
      return user;
    } catch (error) {
      // Handle different types of Firebase authentication errors
      switch (error.code) {
        case "auth/account-exists-with-different-credential":
          toast.error("An account already exists with a different credential.");
          break;
        case "auth/auth-domain-config-required":
          toast.error("Auth domain configuration is required.");
          break;
        case "auth/cancelled-popup-request":
          toast.error("Popup request was canceled. Please try again.");
          break;
        case "auth/operation-not-allowed":
          toast.error("Operation not allowed. Please contact support.");
          break;
        case "auth/popup-blocked":
          toast.error("Popup was blocked by the browser. Please enable popups and try again.");
          break;
        case "auth/popup-closed-by-user":
          toast.error("Popup closed by user. Please try again.");
          break;
        case "auth/unauthorized-domain":
          toast.error("This domain is not authorized. Please check your Firebase settings.");
          break;
        default:
          toast.error(`Authentication error: ${error.message}`);
          break;
      }
      throw new Error(`Authentication error: ${error.message}`);
    }
  };