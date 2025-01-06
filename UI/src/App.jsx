import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/Home';
import AddTodo from './pages/AddTodo';
import TodosPage from './pages/Todos';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-todo" element={<AddTodo />} />
          <Route path="/todos" element={<TodosPage />} />
        </Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
      <ToastContainer /> 
    </>
  )
}

export default App
