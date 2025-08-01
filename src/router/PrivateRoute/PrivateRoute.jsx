import React, { useEffect, useState } from 'react';
import { Navigate, useLocation,  } from 'react-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../firebase/firebase.init'; // তোমার firebase config path

const auth = getAuth(app);

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location =useLocation();

 
 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user) {
    return <Navigate state={{  from: location.pathname
}} to="/login" />;
  }

  return children;
};

export default PrivateRoute;
