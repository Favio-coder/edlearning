// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth,db } from '../credenciales'
import { doc, updateDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // Actualiza el estado con el usuario autenticado
    });
    return unsubscribe; // Limpia la suscripción cuando se desmonta el componente
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Actualiza el estado `isOnline` del usuario en Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { isOnline: true });
      console.log("El usuario si esta activo")
    } catch (error) {
      console.error("Error de inicio de sesión: ", error);
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      if (user) {
        // Actualiza el estado `isOnline` del usuario en Firestore antes de cerrar sesión
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { isOnline: false });
        console.log("El usuario no esta activo")
      }
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

