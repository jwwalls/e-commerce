import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/Login";
import CreatePost from "../components/CreatePost";
import SingleProduct from "../pages/SingleProduct.jsx";
import MyShoes from "../components/MyShoes";
import Products from "../pages/Products.jsx";
import Checkout from "../pages/Checkout";
import User from "../pages/User";
import NavBar from "../pages/NavBar";
import Footer from "../components/Footer";
import EditPost from "../components/EditPost";
import DeletePost from "../components/DeletePost";
import EditCart from "../components/EditCart";
import "../App.css";

const RRoutes = ({ token, setToken, user, setUser }) => {
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route
          path="/login"
          element={
            <User
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
            />
          }
        ></Route>

        <Route path="/post-shoe" element={<CreatePost />}></Route>

        <Route path="/shoe:id" element={<SingleProduct />}></Route>

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

        <Route path="/shop" element={<Products token={token} />} state={{}} />

        <Route path="/cart" element={<Checkout />}></Route>

        <Route path="/:id" element={<Login />}></Route>

        <Route path="/nav-bar" element={<NavBar />}></Route>

        <Route path="/footer" element={<Footer />}></Route>

        <Route path="/post-edit" element={<EditPost />}></Route>

        <Route path="/post-delete" element={<DeletePost />}></Route>

        <Route path="/cart-edit" element={<EditCart />}></Route>
      </Routes>
    </div>
  );
};

export default RRoutes;
