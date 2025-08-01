import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import app from "../firebase/firebase.init"; 

const auth = getAuth(app);

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // <-- লোডিং স্টেট যোগ করলাম

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setLoading(false);  // ইউজার লোড হলে লোডিং false হবে
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  return { user, loading, logout };  // loading রিটার্ন করো
};

export default useAuth;
