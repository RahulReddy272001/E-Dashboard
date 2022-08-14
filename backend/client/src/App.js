
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Productlist from './components/Productlist';
import UpdateProduct from './components/UpdateProduct';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<Productlist />} />
            <Route path='/add' element={<AddProduct />} />

            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/logout' element={<h1>LOGOUT Product Listing Component</h1>} />
            <Route path='/profile' element={<h1>PROFILE Product Listing Component</h1>} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;
