import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToDoList from './components/ToDoList/ToDoList';
import Galeria from './components/Galeria/Galeria';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/" element={<ToDoList />}></Route>
            <Route path="/galeria" element={<Galeria />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
