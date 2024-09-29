import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/loginPage/LoginPage';
import RegisterPage from './Pages/registerPage/RegisterPage';
import MainPage from './Pages/mainPage/MainPage';


function App() {
  //tsx 
  return <BrowserRouter>
    <Routes>
      <Route  
        index path='/' 
        element = {<HomePage/>}
      />
      <Route
        path = '/login'
        element = {<LoginPage/>}
      />
      <Route
        path = "/register"
        element = {<RegisterPage/>}      
      />
      <Route
        path="/authenticated"
        element = {<MainPage/>}
      />
      <Route
        path='/profile/edit'
      />
    </Routes>
  </BrowserRouter> 
}

export default App
