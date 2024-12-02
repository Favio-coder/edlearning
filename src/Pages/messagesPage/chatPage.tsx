import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../../credenciales';
import { collection, doc, addDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

interface MessageType {
    id: string;
    senderId: string;
    text: string;
    timestamp: Timestamp;
}

function ChatPage() {
    const { userId } = useParams<{ userId: string }>(); // userId del usuario con el que se está chateando
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatUserName, setChatUserName] = useState<string | null>(null);
    const [searchText, setSearchText] = useState(''); // Para la búsqueda por contenido de mensaje
    const [filteredMessages, setFilteredMessages] = useState<MessageType[]>([]);
    const currentUser = auth.currentUser;

    // Construye el ID único para la conversación
    const conversationId = currentUser
        ? [currentUser.uid, userId].sort().join('_')
        : '';

    useEffect(() => {
        // Obtener el nombre del usuario con el que se está chateando
        const fetchUserName = async () => {
            if (userId) {
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    setChatUserName(userDoc.data()?.nombre || 'Usuario');
                }
            }
        };

        fetchUserName();

        // Escuchar los mensajes en tiempo real
        const messagesRef = collection(db, 'conversations', conversationId, 'messages');
        const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            // Leer los mensajes de la base de datos y ordenarlos manualmente
            let loadedMessages: MessageType[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            } as MessageType));

            // Ordenar los mensajes de manera manual (FIFO)
            loadedMessages.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

            // Agregar un log para ver cómo cambian los mensajes
            console.log('Mensajes cargados y ordenados:', loadedMessages);

            // Actualizamos el estado con los mensajes ordenados
            setMessages(loadedMessages);
        });

        return () => unsubscribe();
    }, [conversationId, userId]);

    // Función para enviar un mensaje
    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        if (currentUser) {
            const messageData = {
                senderId: currentUser.uid,
                text: newMessage,
                timestamp: Timestamp.now(),
            };
            console.log("Mensaje entrando a la cola")

            console.log('Enviando mensaje:', messageData);

            await addDoc(collection(db, 'conversations', conversationId, 'messages'), messageData);
            setNewMessage('');
        }
    };

    // Función para filtrar mensajes por contenido
    // Función para filtrar mensajes por contenido
    useEffect(() => {
        if (searchText.trim()) {
            const foundMessages = messages.filter((message) =>
                message.text.toLowerCase().includes(searchText.toLowerCase())
            );

            // Ordenar los mensajes filtrados en orden FIFO (de más antiguo a más reciente)
            foundMessages.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

            // Agregar un log para ver los mensajes que se han encontrado al aplicar el filtro
            console.log('Mensajes filtrados y ordenados (FIFO):', foundMessages);

            setFilteredMessages(foundMessages);
        } else {
            setFilteredMessages(messages);
        }
    }, [searchText, messages]);


    return (
        <div>
            <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a
                            className="navbar-brand"
                            href="/authenticated"
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                        >
                            <p className="mb-0" style={{ color: '#00A2B6', fontWeight: 'bold' }}>Smart</p>
                            <p className="mb-0" style={{ color: 'black', fontWeight: 'bold' }}>Finanzas</p>
                        </a>
                    </div>
                </nav>
            </header>
            <div style={{ padding: '20px', marginTop: '80px' }}>
                <h3 style={{ color: '#ffffff' }}>Chat con {chatUserName}</h3>
                <div
                    className="messages-container"
                    style={{
                        height: '400px',
                        overflowY: 'scroll',
                        border: '1px solid #ddd',
                        padding: '10px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '10px',
                    }}
                >
                    {filteredMessages.map((message) => (
                        <div
                            key={`${message.id}-${message.timestamp.seconds}`} // Usamos una combinación de id y timestamp para asegurar que la clave sea única
                            style={{
                                display: 'flex',
                                justifyContent: message.senderId === currentUser?.uid ? 'flex-end' : 'flex-start',
                                marginBottom: '10px',
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: '70%',
                                    padding: '10px',
                                    borderRadius: '15px',
                                    color: 'white',
                                    backgroundColor: message.senderId === currentUser?.uid ? '#0d6efd' : '#6c757d',
                                    textAlign: 'left',
                                }}
                            >
                                <p style={{ margin: 0 }}>{message.text}</p>
                                <small style={{ fontSize: '0.8em' }}>
                                    {new Date(message.timestamp.toDate()).toLocaleString()}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="input-group mt-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Escribe un mensaje..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        style={{ borderRadius: '10px' }}
                    />
                    <button onClick={handleSendMessage} className="btn btn-primary ms-2" type="button">
                        Enviar
                    </button>
                </div>
                <div className="input-group mt-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por contenido"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ borderRadius: '10px' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
