import Home from './pages/Home'
import ProductList from './pages/ProductList';
import ProductItem from './pages/ProductItem';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Success from './pages/Success';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

function App() {
  const { registerSuccess, currentUser } = useSelector((state) => state.user);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='products/:category' element={<ProductList/>}/>
        <Route path='product/:id' element={<ProductItem/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='success' element={<Success/>} />
        <Route path='login' element={ <Login/>}/>
        <Route path='register' element={ <Register/>}/>
      </Routes>
    </Router>
   
  );
}

export default App;
