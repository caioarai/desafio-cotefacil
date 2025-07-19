import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToDoList from './components/ToDoList/ToDoList';
import Galeria from './components/Galeria/Galeria';
import Dashboard from './components/Dashboard/Dashboard';
import { TasksProvider } from './context/TasksContext';

function App() {
  return (
    <div className="container">
      <TasksProvider>
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
      </TasksProvider>
    </div>
  );
}

export default App;
