// import { useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../services/authService'; // Adjust the import according to your Firebase configuration

// const useAuthStatus = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (authUser) => {
//       setUser(authUser);
//       setLoading(false);
//     });

//     return () => unsubscribe?.();
//   }, []);

//   return { user, loading };
// };

// export default useAuthStatus;
