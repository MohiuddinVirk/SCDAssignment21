import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './AdminPages/Signin';
import EditProfile from './AdminPages/Editprofile';
import AdminProfile from './AdminPages/Profile';
import Notifications from './AdminPages/Notifications';
import Home from './AdminPages/Home'
import Customers from './AdminPages/Customers'
import Sellers from './AdminPages/Sellers'
import Freelancers from './AdminPages/Freelancers'
import ChangePassword from './AdminPages/ChangePassword'
import Projects from './AdminPages/Projects'
import Products from './AdminPages/Products'
const App = () => {
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/sellers" element={<Sellers />} />
      <Route path="/freelancers" element={<Freelancers />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/products" element={<Products />} />
  <Route path="/signin" element={<SignIn />} />
  <Route path="/changepassword" element={<ChangePassword />} />
  <Route path="/editprofile" element={<EditProfile />} />
  <Route path="/adminprofile" element={<AdminProfile />} />
  
</Routes>

    </Router>
  );
};

export default App;
