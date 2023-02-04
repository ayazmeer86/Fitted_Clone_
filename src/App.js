import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
// import 'react-pro-sidebar/dist/css/styles.css';
import Sidebar from './components/Sidebar';
import About from './pages/About.jsx';
import Product from './pages/Product.jsx';
import Home from './pages/Home.jsx';
import Polo from './pages/Polo';
import SlimFit from './pages/SlimFit';
import Cart from './pages/Cart';
import Parent from './pages/Parent';

const App = () => {
  return (
    <div className='app'>
    
    <BrowserRouter>
          <Sidebar />

        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/product" element={<Product />} />
          <Route path="/polo" element={<Polo />} />
          <Route path="/slim-fit" element={<SlimFit />} />
          <Route path='/detail-of/:name' element={<Parent/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} /> 
        </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;