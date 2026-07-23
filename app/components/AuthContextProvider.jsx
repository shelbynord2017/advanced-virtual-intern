'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  signInAnonymously,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext(null);

// Define context, manage user state, and provide auth methods
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes (login, logout, register)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  const register = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userCredential.user.email,
      subscriptionStatus: 'inactive',
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      createdAt: serverTimestamp()
    });

    return userCredential;
  };

  const login = (e, p) => signInWithEmailAndPassword(auth, e, p);
  const guestLogin = () => signInAnonymously(auth);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, register, guestLogin, logout, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);