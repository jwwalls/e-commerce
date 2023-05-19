import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "./Login";
import CreatePost from "./CreatePost";
import SingleProduct from "./SingleProduct.jsx";
import MyShoes from "./MyShoes";
import Products from "./Pruducts.jsx";
import Checkout from "../pages/Checkout";
import User from "../pages/User";
import NavBar from "../pages/NavBar";
import Footer from "../pages/Footer";
import EditPost from "../pages/EditPost";
import DeletePost from "../pages/DeletePost";
import EditCart from "../pages/EditCart";
import "../App.css";


const RRoutes = ({ token, setToken, user, setUser }) => {
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Home/>}></Route>

        <Route
          path="/login"
          element={
            <Login
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
            />
          }
        ></Route>
    
        <Route
          path="/post-shoe"
          element={<CreatePost />}
        ></Route>

        <Route path="/shoe:id" element={<SingleProduct/>}></Route>

        <Route
          path="/my-shoes"
          element={
            <MyShoes
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
            />
          }
        ></Route>

        <Route
          path="/shop"
          element={<Products token={token} />}
          state={{}}
        />

        <Route path="/cart" element={<Checkout/>}></Route>

        <Route path="/:id" element={<User/>}></Route>

        <Route path="/nav-bar" element={<NavBar/>}></Route>

        <Route path="/footer" element={<Footer/>}></Route>

        <Route path="/post-edit" element={<EditPost/>}></Route>
        
        <Route path="/post-delete" element={<DeletePost/>}></Route>

        <Route path="/cart-edit" element={<EditCart/>}></Route>

      </Routes>
    </div>
  );
};

export default RRoutes;