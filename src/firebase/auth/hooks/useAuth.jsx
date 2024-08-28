import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, dbFirestore } from '../../config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("authUser");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLoading(false);
    } else {
      const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
        if (authUser) {
          try {
            const q = query(collection(dbFirestore, "c_roles"), where("uid", "==", authUser.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              const role = userDoc.data().role;

              const userWithToken = {
                uid: authUser.uid,
                email: authUser.email,
                token: await authUser.getIdToken(),
                role,
              };

              sessionStorage.setItem("authUser", JSON.stringify(userWithToken));
              setUser(userWithToken);
            } else {
              console.error("No role found for this user.");
              sessionStorage.removeItem("authUser");
              setUser(null);
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
            sessionStorage.removeItem("authUser");
            setUser(null);
          }
        } else {
          sessionStorage.removeItem("authUser");
          setUser(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []); // Note the empty dependency array here

  return { user, loading };
};
