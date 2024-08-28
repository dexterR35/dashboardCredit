import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setUser(null);
        sessionStorage.removeItem("authUser");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
