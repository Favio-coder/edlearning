import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FaUserCircle } from 'react-icons/fa';

function UserEditProfile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const db = getFirestore();

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('No se encontró el documento');
        }
      }
    };
    getUserData();
  }, [user, db]);

  if (!userData) {
    return <div style={{ color: 'white' }}>Cargando...</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", paddingTop: "80px" }}>
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid" style={{ display: "flex", justifyContent: "start" }}>
            <a className="navbar-brand" href="/authenticated" style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
              <p className="mb-0" style={{ color: "#00A2B6", fontWeight: "bold", fontSize: "1.5rem" }}>Smart</p>
              <p className="mb-0" style={{ color: "black", fontWeight: "bold", fontSize: "1.5rem" }}>Finanzas</p>
            </a>
          </div>
        </nav>
      </header>

      <div className="card" style={{ width: "500px", padding: "40px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)", borderRadius: "10px", backgroundColor: "white", textAlign: "center", alignItems: "center" }}>
        <FaUserCircle size={120} color="#00A2B6" style={{ marginBottom: "20px" }} />
        <h2 style={{ color: "#00A2B6" }}>¡Bienvenido, {userData.nombre}!</h2>
        <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Nombres: <span style={{ fontWeight: "normal" }}>{userData.nombre}</span></p>
        <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Apellidos: <span style={{ fontWeight: "normal" }}>{userData.apellidos}</span></p>
        <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Fecha de nacimiento: <span style={{ fontWeight: "normal" }}>{userData.date}</span></p>
        <p style={{ fontWeight: "bold" }}>Edad: <span style={{ fontWeight: "normal" }}>{userData.age}</span></p>
      </div>
    </div>
  );
}

export default UserEditProfile;
