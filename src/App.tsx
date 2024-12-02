import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/loginPage/LoginPage';
import RegisterPage from './Pages/registerPage/RegisterPage';
import MainPage from './Pages/mainPage/MainPage';
import UserEditProfile from './Pages/editUserPage/UserEditProfile';
import { AuthProvider } from './context/AuthContext';
import CalculatorPage from './Pages/mainPage/calculatorPage/CalculatorPage';
import MessagePage from './Pages/messagesPage/messagePage';
import ChatPage from './Pages/messagesPage/chatPage';
import GlosaryPage from './Pages/glosaryPage/GlosaryPage';
import ClassesPage from './Pages/classesPage/ClassesPage';
import CursoPage from './Pages/cursoPage/CursoPage';
import ExamPage from './Pages/examenesPage/ExamPage';

function App() {
  //tsx 
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/authenticated" element={<MainPage />} />
          <Route path="/classes" element={<ClassesPage/>}/>
          <Route path="/glosary" element={<GlosaryPage/>}></Route>
          <Route path="/profile/edit" element={<UserEditProfile />} />
          <Route path="/calculator" element={<CalculatorPage/>} />
          <Route path="/messages" element={<MessagePage/>}/>
          <Route path="/chat/:userId" element={<ChatPage />} />
          <Route path="/curso/:idCurso" element={<CursoPage/>}/>
          <Route path="/exams" element={<ExamPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>



  );
}

export default App;
