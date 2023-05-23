import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import About from './pages/About';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import Header from './components/Header';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
        />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/add' element={<AddEdit />} />
          <Route path='/update/:id' element={<AddEdit />} />
          <Route path='/view/:id' element={<View />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
