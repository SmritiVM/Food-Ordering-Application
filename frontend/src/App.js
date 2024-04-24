import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Cart from "./Components/Cart/Cart";
import Navbar from "./Components/Navbar";
import Cuisine from "./Components/Cuisine";
import { SearchProvider } from "./Components/SearchContext.jsx";

import Account from "./Components/Account/Account";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";

import Admin from "./Components/Admin.jsx";
import CreateFood from "./Components/Admin/CreateFood";
import UpdateFood from "./Components/Admin/UpdateFood.jsx";
import ViewOrders from "./Components/Admin/ViewOrders.jsx";
import ViewQueries from "./Components/Admin/ViewQueries.jsx";

import "./App.css";
function App() {
  // localStorage.setItem("user", "admin");
  // localStorage.clear();
  localStorage.setItem("user", "abc");
  
  return (
    <div className="mainRoot">
      <Router>
        <SearchProvider>
        <Navbar/>
        <Routes>
          <Route path = "/" element = {<Cuisine/>}/>
          <Route path = "/cart" element={<Cart/>}/>

          <Route path = "/account" element={<Account/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/register" element={<Register/>}/>

          <Route path = "/admin" element={<Admin/>}/>
          <Route path = "/admin/createfood" element={<CreateFood/>}/>
          <Route path = "/admin/updatefood" element={<UpdateFood/>}/>
          <Route path = "/admin/vieworders" element={<ViewOrders/>}/>
          <Route path = "/admin/:adminAction" element={<Cuisine/>}/>
          <Route path = "/admin/viewqueries" element={<ViewQueries/>}/>
        </Routes>
        </SearchProvider>
      </Router>
    </div>
  );
}

export default App;
