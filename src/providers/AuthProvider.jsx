import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const logout = async () => { await signOut(auth); };

  const value = useMemo(() => ({ user, logout, loading }), [user, loading]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() { return useContext(AuthCtx); }