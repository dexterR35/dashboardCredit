import { signInWithEmailAndPassword,signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth, dbFirestore } from '../../config';
import { collection, query, where, getDocs } from 'firebase/firestore';


export const signInWithEmail = async (email, password) => {
  try {
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    const q = query(collection(dbFirestore, "c_roles"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No role found for this user.");
    }

    const userDoc = querySnapshot.docs[0];
    const role = userDoc.data().role;
    const userWithToken = {
      uid: user.uid,
      email: user.email,
      token,
      role,
    };

    sessionStorage.setItem("authUser", JSON.stringify(userWithToken));
    toast.success("Login successful!");
    return userWithToken;
  } catch (error) {
    handleAuthError(error);
    throw new Error(`Authentication error: ${error.message}`);
  }
};


export const logout = async () => {
  try {
    await signOut(auth);
    sessionStorage.clear(); // Clear all session storage
    localStorage.clear();   // Clear local storage (if necessary)
    toast.success("Successfully logged out.");
    return true; // Indicate that logout was successful
  } catch (error) {
    console.error("Error during logout:", error.message);
    toast.error(`Logout error: ${error.message}`);
    return false; // Indicate that logout failed
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

