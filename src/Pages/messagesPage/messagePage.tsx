import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { db, auth } from '../../credenciales';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

interface UserType {
  id: string;
  nombre?: string;
  email?: string;
  isOnline?: boolean;
}

function MessagePage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        updateDoc(doc(db, 'users', user.uid), { isOnline: true });
      } else {
        if (currentUser) {
          updateDoc(doc(db, 'users', currentUser.uid), { isOnline: false });
        }
        setCurrentUser(null);
      }
    });

    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as UserType));
      setUsers(usersList);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeUsers();
    };
  }, [currentUser]);

  return (
    <div>
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/authenticated" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <p className="mb-0" style={{ color: "#00A2B6", fontWeight: "bold" }}>Smart</p>
              <p className="mb-0" style={{ color: "black", fontWeight: "bold" }}>Finanzas</p>
            </a>
          </div>
        </nav>
      </header>

      <div style={{ marginTop: '80px', padding: '20px' }}>
        <h3 style={{color:'white'}}>Usuarios registrados:</h3>
        <ul className="list-group">
          {users.map(user => (
            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                {user.nombre || user.email}
              </div>
              <div className="d-flex align-items-center">
                <span
                  className={`badge me-2 ${user.isOnline ? 'bg-success' : 'bg-secondary'}`}
                  title={user.isOnline ? 'En línea' : 'Desconectado'}
                >
                  {user.isOnline ? 'En línea' : 'Desconectado'}
                </span>
                {/* Ícono de mensaje */}
                <Link to={`/chat/${user.id}`} className="text-decoration-none">
                  <i className="fas fa-comment" title="Enviar mensaje" style={{ fontSize: '1.2em', color: '#00A2B6' }}></i>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MessagePage;
