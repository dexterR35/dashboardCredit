import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from "../../config";

// Check Authentication Status
export const checkAuthStatus = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          authUser.getIdToken().then(token => {
            const userWithToken = {
              uid: authUser.uid,
              email: authUser.email,
              token,
            };
            sessionStorage.setItem("authUser", JSON.stringify(userWithToken));
            setUser(userWithToken);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  return { user, loading };
};

// Sign In with Email and Password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    const userWithToken = {
      uid: user.uid,
      email: user.email,
      token,
    };
    sessionStorage.setItem("authUser", JSON.stringify(userWithToken));
    toast.success("Login successful!");
    return userWithToken;
  } catch (error) {
    handleAuthError(error);
    throw new Error(`Authentication error: ${error.message}`);
  }
};

// Register with Email and Password
export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    const userWithToken = {
      uid: user.uid,
      email: user.email,
      token,
    };
    sessionStorage.setItem("authUser", JSON.stringify(userWithToken));
    toast.success("Registration successful!");
    return userWithToken;
  } catch (error) {
    handleAuthError(error);
    throw new Error(`Authentication error: ${error.message}`);
  }
};

// Sign Out
export const Logout = async () => {
  try {
    await signOut(auth);
    sessionStorage.removeItem("authUser");
    toast.success("Logout successful!");
  } catch (error) {
    toast.error(`Logout error: ${error.message}`);
    throw new Error(`Logout error: ${error.message}`);
  }
};

// Error Handling
const handleAuthError = (error) => {
  switch (error.code) {
    case "auth/invalid-email":
      toast.error("Invalid email address.");
      break;
    case "auth/user-disabled":
      toast.error("User account has been disabled.");
      break;
    case "auth/user-not-found":
      toast.error("User not found.");
      break;
    case "auth/wrong-password":
      toast.error("Incorrect password.");
      break;
    default:
      toast.error(`Authentication error: ${error.message}`);
      break;
  }
};
